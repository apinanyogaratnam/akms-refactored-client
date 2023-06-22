import NavBar from "@/components/navbar";
import PricingMainContent from "@/components/pricing-main-content";

const Pricing = () => {
    return (
        <>
            <NavBar />
            <hr className="border-1 border-slate-200 w-full" />
            <PricingMainContent />
        </>
    );
};

export default Pricing;
