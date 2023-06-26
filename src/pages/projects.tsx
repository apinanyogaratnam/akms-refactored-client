import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { type GetSessionParams, getSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const CreateProjectDialog = dynamic(() => import("@/components/create-project-dialog"));
const DeleteProjectDialog = dynamic(() => import("@/components/delete-project-dialog"));

import NavBar from "@/components/navbar";
import Spinner from "@/components/spinner";
import { getProjects } from "@/utils/get-projects";
import { type Project, type Projects } from "@/utils/get-projects";
import { formatDate } from "@/utils/time";

const images = [
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
];

interface IProps extends Project {
    onClick: () => void;
}

const ProjectCard = (props: IProps) => {
    const { id, name, description, logo_url, created_at, onClick } = props;

    const [projectMenuVisible, setProjectMenuVisible] = useState<boolean>(false);
    const [deleteProjectDialogOpened, setDeleteProjectDialogOpened] = useState<boolean>(false);
    return (
        <>
            {deleteProjectDialogOpened && (
                <DeleteProjectDialog
                    title="Delete Project"
                    setOpen={setDeleteProjectDialogOpened}
                    projectId={id}
                    name={name}
                />
            )}
            <div
                className="relative h-[250px] w-full cursor-pointer rounded-md border-2 border-gray-200 p-2 hover:bg-gray-50"
                onClick={onClick}
            >
                <div className="flex flex-col space-y-4">
                    <div className="">
                        <div className="flex flex-row space-x-4">
                            <div className="h-15 w-20 overflow-hidden rounded-lg border-2 border-blue-300">
                                <img
                                    src={logo_url || `https://robohash.org/${name}.png`}
                                    alt="img1"
                                    className="h-15 w-20 rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <div className="flex flex-row">
                                    <div className="w-full text-2xl">{name}</div>
                                    <button
                                        className="text-gray-400 hover:text-gray-500"
                                        onClick={() => setProjectMenuVisible(!projectMenuVisible)}
                                    >
                                        •••
                                    </button>
                                    {projectMenuVisible && (
                                        <div className="absolute right-0 top-0 mt-10 w-40 rounded-md bg-white shadow-md">
                                            <div className="flex flex-col space-y-2 p-2">
                                                <button
                                                    className="rounded-md p-2 hover:bg-gray-100"
                                                    onClick={() => toast.error("This feature is not available yet")}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="rounded-md p-2 hover:bg-gray-100"
                                                    onClick={() => setDeleteProjectDialogOpened(true)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-row items-center space-x-1">
                                    {images.slice(0, 3).map((src, index) => {
                                        return (
                                            <div key={index} className="">
                                                <img src={src} alt="img1" className="h-7 w-7 rounded-full" />
                                            </div>
                                        );
                                    })}
                                    {images.length > 4 && (
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-200">
                                            <p>+{images.length - 3}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-h-[70px] min-h-[70px] text-gray-500">
                        {description.length > 85 ? description.slice(0, 85) + "..." : description}
                    </div>
                    <div className="border-[1px] border-dashed border-gray-200" />
                    <div>
                        <div className="text-gray-500">{formatDate(created_at)}</div>
                        <div className="text-sm">Date created</div>
                    </div>
                </div>
            </div>
        </>
    );
};

type OnSuccessProjects = {
    data: Projects;
};

const Projects = () => {
    const [createProjectDialogOpened, setCreateProjectDialogOpened] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[]>([]);

    const router = useRouter();

    const { isLoading, isFetching, isRefetching } = useQuery(["projects"], async () => await getProjects(1), {
        onSuccess: (data: OnSuccessProjects) => {
            setProjects(data.data.projects);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to fetch API Keys");
        },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <div>
                {createProjectDialogOpened && (
                    <CreateProjectDialog userId={1} title="Create Project" setOpen={setCreateProjectDialogOpened} />
                )}
            </div>
            <NavBar />
            <div className="p-10">
                <h1 className="text-5xl">Projects</h1>
                {/* TODO: grid col 4 */}
                {isLoading || isFetching || isRefetching ? (
                    <Spinner original showLabel={false} />
                ) : (
                    <div className="mt-5 flex-col items-stretch space-y-2 md:grid md:grid-cols-4 md:flex-row md:gap-5 md:space-y-0">
                        {(projects || []).map((project) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    name={project.name}
                                    description={project.description}
                                    logo_url={project.logo_url}
                                    created_at={project.created_at}
                                    updated_at={project.updated_at}
                                    is_deleted={project.is_deleted}
                                    onClick={() => router.push(`/${project.id}/profile`)}
                                />
                            );
                        })}
                        <button
                            className="flex h-[250px] flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-2 hover:bg-gray-50"
                            onClick={() => setCreateProjectDialogOpened(true)}
                        >
                            <AiOutlinePlus className="text-4xl" />
                            <p className="text-gray-500">New project</p>
                        </button>
                    </div>
                )}
            </div>
        </>
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

export default Projects;
