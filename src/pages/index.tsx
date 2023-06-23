import Head from "next/head";

import Footer from "@/components/footer";
import MainContent from "@/components/main-content";
import NavBar from "@/components/navbar";
import { api } from "@/utils/api";

export default function Home() {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="all" />
            </Head>
            <main>
                <NavBar />
                <hr className="border-1 w-full border-slate-200" />
                <MainContent />
            </main>
            <Footer />
        </>
    );
}
