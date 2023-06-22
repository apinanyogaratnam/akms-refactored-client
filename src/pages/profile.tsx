import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

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
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
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
