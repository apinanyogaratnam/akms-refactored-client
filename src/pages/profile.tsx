import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { type GetSessionParams, getSession } from "next-auth/react";
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
            <div className="mx-auto flex w-full flex-row items-center justify-between p-2 md:w-[60%]">
                <h1 className="ml-2 mt-5 text-center text-xl font-bold">API Keys</h1>
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
                    className="flex flex-row rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 hover:shadow-lg"
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
                <div className="flex h-[50vh] flex-col items-center justify-center">
                    <div role="status">
                        <Spinner showLabel={false} original />
                    </div>
                </div>
            ) : (
                <>
                    {APIKeys.length !== 0 ? (
                        <>
                            {APIKeys.map((APIKey) => (
                                <div key={APIKey.id} className="mx-auto w-full p-2 md:w-[60%]">
                                    <div className="border-bg-slate-200 flex flex-row items-center justify-around rounded-md border-2 p-2 md:justify-between">
                                        <div>
                                            <p className="min-w-[250px] max-w-[250px] text-sm md:text-xl">
                                                {APIKey.name.length > 20
                                                    ? APIKey.name.slice(0, 20) + "..."
                                                    : APIKey.name}
                                            </p>
                                            <p className="md:text-md text-sm">{APIKey.description}</p>
                                        </div>
                                        <div>
                                            <p>******************</p>
                                            <p className="md:text-md text-sm">{APIKey.created_at}</p>
                                        </div>
                                        <div>
                                            <button
                                                className="border-bg-black rounded-md border-2 bg-slate-100 px-2 py-1 text-red-500 hover:bg-slate-200"
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
                    ) : (
                        <div className="flex flex-row justify-center mt-10">
                            <p className="text-xl">API Keys will appear here</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/signup",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default Profile;
