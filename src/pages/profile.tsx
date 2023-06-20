import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CreateAPIKeyDialog = dynamic(() => import("@/components/create-api-key-dialog"));
const DeleteAPIKeyDialog = dynamic(() => import("@/components/delete-api-key-dialog"));

interface IProps {
    api_keys: {
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        description: string;
    }[];
    revalidate: () => void;
}

const Profile = (props: IProps) => {
    const { api_keys } = props;
    const [createAPIKeyDialogOpened, setCreateAPIKeyDialogOpened] = useState<boolean>(false);
    const [deleteAPIKeyDialogOpened, setDeleteAPIKeyDialogOpened] = useState<boolean>(false);
    const [selectedAPIKey, setSelectedAPIKey] = useState<{
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        description: string;
    } | null>(null);

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
            {(api_keys || []).map((api_key) => (
                <div key={api_key.id} className="p-2 w-full md:w-[60%] mx-auto">
                    <div className="border-2 border-bg-slate-200 rounded-md p-2 flex flex-row justify-around items-center md:justify-between">
                        <div>
                            <p className="text-sm md:text-xl min-w-[250px] max-w-[250px]">{
                                api_key.name.length > 20 ? api_key.name.slice(0, 20) + "..." : api_key.name
                            }</p>
                            <p className="text-sm md:text-md">{api_key.description}</p>
                        </div>
                        <div>
                            <p>******************</p>
                            <p className="text-sm md:text-md">{api_key.created_at}</p>
                        </div>
                        <div>
                            <button
                                className="bg-slate-100 text-red-500 border-2 border-bg-black px-2 py-1 rounded-md hover:bg-slate-200"
                                onClick={() => {
                                    setSelectedAPIKey(api_key);
                                    setDeleteAPIKeyDialogOpened(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// TODO: convert this to /api route
export const getServerSideProps = async () => {
    const res = await fetch("https://akms-service.vercel.app/users/1/api-keys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
        },
    } as RequestInit);
    const data = (await res.json()) as IProps;

    return {
        props: {
            api_keys: data.api_keys,
        },
    };
};

export default Profile;
