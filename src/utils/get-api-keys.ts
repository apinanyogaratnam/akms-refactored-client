import { env } from "@/env.mjs";
import { type APIKeys } from "@/types/api-keys";
// TODO: make this to use axios and create a middleware endpoint
export const getAPIKeys = async (user_id: number): Promise<APIKeys> => {
    const res = await fetch(`https://akms-service.vercel.app/users/${user_id}/api-keys`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": env.NEXT_PUBLIC_API_KEY,
        },
    } as RequestInit);
    return (await res.json()) as APIKeys;
};
