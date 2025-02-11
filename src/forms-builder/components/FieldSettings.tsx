import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "../context";

export function FormSettings() {
	const { form, updateForm } = useFormContext();

	const handleChange = (key: keyof typeof form, value: string) => {
		updateForm({ [key]: value });
	};

	return (
		<div className="space-y-4">
			<p color={"primary"} className="font-medium text-lg">
				Form Settings
			</p>
			<div>
				<Label htmlFor="formTitle">Title</Label>
				<Input
					id="formTitle"
					value={form.title}
					onChange={(e) => handleChange("title", e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor="formDescription">Description</Label>
				<Textarea
					id="formDescription"
					value={form.description}
					onChange={(e) => handleChange("description", e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor="fontFamily">Font Family</Label>
				<Input
					id="fontFamily"
					value={form.theme.font}
					onChange={(e) =>
						updateForm({ theme: { ...form.theme, font: e.target.value } })
					}
				/>
			</div>
		</div>
	);
}
