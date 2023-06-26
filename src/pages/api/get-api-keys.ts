import axios, { type AxiosResponse } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "@/env.mjs";
import { type APIKeys } from "@/types/api-keys";
import { type Response } from "@/types/response";

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIKeys | Response>) {
    if (req.method !== "GET") {
        res.status(405).json({
            error: "Method not allowed",
            message: "This endpoint only accepts GET requests",
            data: null,
        });
        return;
    }

    const { userId, projectId } = req.query as { userId: string; projectId: string };

    try {
        const { data } = (await axios.get(`${env.API_BASE_URL}/users/${userId}/projects/${projectId}/api-keys`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": env.NEXT_PUBLIC_API_KEY,
            },
        })) as unknown as AxiosResponse<APIKeys>;

        res.status(200).json({
            error: null,
            message: "Retrieved projects successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: "An error occurred while creating the API key",
            data: null,
        });
    }
}
