import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();

    return (
        <div>
            <button
                className="bg-blue-600 text-white p-5 rounded-lg"
                onClick={() => {
                    // void router.push("/profile"); // TODO: uncomment this
                }}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
