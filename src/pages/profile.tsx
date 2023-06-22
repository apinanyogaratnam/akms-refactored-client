import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import Spinner from "@/components/spinner";
import { type APIKey, type APIKeys } from "@/types/api-keys";
import { getAPIKeys } from "@/utils/utils";

const CreateAPIKeyDialog = dynamic(() => import("@/components/create-api-key-dialog"));
const DeleteAPIKeyDialog = dynamic(() => import("@/components/delete-api-key-dialog"));

const Profile = () => {
    const [APIKeys, setAPIKeys] = useState<APIKey[]>([]);
    const [createAPIKeyDialogOpened, setCreateAPIKeyDialogOpened] = useState<boolean>(false);
    const [deleteAPIKeyDialogOpened, setDeleteAPIKeyDialogOpened] = useState<boolean>(false);
    const [selectedAPIKey, setSelectedAPIKey] = useState<{
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        description: string;
    } | null>(null);

    const { isLoading, isFetching, isRefetching } = useQuery(["api_keys"], async () => await getAPIKeys(1), {
        onSuccess: (data: APIKeys) => {
            setAPIKeys(data.api_keys);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to fetch API Keys");
        },
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            <div className="flex flex-row items-center justify-between w-full p-2 md:w-[60%] mx-auto">
                <h1 className="mt-5 ml-2 text-center text-xl font-bold">API Keys</h1>
                {createAPIKeyDialogOpened && (
                    <CreateAPIKeyDialog title="Create API Key" setOpen={setCreateAPIKeyDialogOpened} />
                )}
                {deleteAPIKeyDialogOpened && selectedAPIKey && (
                    <DeleteAPIKeyDialog
                        title="Delete API Key"
                        setOpen={setDeleteAPIKeyDialogOpened}
                        api_key_id={selectedAPIKey.id}
                        api_key_title={selectedAPIKey.name}
                    />
                )}
                <button
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 hover:shadow-lg flex flex-row"
                    onClick={() => setCreateAPIKeyDialogOpened(true)}
                >
                    <span>
                        <AiOutlinePlusCircle size="1.3em" className="mt-[3px]" />
                    </span>
                    <span className="ml-2">Create API Key</span>
                </button>
            </div>
            {isLoading || isFetching || isRefetching ? (
                // center of the screen
                <div className="flex flex-col justify-center items-center h-[50vh]">
                    <div role="status">
                        <Spinner showLabel={false} original />
                    </div>
                </div>
            ) : (
                <>
                    {(APIKeys || []).map((APIKey) => (
                        <div key={APIKey.id} className="p-2 w-full md:w-[60%] mx-auto">
                            <div className="border-2 border-bg-slate-200 rounded-md p-2 flex flex-row justify-around items-center md:justify-between">
                                <div>
                                    <p className="text-sm md:text-xl min-w-[250px] max-w-[250px]">
                                        {APIKey.name.length > 20 ? APIKey.name.slice(0, 20) + "..." : APIKey.name}
                                    </p>
                                    <p className="text-sm md:text-md">{APIKey.description}</p>
                                </div>
                                <div>
                                    <p>******************</p>
                                    <p className="text-sm md:text-md">{APIKey.created_at}</p>
                                </div>
                                <div>
                                    <button
                                        className="bg-slate-100 text-red-500 border-2 border-bg-black px-2 py-1 rounded-md hover:bg-slate-200"
                                        onClick={() => {
                                            setSelectedAPIKey(APIKey);
                                            setDeleteAPIKeyDialogOpened(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Profile;
