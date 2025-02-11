import { Button } from "@/components/ui/button";
import { Input as TextField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { KeyboardEvent } from "react";
import { useFormContext } from "../context";
import type { FormField, InputType } from "../types";

const fieldTypes = [
	{ value: "shortAnswer", label: "Short Answer" },
	{ value: "longAnswer", label: "Long Answer" },
	{ value: "email", label: "Email" },
	{ value: "date", label: "Date" },
	{ value: "multipleChoice", label: "Multiple Choice" },
	{ value: "yesNo", label: "Yes/No" },
	{ value: "npsRating", label: "NPS Rating" },
	{ value: "fileUpload", label: "File Upload" },
	{ value: "likertScale", label: "Likert Scale" },
];

export function FieldProperties() {
	const { form, updateField, selectedFieldId } = useFormContext();
	const selectedField = form.fields?.find(
		(field) => field.id === selectedFieldId,
	);

	if (!selectedField) {
		return null;
	}

	const handleChange = (key: keyof FormField, value: any) => {
		updateField(selectedField.id, { [key]: value });
	};

	const handlePropertyChange = (key: string, value: any) => {
		// Validate numeric inputs
		if (typeof value === "number" && Number.isNaN(value)) {
			return;
		}

		// Ensure choices array is never empty for multiple choice
		if (key === "choices" && Array.isArray(value) && value.length === 0) {
			value = ["Option 1"];
		}

		updateField(selectedField.id, {
			properties: { ...selectedField.properties, [key]: value },
		});
	};

	const handleTypeChange = (newType: InputType) => {
		updateField(selectedField.id, {
			type: newType,
			properties: {}, // Reset properties when changing type
		});
	};

	const handleChoiceKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		_index: number,
	) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const newChoices = [...(selectedField.properties.choices || []), ""];
			handlePropertyChange("choices", newChoices);
		}
	};

	return (
		<div className="space-y-4">
			<p color={"primary"} className="font-medium text-lg">
				Field Properties
			</p>

			<div className="flex flex-col gap-2">
				<Label htmlFor="fieldType">Field Type</Label>
				<Select
					value={selectedField.type}
					onValueChange={(value) => handleTypeChange(value as InputType)}
				>
					<SelectTrigger />
					<SelectContent>
						{fieldTypes.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Separator className="my-4" />

			<div>
				<Label htmlFor="fieldLabel">Label</Label>
				<TextField
					id="fieldLabel"
					value={selectedField.label}
					onChange={(e) => handleChange("label", e.target.value)}
				/>
			</div>

			<div className="flex items-center space-x-2">
				<Switch
					id="required"
					checked={selectedField.required}
					onCheckedChange={(checked) => handleChange("required", checked)}
				/>
				<Label htmlFor="required">Required</Label>
			</div>

			<div>
				<Label htmlFor="placeholder">Placeholder</Label>
				<TextField
					id="placeholder"
					value={selectedField.properties.placeholder || ""}
					onChange={(e) => handlePropertyChange("placeholder", e.target.value)}
				/>
			</div>

			{/* Render type-specific properties */}
			{(selectedField.type === "shortAnswer" ||
				selectedField.type === "longAnswer") && (
				<>
					<div>
						<Label htmlFor="minLength">Min Length</Label>
						<TextField
							id="minLength"
							type="number"
							value={selectedField.properties.minLength || ""}
							onChange={(e) =>
								handlePropertyChange(
									"minLength",
									Number.parseInt(e.target.value),
								)
							}
						/>
					</div>
					<div>
						<Label htmlFor="maxLength">Max Length</Label>
						<TextField
							id="maxLength"
							type="number"
							value={selectedField.properties.maxLength || ""}
							onChange={(e) =>
								handlePropertyChange(
									"maxLength",
									Number.parseInt(e.target.value),
								)
							}
						/>
					</div>
				</>
			)}

			{selectedField.type === "multipleChoice" && (
				<div>
					<Label>Choices</Label>
					{selectedField.properties.choices?.map((choice, index) => (
						<div key={index} className="mt-2 flex items-center space-x-2">
							<TextField
								value={choice}
								onChange={(e) => {
									const newChoices = [
										...(selectedField.properties.choices || []),
									];
									newChoices[index] = e.target.value;
									handlePropertyChange("choices", newChoices);
								}}
								onKeyDown={(e) => handleChoiceKeyDown(e, index)}
							/>
							<Button
								onClick={() => {
									const newChoices = selectedField.properties.choices?.filter(
										(_, i) => i !== index,
									);
									handlePropertyChange("choices", newChoices);
								}}
								variant="destructive"
								size="sm"
							>
								Remove
							</Button>
						</div>
					))}
					<Button
						onClick={() => {
							const newChoices = [
								...(selectedField.properties.choices || []),
								"",
							];
							handlePropertyChange("choices", newChoices);
						}}
						className="mt-2"
					>
						Add Choice
					</Button>
				</div>
			)}

			{selectedField.type === "npsRating" && (
				<div>
					<Label htmlFor="npsMaxRating">Max Rating (NPS)</Label>
					<TextField
						id="npsMaxRating"
						type="number"
						value={selectedField.properties.npsMaxRating || 10}
						onChange={(e) =>
							handlePropertyChange(
								"npsMaxRating",
								Number.parseInt(e.target.value),
							)
						}
					/>
				</div>
			)}

			{selectedField.type === "fileUpload" && (
				<>
					<div>
						<Label htmlFor="allowedFileTypes">
							Allowed File Types (comma-separated)
						</Label>
						<TextField
							id="allowedFileTypes"
							value={selectedField.properties.allowedFileTypes?.join(",") || ""}
							onChange={(e) =>
								handlePropertyChange(
									"allowedFileTypes",
									e.target.value.split(","),
								)
							}
						/>
					</div>
					<div>
						<Label htmlFor="maxFileSize">Max File Size (MB)</Label>
						<TextField
							id="maxFileSize"
							type="number"
							value={selectedField.properties.maxFileSize || ""}
							onChange={(e) =>
								handlePropertyChange(
									"maxFileSize",
									Number.parseInt(e.target.value),
								)
							}
						/>
					</div>
				</>
			)}

			{selectedField.type === "likertScale" && (
				<div>
					<Label htmlFor="likertScalePoints">Number of Scale Points</Label>
					<TextField
						id="likertScalePoints"
						type="number"
						value={selectedField.properties.scalePoints || 5}
						onChange={(e) =>
							handlePropertyChange(
								"scalePoints",
								Number.parseInt(e.target.value),
							)
						}
					/>
				</div>
			)}
		</div>
	);
}
