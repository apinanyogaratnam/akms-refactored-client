import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface DialogProps {
    title: string;
    setOpen: (open: boolean) => void;
    api_key_id: number;
    api_key_title: string;
}

const DeleteAPIKeyDialog = (props: DialogProps) => {
    const { title, setOpen, api_key_id, api_key_title } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async () => {
        const userId = 1;
        setIsLoading(true);
        try {
            await axios.delete(`https://akms-service.vercel.app/users/${userId}/api-keys/${api_key_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                },
            });
            await router.replace(router.asPath);
            setOpen(false);
        } catch (e) {
            console.error(e);
            alert("Something went wrong!"); // TODO: use toast
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-row justify-center items-center">
            <div className="bg-white rounded-lg p-5 w-[30%]">
                <div className="flex flex-col justify-between items-center space-y-4 w-full">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-gray-500 text-center">
                        Are you sure you want to delete <span className="font-semibold">{api_key_title}</span>? This
                        action cannot be undone.
                    </p>
                    <div className="flex flex-row items-center justify-end w-full space-x-4">
                        <button
                            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 w-full"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-full"
                            onClick={void handleSubmit}
                        >
                            {isLoading ? (
                                <div className="flex flex-row justify-center items-center space-x-2">
                                    <p>Deleting...</p>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAPIKeyDialog;
