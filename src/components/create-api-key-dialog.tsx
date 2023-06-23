import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { toast } from "react-toastify";

import Spinner from "./spinner";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleSubmit = async (): Promise<void> => {
        if (!name) {
            return;
        }

        if (!description) {
            return;
        }

        setIsLoading(true);

        const userId = 1;
        try {
            const { data }: AxiosResponse = await axios.post(`/api/create-api-key?userId=${userId}`, {
                name,
                description,
            });
            await queryClient.invalidateQueries(["api_keys"]);
            setApiKey(data.api_key);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong!");
        }

        setIsLoading(false);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(api_key);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="fixed left-0 top-0 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-50">
            <div className="w-[35%] rounded-lg bg-white p-5">
                <div className="flex w-full flex-col items-center justify-between space-y-4">
                    {!!api_key ? (
                        <>
                            <h1 className="text-xl font-bold">{"Here's your API Key"}</h1>
                            <div className="flex w-full flex-row items-center justify-center space-x-2">
                                <div className="flex h-9 w-full flex-row items-center justify-between space-x-4 rounded-md border-2 border-gray-200 p-2 text-lg">
                                    <p>{api_key}</p>
                                    <div
                                        className="h-5 cursor-pointer rounded-md text-gray-500 hover:text-gray-700 hover:shadow-lg"
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
                                className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">{title}</h1>
                            <div className="flex w-full flex-col space-y-2">
                                <input
                                    type="text"
                                    className="w-full rounded-md border-2 border-gray-300 p-2"
                                    placeholder="Name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="rounded-md border-2 border-gray-300 p-2"
                                    placeholder="Description"
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex w-full flex-row items-center justify-end space-x-4">
                                <button
                                    className="w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spinner label="Creating..." /> : "Create"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateAPIKeyDialog;
