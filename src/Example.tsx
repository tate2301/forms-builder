import "./Example.css";

import React from "react";
import { FormBuilder } from "./forms-builder/components/FormBuilder";
import { FormProvider } from "./forms-builder/context";

export type ExampleProps = {
	text?: string;
};

export function Example(_props: ExampleProps) {
	const [count, setCount] = React.useState(0);
	return (
		<FormProvider>
			<FormBuilder formName="Example form" formDescription="Description" />
		</FormProvider>
	);
}
