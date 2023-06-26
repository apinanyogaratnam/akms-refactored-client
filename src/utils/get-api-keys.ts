import axios, { type AxiosResponse } from "axios";

import { type APIKeys } from "@/types/api-keys";

// TODO: make this to use axios and create a middleware endpoint
export const getAPIKeys = async (user_id: number, projectId: string): Promise<{ data: APIKeys}> => {
    const { data } = (await axios.get(
        `/api/get-api-keys?userId=${user_id}&projectId=${projectId}`,
    )) as unknown as AxiosResponse<{ data: APIKeys}>;
    return data;
};
