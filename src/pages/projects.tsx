const images = [
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
];

type Project = {
    id?: number;
    name: string;
    description: string;
};

interface IProps {
    project: Project;
}

const ProjectCard = (props: IProps) => {
    const { project } = props;
    return (
        <div className="w-full rounded-md border-2 border-gray-200 p-2">
            <div className="flex flex-col space-y-2">
                <div className="">
                    <div className="flex flex-row space-x-2">
                        <div className="flex h-20 w-20 flex-row items-center justify-center rounded-lg border-2 border-blue-300">
                            <img src="https://robohash.org/pfp.png" alt="img1" className="h-10 w-10 rounded-full" />
                        </div>
                        <div>
                            <div className="flex justify-center text-lg">{project.name}</div>
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
                <div>
                    This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Donec
                </div>
                <div>
                    Date Created: <span className="text-gray-500">2021-08-01</span>
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

    return (
        <div className="p-10">
            <h1 className="text-5xl">Projects</h1>
            <div className="mt-5 flex flex-row items-stretch space-x-2">
                <div className="w-1/4">
                    <ProjectCard
                        project={{
                            name: "Project 1",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                        }}
                    />
                </div>
                <div className="w-1/4">
                    <ProjectCard
                        project={{
                            name: "Project 2",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                        }}
                    />
                </div>
                <div className="w-1/4">
                    <ProjectCard
                        project={{
                            name: "Project 3",
                            description:
                                "This is the project description and it can be a little long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
                        }}
                    />
                </div>
                <div className="w-1/4 flex-grow flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-2">
                    <button className="">+ New project</button>
                </div>
            </div>
        </div>
    );
};

export default Projects;
