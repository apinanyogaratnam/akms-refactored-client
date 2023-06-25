import CreateProjectDialog from "@/components/create-project-dialog";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const images = [
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
];

type Project = {
    id?: string;
    name: string;
    description: string;
    logo: string;
};

interface IProps {
    project: Project;
}

const ProjectCard = (props: IProps) => {
    const { project } = props;

    return (
        <div className="w-full cursor-pointer rounded-md border-2 border-gray-200 p-2 hover:bg-gray-50 md:w-1/4">
            <div className="flex flex-col space-y-4">
                <div className="">
                    <div className="flex flex-row space-x-4">
                        <div className="h-15 w-20 overflow-hidden rounded-lg border-2 border-blue-300">
                            <img src={project.logo} alt="img1" className="h-15 w-20 rounded-full" />
                        </div>
                        <div className="w-full">
                            <div className="w-full text-2xl">{project.name}</div>
                            <div className="flex flex-row items-center space-x-1">
                                {images.slice(0, 3).map((src) => {
                                    return (
                                        <div key={src} className="">
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
                <div className="text-gray-500">
                    {project.description.length > 85 ? project.description.slice(0, 85) + "..." : project.description}
                </div>
                <div className="border-[1px] border-dashed border-gray-200" />
                <div>
                    <div className="text-gray-500">2021-08-01</div>
                    <div className="text-sm">Date created</div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    // const { isLoading, isFetching, isRefetching } = useQuery(["projects"], async () => await getAPIKeys(1), {
    //     onSuccess: (data: APIKeys) => {
    //         setAPIKeys(data.api_keys);
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //         toast.error("Failed to fetch API Keys");
    //     },
    //     refetchOnWindowFocus: false,
    // });

    const [createProjectDialogOpened, setCreateProjectDialogOpened] = useState<boolean>(false);

    return (
        <>
            <div>
                {createProjectDialogOpened && (
                    <CreateProjectDialog userId={1} title="Create Project" setOpen={setCreateProjectDialogOpened} />
                )}
            </div>
            <div className="p-10">
                <h1 className="text-5xl">Projects</h1>
                <div className="mt-5 flex flex-col items-stretch space-y-2 md:flex-row md:space-x-5 md:space-y-0">
                    <ProjectCard
                        project={{
                            name: "Project 1",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                            logo: "https://robohash.org/pfp1.png",
                        }}
                    />
                    <ProjectCard
                        project={{
                            name: "Project 2",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                            logo: "https://robohash.org/pfp2.png",
                        }}
                    />
                    <ProjectCard
                        project={{
                            name: "Project 3",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                            logo: "https://robohash.org/pfp3.png",
                        }}
                    />
                    <button className="flex w-1/4 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-2 hover:bg-gray-50" onClick={() => setCreateProjectDialogOpened(true)}>
                        <AiOutlinePlus className="text-4xl" />
                        <p className="text-gray-500">New project</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Projects;
