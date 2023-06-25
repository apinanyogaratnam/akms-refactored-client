import axios, { AxiosError, type AxiosResponse } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "@/env.mjs";
import { type Response } from "@/types/response";
import { type User } from "@/types/user";

type UserResponse = {
    status: number;
    user: User;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "GET") {
        res.status(405).json({
            error: "Method not allowed",
            message: "This endpoint only accepts GET requests",
            data: null,
        });
        return;
    }

    const { email } = req.query as { email: string };

    try {
        const { data } = (await axios.get(`${env.API_BASE_URL}/users/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": env.API_KEY,
            },
        })) as unknown as AxiosResponse<UserResponse>;

        res.status(200).json({
            error: null,
            message: "Retrieved user successfully",
            data: data.user,
        });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError) || !error.response) {
            console.error("error", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Something went wrong",
                data: null,
            });
            return;
        }

        res.status(204).json({
            error: null,
            message: "User does not exist",
            data: null,
        });
    }
}
