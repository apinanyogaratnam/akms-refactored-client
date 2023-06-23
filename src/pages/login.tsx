import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user.email}</p>
                <Image src={session.user.image || ""} alt={session.user.name || ""} width={200} height={200} />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }

    return (
        <div>
            <button
                className="rounded-lg bg-blue-600 p-5 text-white"
                onClick={() => {
                    // void router.push("/profile");
                }}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
