import { IoIosArrowForward } from "react-icons/io";

interface IProps {
    label: string;
    onClick?: () => void;
    arrow?: boolean;
}

const Button = (props: IProps) => {
    const { label, onClick, arrow = true } = props;

    return (
        <button
            className="flex h-12 flex-row items-center rounded-md border-[1px] bg-blue-600 p-5 text-lg text-white transition duration-300 hover:border-blue-600 hover:bg-white hover:text-blue-600 hover:shadow-lg"
            onClick={onClick}
        >
            {label}
            {arrow && (
                <span>
                    <IoIosArrowForward size="1.3em" />
                </span>
            )}
        </button>
    );
};

export default Button;
