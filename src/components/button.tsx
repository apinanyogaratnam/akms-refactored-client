import { IoIosArrowForward } from "react-icons/io";

const Button = () => {
    return (
        <button className="flex flex-row items-center h-12 p-5 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:shadow-lg border-[1px] hover:border-blue-600 rounded-md text-lg transition duration-300">
            Start Building
            <span>
                <IoIosArrowForward size="1.3em" />
            </span>
        </button>
    );
};

export default Button;
