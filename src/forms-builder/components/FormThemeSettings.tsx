import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DEFAULT_THEME } from "../constants";
import { useFormContext } from "../context";

const fontFamilies = [
	{ value: "Inter, sans-serif", label: "Inter" },
	{ value: "Arial, sans-serif", label: "Arial" },
	{ value: "Georgia, serif", label: "Georgia" },
	{ value: "Helvetica, sans-serif", label: "Helvetica" },
	{ value: "Times New Roman, serif", label: "Times New Roman" },
];

export function FormThemeSettings() {
	const { form, updateForm } = useFormContext();
	const theme = form.theme || DEFAULT_THEME;
	const [showColorPicker, setShowColorPicker] = React.useState<
		"primary" | "background" | null
	>(null);

	const handleThemeChange = (key: keyof typeof theme, value: string) => {
		updateForm({
			theme: {
				...theme,
				[key]: value,
			},
		});
	};

	return (
		<div className="space-y-4">
			<p className="text-lg">Theme Settings</p>
			<Separator className="my-4" />

			<div>
				<div>
					<Label htmlFor="fontFamily">Font Family</Label>
					<Select
						value={theme.font || DEFAULT_THEME.font}
						onValueChange={(value) => handleThemeChange("font", value)}
					>
						<SelectTrigger />
						<SelectContent>
							{fontFamilies.map((font) => (
								<SelectItem key={font.value} value={font.value}>
									{font.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
