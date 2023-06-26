import axios from "axios";

type Project = {
    name: string;
    description: string;
    website?: string | null;
    logoUrl?: string | null;
};

export const createProject = async (userId: number, project: Project) => {
    await axios.post(`/api/create-project?userId=${userId}`, {
        name: project.name,
        description: project.description,
        website: project.website,
        logo_url: project.logoUrl,
    });
};
