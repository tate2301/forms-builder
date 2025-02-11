import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
	Calendar,
	CheckCircle,
	LetterText,
	Mail,
	Star,
	StarHalf,
	TextCursorInput,
	ToggleLeft,
	Trash2Icon,
	UploadCloud,
} from "lucide-react";
import { useFormContext } from "../context";
import type { FormField } from "../types";

const fieldTypes = [
	{
		type: "shortAnswer",
		label: "Short Answer",
		icon: <TextCursorInput />,
	},
	{
		type: "longAnswer",
		label: "Long Answer",
		icon: <LetterText />,
	},
	{ type: "email", label: "Email", icon: <Mail /> },
	{ type: "date", label: "Date", icon: <Calendar /> },
	{
		type: "multipleChoice",
		label: "Multiple Choice",
		icon: <CheckCircle />,
	},
	{
		type: "yesNo",
		label: "Yes/No",
		icon: <ToggleLeft />,
	},
	{
		type: "npsRating",
		label: "NPS Rating",
		icon: <Star />,
	},
	{
		type: "likertScale",
		label: "Likert Scale",
		icon: <StarHalf />,
	},
	{
		type: "fileUpload",
		label: "File Upload",
		icon: <UploadCloud />,
	},
];

export function FieldList() {
	const { form, addField, selectedFieldId, setSelectedFieldId, removeField } =
		useFormContext();

	const handleAddField = (type: FormField["type"]) => {
		const newField: FormField = {
			id: `field_${Date.now()}`,
			type,
			label: `${fieldTypes.find((fieldType) => fieldType.type === type)?.label}`,
			required: false,
			properties: {},
		};
		addField(newField);
		setSelectedFieldId(newField.id);
	};

	return (
		<div className="flex max-h-full flex-col">
			{/* Field Types Section - Fixed height with scroll */}
			<div className="flex-none">
				<div className="px-4">
					<p className="font-bold text-content-tertiary uppercase">
						Field types
					</p>
					<p className="text-content-tertiary">
						Click an item to add to the form
					</p>
				</div>
				<Separator className="my-2" />
				<div className="max-h-[300px] overflow-y-auto px-4 pb-4">
					<div className="grid grid-cols-2 gap-2">
						{fieldTypes.map((fieldType) => (
							<button
								type="button"
								key={fieldType.type}
								onClick={() =>
									handleAddField(fieldType.type as FormField["type"])
								}
								style={{
									justifyContent: "flex-start",
									gap: "8px",
								}}
								className="flex w-full items-center justify-start gap-2 rounded-lg bg-zinc-50 px-2 py-2 font-medium text-content-secondary hover:bg-zinc-100"
							>
								<span>{fieldType.icon}</span>
								{fieldType.label}
							</button>
						))}
					</div>
				</div>
			</div>

			<Separator className="my-2" />

			{/* Questions Section - Flexible height with scroll */}
			<div className="flex min-h-0 flex-1 flex-col pb-20">
				<div className="flex-none px-4">
					<p className="mb-2">Questions</p>
				</div>
				<div className="flex-1 px-1 pb-20">
					<ul className="list-decimal space-y-2 text-zinc-600">
						{form.fields?.map((field) => (
							<FieldListItem
								key={field.id}
								field={field}
								isSelected={field.id === selectedFieldId}
								onSelect={() => setSelectedFieldId(field.id)}
								onDelete={() => removeField(field.id)}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

const FieldListItem = ({
	field,
	isSelected,
	onSelect,
	onDelete,
}: {
	field: FormField;
	isSelected: boolean;
	onSelect: () => void;
	onDelete: () => void;
}) => {
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (confirm("Are you sure you want to delete this field?")) {
			onDelete();
		}
	};

	return (
		<li onClick={onSelect} className="group relative w-full">
			<button
				type="button"
				className={cn(
					"flex h-[40px] w-full flex-1 items-center justify-start gap-4 rounded-lg border border-zinc-400/10 bg-zinc-50 px-3 py-2 text-zinc-600",
					isSelected && "border-indigo-800 bg-indigo-600 text-white",
				)}
			>
				<span>{fieldTypes.find((type) => type.type === field.type)?.icon}</span>
				<p className="line-clamp-1 w-full flex-1 text-left">{field.label}</p>
			</button>
			<Button
				variant="ghost"
				color="red"
				onClick={handleDelete}
				className="pressable-shadow absolute right-4 bg-white opacity-0 group-hover:opacity-100"
			>
				<Trash2Icon className="size-4" />
			</Button>
		</li>
	);
};
