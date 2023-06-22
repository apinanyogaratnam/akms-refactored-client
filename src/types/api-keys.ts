export type APIKey = {
    id: number;
    user_id: number;
    created_at: string;
    name: string;
    description: string;
};

export interface APIKeys {
    api_keys: APIKey[];
}
