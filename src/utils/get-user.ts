import axios from "axios";

import { type User } from "@/types/user";

export const getUser = async (email: string): Promise<User | null> => {
    const { data } = (await axios.get(`http://localhost:3000/api/get-user?email=${email}`)) as unknown as {
        data: User | null;
    };
    return data;
};
