import LandingPageNavBar from "@/components/landing-page-navbar";
import PricingMainContent from "@/components/pricing-main-content";

const Pricing = () => {
    return (
        <>
            <LandingPageNavBar />
            <hr className="border-1 w-full border-slate-200" />
            <PricingMainContent />
        </>
    );
};

export default Pricing;
