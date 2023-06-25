import Link from "next/link";

import Button from "./button";

interface IProps {
    label?: string;
    href?: string;
    onClick?: () => void;
}

const LinkButton = (props: IProps) => {
    const { label = "Start Building", href = "/signup" } = props;
    return (
        <Link href={href}>
            <Button label={label} />
        </Link>
    );
};

export default LinkButton;
