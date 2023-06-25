import axios, { type AxiosResponse } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "@/env.mjs";
import { type APIKeys } from "@/types/api-keys";
import { type Response } from "@/types/response";

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIKeys | Response>) {
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method not allowed",
            message: "This endpoint only accepts POST requests",
            data: null,
        });
        return;
    }

    const userId = req.query.userId as string;

    const { name, description, website, logo_url } = req.body as {
        name: string;
        description: string;
        website?: string | null;
        logo_url?: string | null;
    };

    try {
        const { data } = (await axios.post(
            `${env.API_BASE_URL}/users/${userId}/projects`,
            {
                name,
                description,
                website,
                logo_url,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": env.NEXT_PUBLIC_API_KEY,
                },
            },
        )) as unknown as AxiosResponse<APIKeys>;

        res.status(200).json({
            error: null,
            message: "Project created successfully",
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
