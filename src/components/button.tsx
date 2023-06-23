import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Button = () => {
    return (
        <Link href="/signup">
            <button className="flex h-12 flex-row items-center rounded-md border-[1px] bg-blue-600 p-5 text-lg text-white transition duration-300 hover:border-blue-600 hover:bg-white hover:text-blue-600 hover:shadow-lg">
                Start Building
                <span>
                    <IoIosArrowForward size="1.3em" />
                </span>
            </button>
        </Link>
    );
};

export default Button;
