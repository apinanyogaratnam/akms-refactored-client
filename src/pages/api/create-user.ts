import axios, { AxiosError, type AxiosResponse } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

import { type Response } from "@/types/response";

type User = {
    created_at: string;
    email: string;
    id: number;
    name: string;
    updated_at: string;
};

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
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
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
            console.log("error", error);
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

            console.log("error", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Something went wrong",
                data: null,
            });
        }
    }
}
