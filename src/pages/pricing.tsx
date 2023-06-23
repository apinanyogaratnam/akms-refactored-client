import NavBar from "@/components/navbar";
import PricingMainContent from "@/components/pricing-main-content";

const Pricing = () => {
    return (
        <>
            <NavBar />
            <hr className="border-1 w-full border-slate-200" />
            <PricingMainContent />
        </>
    );
};

export default Pricing;
