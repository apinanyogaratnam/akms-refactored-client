import { CiCreditCardOff } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";

import Button from "./button";

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
        </div>
    );
};

export default MainContent;