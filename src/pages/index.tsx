import Head from "next/head";

import Footer from "@/components/footer";
import LandingPageNavBar from "@/components/landing-page-navbar";
import MainContent from "@/components/main-content";

export default function Home() {
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
                <LandingPageNavBar />
                <hr className="border-1 w-full border-slate-200" />
                <MainContent />
            </main>
            <Footer />
        </>
    );
}
