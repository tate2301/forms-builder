import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_THEME } from "../constants";
import { useFormContext } from "../context";
import { predefinedThemes } from "../utils/themeUtils";

export function FormSettings() {
	const { form, updateForm } = useFormContext();
	const theme = form.theme || DEFAULT_THEME;

	const handleChange = (key: keyof typeof form, value: string) => {
		updateForm({ [key]: value });
	};

	const handleThemeSelect = (themeId: string) => {
		const selectedTheme = predefinedThemes.find(
			(theme) => theme.id === themeId,
		);
		if (selectedTheme) {
			updateForm({
				theme: {
					...selectedTheme, // Use the entire selected theme
					id: themeId, // Ensure the ID is set
				},
			});
		}
	};

	return (
		<div className="space-y-8 p-4">
			{/* Basic Settings */}
			<section className="space-y-4">
				<p color={"primary"}>Basic Settings</p>
				<div className="space-y-4">
					<div>
						<Label htmlFor="formTitle">Form Title</Label>
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
				</div>
			</section>

			{/* Theme Settings */}
			<section className="space-y-4">
				<p color={"primary"}>Theme</p>

				{/* Theme Palettes Grid */}
				<div className="grid grid-cols-2 gap-3">
					{predefinedThemes.map((presetTheme) => (
						<button
							type="button"
							key={presetTheme.id}
							onClick={() => handleThemeSelect(presetTheme.id)}
							className={`rounded-lg border p-4 transition-all ${
								theme.id === presetTheme.id ? "ring-2 ring-primary" : ""
							}`}
							style={{
								background: presetTheme.colors.background,
								color: presetTheme.colors.text,
							}}
						>
							<div className="space-y-2">
								<h3 className="font-medium text-sm">{presetTheme.name}</h3>
								<div className="flex gap-1.5">
									{Object.values(presetTheme.colors).map((color, i) => (
										<div
											key={i}
											className="h-4 w-4 rounded-full"
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
							</div>
						</button>
					))}
				</div>

				{/* Custom Color Controls */}
				<div className="mt-6 space-y-4">
					<p>Customize Colors</p>
					<div className="space-y-3">
						<div>
							<Label htmlFor="primaryColor">Primary Color</Label>
							<div className="flex gap-2">
								<div
									className="h-10 w-10 rounded border"
									style={{
										backgroundColor:
											theme.colors?.background ||
											DEFAULT_THEME.colors.background,
									}}
								/>
								<Input
									id="primaryColor"
									value={theme.colors?.primary || DEFAULT_THEME.colors.primary}
									onChange={(e) =>
										updateForm({
											theme: {
												...theme,
												colors: {
													...theme.colors,
													primary: e.target.value,
												},
											},
										})
									}
								/>
							</div>
						</div>

						<div>
							<Label htmlFor="backgroundColor">Background Color</Label>
							<div className="flex gap-2">
								<div
									className="h-10 w-10 rounded border"
									style={{
										backgroundColor:
											theme.colors?.background ||
											DEFAULT_THEME.colors.background,
									}}
								/>
								<Input
									id="backgroundColor"
									value={
										theme.colors?.background || DEFAULT_THEME.colors.background
									}
									onChange={(e) =>
										updateForm({
											theme: {
												...theme,
												colors: {
													...theme.colors,
													background: e.target.value,
												},
											},
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
