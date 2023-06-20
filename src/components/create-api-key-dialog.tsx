import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";

interface DialogProps {
    title: string;
    setOpen: (open: boolean) => void;
}

type AxiosResponse = {
    data: APIKey;
};

type APIKey = {
    id: number;
    name: string;
    description: string;
    api_key: string;
};

const CreateAPIKeyDialog = (props: DialogProps) => {
    const { title, setOpen } = props;
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [api_key, setApiKey] = useState<string>("");

    const router = useRouter();

    const handleSubmit = async () => {
        if (!name) {
            return;
        }

        if (!description) {
            return;
        }

        const userId = 1;
        try {
            const { data } = (await axios.post(
                `https://akms-service.vercel.app/users/${userId}/create-api-key`,
                {
                    name,
                    description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                    },
                },
            )) as unknown as AxiosResponse;
            await router.replace(router.asPath);
            setApiKey(data.api_key);
        } catch (e) {
            console.error(e);
            alert("Something went wrong!"); // TODO: use toast
        }
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(api_key);
        alert("Copied to clipboard!"); // TODO: use toast
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-row justify-center items-center">
            <div className="bg-white rounded-lg p-5 w-[35%]">
                <div className="flex flex-col justify-between items-center space-y-4 w-full">
                    {!!api_key ? (
                        <>
                            <h1 className="text-xl font-bold">{"Here's your API Key"}</h1>
                            <div className="flex flex-row justify-center items-center space-x-2 w-full">
                                <div className="text-lg border-2 border-gray-200 p-2 rounded-md flex flex-row justify-between items-center space-x-4 w-full h-9">
                                    <p>{api_key}</p>
                                    <div
                                        className="text-gray-500 rounded-md hover:shadow-lg hover:text-gray-700 cursor-pointer h-5"
                                        onClick={void copyToClipboard}
                                    >
                                        <LuCopy size="1.2em" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm">
                                {"Please save this API Key somewhere safe. You won't be able to see it again."}
                            </p>
                            <button
                                className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">{title}</h1>
                            <form className="flex flex-col space-y-2 w-full" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-md p-2"
                                    placeholder="Description"
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="flex flex-row justify-between items-center space-x-2 w-full">
                                    <button
                                        className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 w-full"
                                        onClick={() => setOpen(false)}
                                        type="button"
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-full"
                                        onClick={void handleSubmit}
                                        type="submit"
                                    >
                                        Create API Key
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateAPIKeyDialog;
