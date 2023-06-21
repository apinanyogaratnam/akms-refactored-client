import { CiCreditCardOff } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import Marquee from "react-fast-marquee";

import Button from "./button";

interface LogoImageProps {
    src: string;
    alt: string;
}

const LogoImage = (props: LogoImageProps) => {
    const { src, alt } = props;

    return (
        <div className="mx-4">
            <img src={src} alt={alt} className="w-[150px]" />
        </div>
    );
};

const MainContent = () => {
    return (
        <div className="mt-10">
            <h1 className="font-bold text-center text-7xl w-[65%] mx-auto">
                Build Powerful Live Experiences in Your Product
            </h1>
            <h1 className="text-center mt-10 font-normal tracking-widest text-lg w-[35%] mx-auto text-slate-600">
                Integrate custom, secure, high-quality live video and voice to your product in just a few lines of code.
            </h1>
            <div className="flex flex-row justify-center items-center mt-10 space-x-4">
                <Button />
                <div className="text-blue-600 flex flex-row cursor-pointer font-medium hover:underline">
                    Talk to an expert
                    <span>
                        <IoIosArrowForward size="1.3em" className="mt-[2px]" />
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-5 space-x-4 text-slate-600">
                <div className="flex flex-row items-center justify-center">
                    <span>
                        <CiCreditCardOff size="1.3em" className="mt-[2px]" />
                    </span>
                    No credit card required
                </div>
                <div className=" flex flex-row cursor-pointer">
                    <span>
                        <IoGiftOutline size="1.3em" className="mt-[2px]" />
                    </span>
                    FREE 10,000 minutes every month
                </div>
            </div>
            <h1 className="text-center mt-10 font-normal tracking-widest text-lg w-[35%] mx-auto text-slate-600">
                TRUSTED ACROSS INDUSTRIES
            </h1>
            <div className="mt-20 border-2 border-gray-200 w-[60%] rounded-xl mx-auto overflow-hidden">
                <img src="/preview.png" alt="preview" className="mt-3 w-full" />
            </div>
            <Marquee speed={25} className="mt-10 fixed">
                <LogoImage src="/bitcoin-logo.png" alt="bitcoin" />
                <LogoImage src="/facebook-logo.png" alt="facebook" />
                <LogoImage src="/google-logo.png" alt="google" />
                <LogoImage src="/instagram-logo.png" alt="instagram" />
                <LogoImage src="/linux-logo.png" alt="linux" />
                <LogoImage src="/microsoft-logo.png" alt="microsoft" />
                <LogoImage src="/netflix-logo.png" alt="netflix" />
                <LogoImage src="/reddit-logo.png" alt="reddit" />
            </Marquee>

            <div className="text-center mt-10 font-normal tracking-widest text-lg w-[35%] mx-auto text-slate-600">
                CUSTOMIZABLE
            </div>
        </div>
    );
};

export default MainContent;
