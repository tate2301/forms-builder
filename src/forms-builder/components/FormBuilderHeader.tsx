import Flex from "@/components/flex";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

interface FormBuilderHeaderProps {
	onPreviewClick: () => void;
	onPublishClick: () => void;
}

export function FormBuilderHeader({
	onPreviewClick,
	onPublishClick,
}: FormBuilderHeaderProps) {
	return (
		<Flex justifyContent="between">
			<Flex alignItems="center">
				{/* Add any left-side content here, e.g., form title */}
			</Flex>
			<Flex alignItems="center">
				<Button variant="outline" color="surface" onClick={onPreviewClick}>
					<EyeIcon className="size-4" />
					Preview
				</Button>
				<Button onClick={onPublishClick}>Publish changes</Button>
			</Flex>
		</Flex>
	);
}
