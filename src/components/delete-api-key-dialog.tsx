import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { env } from "@/env.mjs";

import Spinner from "./spinner";

interface DialogProps {
    title: string;
    setOpen: (open: boolean) => void;
    api_key_id: number;
    api_key_title: string;
}

const DeleteAPIKeyDialog = (props: DialogProps) => {
    const { title, setOpen, api_key_id, api_key_title } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleSubmit = async (): Promise<void> => {
        const userId = 1;
        setIsLoading(true);
        try {
            // TODO: create middleware endpoint for this
            await axios.delete(`https://akms-service.vercel.app/users/${userId}/api-keys/${api_key_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": env.NEXT_PUBLIC_API_KEY,
                },
            });
            await queryClient.invalidateQueries(["api_keys"]);
            setOpen(false);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong");
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed left-0 top-0 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-50">
            <div className="w-[30%] rounded-lg bg-white p-5">
                <div className="flex w-full flex-col items-center justify-between space-y-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-center text-gray-500">
                        Are you sure you want to delete <span className="font-semibold">{api_key_title}</span>? This
                        action cannot be undone.
                    </p>
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
                            {isLoading ? <Spinner label="Deleting..." /> : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAPIKeyDialog;
