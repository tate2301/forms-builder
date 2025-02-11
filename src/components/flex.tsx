import type { ReactNode } from "react";

type FlexProps = {
	children?: ReactNode;
	justifyContent?: string;
	alignItems?: string;
};

const Flex = (props: FlexProps) => {
	return <div className="flex">{props.children}</div>;
};

export default Flex;
