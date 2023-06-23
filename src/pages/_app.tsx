import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    const queryClient = new QueryClient();

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ToastContainer autoClose={1500} closeOnClick={true} />
                <Analytics />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
