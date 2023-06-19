import { AiOutlinePlusCircle } from "react-icons/ai";

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
            <div className="flex flex-row items-center justify-center w-full md:w-[60%] mx-auto">
                <h1 className="mt-5 text-center text-xl font-bold">API Keys</h1>
                <h1 className="hidden sm:block">
                    small
                </h1>
                <h1 className="hidden md:block">
                    medium
                </h1>
                <h1 className="hidden lg:block">
                    large
                </h1>
                <h1 className="hidden xl:block">
                    extra large
                </h1>
                <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 hover:shadow-lg absolute right-0 mt-3 flex flex-row">
                    <span>
                        <AiOutlinePlusCircle size="1.3em" className="mt-[3px]" />
                    </span>
                    <span className="ml-2">Create API Key</span>
                </button>
            </div>
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
                            <button className="bg-slate-100 text-red-500 border-2 border-bg-black px-2 py-1 rounded-md hover:bg-slate-200">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// TODO: convert this to /api route
export const getServerSideProps = async () => {
    const res = await fetch("https://akms-service.vercel.app/users/1/api-keys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
        },
    } as RequestInit);
    const data = (await res.json()) as IProps;

    return {
        props: {
            api_keys: data.api_keys,
        },
    };
};

export default Profile;
