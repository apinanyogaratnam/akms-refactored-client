import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import { createProject } from "@/utils/create-project";

import Spinner from "./spinner";

interface DialogProps {
    title: string;
    setOpen: (open: boolean) => void;
    userId: number;
}

const CreateProjectDialog = (props: DialogProps) => {
    const { title, setOpen, userId } = props;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [logoUrl, setLogoUrl] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleSubmit = async (): Promise<void> => {
        if (!name || !description) {
            toast.error("Please fill required fields: name and description");
            return;
        }

        setIsLoading(true);
        try {
            // TODO: create middleware endpoint for this
            await createProject(userId, {
                name,
                description,
                website: website || null,
                logoUrl: logoUrl || null,
            });
            await queryClient.invalidateQueries(["projects"]);
            setOpen(false);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong");
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-50">
            <div className="w-[30%] rounded-lg bg-white p-5">
                <div className="flex w-full flex-col items-center justify-between space-y-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-center text-gray-500">Create a new project</p>
                    <div>
                        <input
                            className="w-full rounded-md border border-gray-300 p-2"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="mt-2 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            className="mt-2 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <input
                            className="mt-2 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Logo URL"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
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
                </div>
            </div>
        </div>
    );
};

export default CreateProjectDialog;
