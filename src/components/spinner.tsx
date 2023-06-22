import { SpinnerCircularFixed } from "spinners-react";

interface IProps {
    label?: string;
    showLabel?: boolean;
    original?: boolean;
    color?: string;
}

const Spinner = (props: IProps) => {
    const { label = "Loading...", showLabel = true, original = false } = props;

    const color = original ? "rgb(37 99 235)" : "#ffffff"

    return (
        <div className="flex flex-row justify-center items-center space-x-2">
            <SpinnerCircularFixed
                size={original ? 40 : 20}
                thickness={100}
                speed={100}
                color={color}
                secondaryColor="rgba(0, 0, 0, 0.44)"
            />
            {showLabel && <div>{label}</div>}
        </div>
    );
};

export default Spinner;
