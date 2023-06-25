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
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method not allowed",
            message: "This endpoint only accepts POST requests",
            data: null,
        });
        return;
    }

    const { name, email } = req.body as { name: string; email: string };

    try {
        (await axios.post(
            `https://akms-service.vercel.app/users`,
            {
                name,
                email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": env.API_KEY,
                },
            },
        )) as unknown as AxiosResponse<UserResponse>;

        res.status(200).json({
            error: null,
            message: "User created successfully",
            data: null,
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

        if (error.response.status === 409) {
            res.status(200).json({
                error: null,
                message: "User already exists",
                data: null,
            });
        }
        console.error("error", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Something went wrong",
            data: null,
        });
    }
}
