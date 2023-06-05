interface IProps {
    api_keys: {
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        description: string;
    }[];
}

const Profile = (props: IProps) => {
    const { api_keys } = props;

    return (
        <div>
            <h1 className="mt-5 text-center text-xl font-bold">API Keys</h1>
            {(api_keys || []).map((api_key) => (
                <div key={api_key.id} className="p-2 w-full md:w-[60%] mx-auto">
                    <div className="border-2 border-bg-slate-200 rounded-md p-2 flex flex-row justify-around items-center md:justify-between">
                        <div>
                            <p className="text-sm md:text-xl">{api_key.name}</p>
                            <p className="text-sm md:text-md">{api_key.description}</p>
                        </div>
                        <div>
                            <p>******************</p>
                            <p className="text-sm md:text-md">{api_key.created_at}</p>
                        </div>
                        <div>
                            <button className="bg-slate-100 text-red-500 border-2 border-bg-black px-2 py-1 rounded-md hover:bg-slate-200">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const getServerSideProps = async () => {
    const res = await fetch("https://akms-service.vercel.app/users/1/api-keys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
        },
    } as RequestInit);
    const data = await res.json();

    return {
        props: {
            api_keys: data.api_keys,
        },
    };
};

export default Profile;
