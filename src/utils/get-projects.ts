import axios, { type AxiosResponse } from "axios";

export type Project = {
    id: number;
    name: string;
    description: string;
    website?: string | null;
    logo_url?: string | null;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
};

export type Projects = {
    projects: Project[];
};

export const getProjects = async (userId: number) => {
    const { data } = (await axios.get(`/api/get-projects?userId=${userId}`)) as unknown as AxiosResponse<Projects>;
    return data;
};
