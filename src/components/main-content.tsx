import Image from "next/image";
import Marquee from "react-fast-marquee";
import { CiCreditCardOff } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";

import Button from "./button";

interface LogoImageProps {
    src: string;
    alt: string;
}

const LogoImage = (props: LogoImageProps) => {
    const { src, alt } = props;

    return (
        <div className="mx-4">
            <Image src={src} alt={alt} className="w-[150px]" width={150} height={150} />
        </div>
    );
};

const MainContent = () => {
    return (
        <div className="mt-10">
            <h1 className="mx-auto w-[65%] text-center text-7xl font-bold">
                Build Powerful Live Experiences in Your Product
            </h1>
            <h1 className="mx-auto mt-10 w-[35%] text-center text-lg font-normal tracking-widest text-slate-600">
                Integrate custom, secure, high-quality live video and voice to your product in just a few lines of code.
            </h1>
            <div className="mt-10 flex flex-row items-center justify-center space-x-4">
                <Button />
                <div className="flex cursor-pointer flex-row font-medium text-blue-600 hover:underline">
                    Talk to an expert
                    <span>
                        <IoIosArrowForward size="1.3em" className="mt-[2px]" />
                    </span>
                </div>
            </div>
            <div className="mt-5 flex flex-row items-center justify-center space-x-4 text-slate-600">
                <div className="flex flex-row items-center justify-center">
                    <span>
                        <CiCreditCardOff size="1.3em" className="mt-[2px]" />
                    </span>
                    No credit card required
                </div>
                <div className=" flex cursor-pointer flex-row">
                    <span>
                        <IoGiftOutline size="1.3em" className="mt-[2px]" />
                    </span>
                    FREE 10,000 minutes every month
                </div>
            </div>
            <h1 className="mx-auto mt-10 w-[35%] text-center text-lg font-normal tracking-widest text-slate-600">
                TRUSTED ACROSS INDUSTRIES
            </h1>
            <div className="mx-auto mt-20 w-[60%] overflow-hidden rounded-xl border-2 border-gray-200">
                <Image
                    src="/preview.png"
                    alt="preview"
                    className="mt-3 w-full"
                    width={200}
                    height={200}
                    unoptimized={true}
                    loading="lazy"
                />
            </div>
            <Marquee speed={25} className="fixed mt-10">
                <LogoImage src="/bitcoin-logo.png" alt="bitcoin" />
                <LogoImage src="/facebook-logo.png" alt="facebook" />
                <LogoImage src="/google-logo.png" alt="google" />
                <LogoImage src="/instagram-logo.png" alt="instagram" />
                <LogoImage src="/linux-logo.png" alt="linux" />
                <LogoImage src="/microsoft-logo.png" alt="microsoft" />
                <LogoImage src="/netflix-logo.png" alt="netflix" />
                <LogoImage src="/reddit-logo.png" alt="reddit" />
            </Marquee>
            <div className="mx-auto mt-10 w-[35%] text-center text-lg font-normal tracking-widest text-slate-600">
                CUSTOMIZABLE
            </div>
        </div>
    );
};

export default MainContent;
