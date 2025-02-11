import { Example } from "@/Example";
import type { Meta, StoryFn } from "@storybook/react";
import { FormProvider } from "../forms-builder/context";

export default {
	title: "Example",
	component: Example,
	decorators: [
		(Story) => (
			<FormProvider>
				<Story />
			</FormProvider>
		),
	],
} as Meta<typeof Example>;

const Template: StoryFn<typeof Example> = (args) => <Example {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	text: "Example Form",
};
