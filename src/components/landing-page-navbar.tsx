import dynamic from "next/dynamic";
import Link from "next/link";
import { RiShieldKeyholeFill } from "react-icons/ri";

import LinkButton from "./link-button";

const MdKeyboardArrowDown = dynamic(() => import("react-icons/md").then((mod) => mod.MdKeyboardArrowDown), {
    ssr: false,
});

interface IProps {
    title: string;
    downArrow?: boolean;
    href?: string;
}

const NavItem = (props: IProps) => {
    const { title, downArrow = true, href = "/" } = props;

    return (
        <Link className="flex cursor-pointer flex-row items-center text-lg font-medium hover:text-blue-600" href={href}>
            {title}
            <span>{downArrow && <MdKeyboardArrowDown size="1.5em" />}</span>
        </Link>
    );
};

const LandingPageNavBar = () => {
    return (
        <nav className="flex h-20 flex-row items-center justify-between">
            <div className="flex w-[60%] flex-row items-center justify-between">
                <Link className="flex w-[30%] flex-row items-center justify-center p-2 text-3xl" href="/">
                    <span>
                        <RiShieldKeyholeFill size="1.1em" className="text-blue-600" />
                    </span>
                    AKMS
                </Link>
                <div className="flex w-[80%] flex-row justify-between">
                    <NavItem title="Products" />
                    <NavItem title="Developer" />
                    <NavItem title="Resources" />
                    <NavItem title="Use Cases" />
                    <NavItem title="Pricing" downArrow={false} href="/pricing" />
                </div>
            </div>
            <div className="w-[35%]">
                <div className="flex flex-row justify-center space-x-4 p-2">
                    <div className="cursor-pointer p-2 text-lg hover:text-blue-600">Talk to an expert</div>
                    <LinkButton />
                </div>
            </div>
        </nav>
    );
};

export default LandingPageNavBar;
