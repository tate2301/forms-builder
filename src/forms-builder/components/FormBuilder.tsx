import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListIcon, SettingsIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../context";
import type { Form } from "../types";
import { FieldList } from "./FieldList";
import { FieldProperties } from "./FieldProperties";
import { FormPreview } from "./FormPreview";
import { FormSettings } from "./FormSettings";
import { FullscreenPreviewModal } from "./FullscreenPreviewModal";

interface FormBuilderProps {
	formName: string;
	formDescription: string;
	initialForm?: Form;
}

export function FormBuilderPresenter({
	formName,
	formDescription,
}: FormBuilderProps) {
	const { form, updateForm, selectedFieldId } = useFormContext();
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
	const [activeTab, setActiveTab] = React.useState<"fields" | "settings">(
		"fields",
	);

	// Add dependency check to prevent infinite updates
	React.useEffect(() => {
		if (form.title !== formName || form.description !== formDescription) {
			updateForm({
				title: formName,
				description: formDescription,
			});
		}
	}, [formName, formDescription, form.title, form.description, updateForm]);

	const handlePreviewClick = () => {
		setIsPreviewModalOpen(true);
	};

	const handlePublish = () => {
		// Implement publish logic here
	};

	return (
		<div className="h-full overflow-hidden">
			<div className="flex h-full flex-1 divide-x divide-zinc-400/20">
				<aside className="w-1/4 overflow-y-auto bg-white pb-40">
					<Tabs defaultValue="fields">
						<TabsList className="sticky top-0 border-zinc-200 border-b bg-white px-4 py-2">
							<TabsTrigger value="fields" className="flex items-center gap-2">
								<ListIcon />
								Fields
							</TabsTrigger>
							<TabsTrigger value="settings" className="flex items-center gap-2">
								<SettingsIcon />
								Settings
							</TabsTrigger>
						</TabsList>

						<div className="py-4">
							<TabsContent value="fields">
								<FieldList />
							</TabsContent>
							<TabsContent value="settings">
								<FormSettings />
							</TabsContent>
						</div>
					</Tabs>
				</aside>
				<main className="w-1/2 overflow-y-auto p-4 pb-40">
					<FormPreview />
				</main>
				<aside className="w-1/4 overflow-y-auto bg-white pb-40">
					{selectedFieldId && (
						<div className="p-4">
							<FieldProperties />
						</div>
					)}
				</aside>
			</div>
			<FullscreenPreviewModal
				isOpen={isPreviewModalOpen}
				onClose={() => setIsPreviewModalOpen(false)}
				form={form}
			/>
		</div>
	);
}

export function FormBuilder(props: FormBuilderProps) {
	return <FormBuilderPresenter {...props} />;
}
