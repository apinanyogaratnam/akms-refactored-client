import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";

import { createUser } from "@/utils/create-user";
import { getUser } from "@/utils/get-user";

import { authOptions } from "./api/auth/[...nextauth]";

const Signup = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>Get started with Dyte</h1>
            <div>10,000 free minutes every month</div>
            {Object.values(providers).map((provider) => {
                return (
                    <button
                        key={provider.name}
                        className="flex w-[30%] flex-row items-center justify-center rounded-md border-2 border-gray-200 text-lg hover:bg-slate-50"
                        onClick={() => signIn(provider.id)}
                    >
                        <Image
                            src="/continue-with-google-logo.png"
                            alt="Continue with Google"
                            className="h-10 w-14"
                            width={100}
                            height={100}
                        />
                        Continue with Google
                    </button>
                );
            })}
            <div className="flex flex-row space-x-2">
                <div>Already have an account?</div>
                <Link href="/login" aria-label="login" className="bg-blue-400">
                    Login
                </Link>
            </div>
            <div>By continuing you agree to</div>
            <div>our Terms of Service [newTabIcon] and Privacy Policy [newTabIcon]</div>
        </div>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session && session.user && session.user.email && session.user.name) {
        const user = await getUser(session.user.email);
        if (!user) {
            await createUser({
                email: session.user.email,
                name: session.user.name,
            });
        }
        return { redirect: { destination: "/projects" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
}

export default Signup;
