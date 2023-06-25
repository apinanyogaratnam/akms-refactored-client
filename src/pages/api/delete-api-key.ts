import axios from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "@/env.mjs";
import { type Response } from "@/types/response";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "DELETE") {
        res.status(405).json({
            error: "Method not allowed",
            message: "This endpoint only accepts DELETE requests",
            data: null,
        });
        return;
    }

    const userId = req.query.userId as string;
    const api_key_id = req.query.api_key_id as string;

    await axios.delete(`https://akms-service.vercel.app/users/${userId}/api-keys/${api_key_id}`, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": env.NEXT_PUBLIC_API_KEY,
        },
    });

    res.status(200).json({
        error: null,
        message: "API key deleted successfully",
        data: null,
    });
}
