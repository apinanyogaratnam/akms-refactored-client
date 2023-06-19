import MainContent from "@/components/main-content";
import NavBar from "@/components/navbar";

export default function Home() {
    return (
        <main>
            <NavBar />
            <hr className="border-1 border-slate-200 w-full" />
            <MainContent />
        </main>
    );
}
