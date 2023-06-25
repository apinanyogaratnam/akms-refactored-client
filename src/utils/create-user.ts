import axios from "axios";

import { type User } from "@/types/user";

type CreateUserData = {
    email: string;
    name: string;
};

export const createUser = async (user: CreateUserData): Promise<User> => {
    const { data } = (await axios.post("http://localhost:3000/api/create-user", {
        email: user.email,
        name: user.name,
    })) as unknown as { data: User };
    return data;
};
