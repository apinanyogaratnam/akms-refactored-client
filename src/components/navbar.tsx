import dynamic from "next/dynamic";
import { RiShieldKeyholeFill } from "react-icons/ri";

import Button from "./button";

const MdKeyboardArrowDown = dynamic(() => import("react-icons/md").then((mod) => mod.MdKeyboardArrowDown), {
    ssr: false,
});

interface IProps {
    title: string;
    downArrow?: boolean;
}

const NavItem = (props: IProps) => {
    const { title, downArrow = true } = props;

    return (
        <div className="text-lg font-medium hover:text-blue-600 cursor-pointer flex flex-row items-center">
            {title}
            <span>{downArrow && <MdKeyboardArrowDown size="1.5em" />}</span>
        </div>
    );
};

const NavBar = () => {
    return (
        <nav className="flex flex-row justify-between items-center h-20">
            <div className="w-[60%] flex flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center p-2 text-3xl w-[30%]">
                    <span>
                        <RiShieldKeyholeFill size="1.1em" className="text-blue-600" />
                    </span>
                    AKMS
                </div>
                <div className="flex flex-row justify-between w-[80%]">
                    <NavItem title="Products" />
                    <NavItem title="Developer" />
                    <NavItem title="Resources" />
                    <NavItem title="Use Cases" />
                    <NavItem title="Pricing" downArrow={false} />
                </div>
            </div>
            <div className="w-[35%]">
                <div className="p-2 flex flex-row justify-center space-x-4">
                    <div className="p-2 text-lg hover:text-blue-600 cursor-pointer">Talk to an expert</div>
                    <Button />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
