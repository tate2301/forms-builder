import { useFormContext } from "../context";
import { renderField } from "../utils/fieldRenderer";
import { ensureCompleteTheme, getCssVariables } from "../utils/themeUtils";

export function FormPreview() {
	const { form } = useFormContext();
	const safeTheme = ensureCompleteTheme(form.theme);

	return (
		<div
			className="mx-auto max-w-3xl rounded-lg p-8 shadow-sm"
			style={
				{
					...getCssVariables(safeTheme),
					backgroundColor: "var(--background)",
					fontFamily: safeTheme.font,
					color: "var(--text)",
				} as React.CSSProperties
			}
		>
			<div className="space-y-8">
				<div className="space-y-2">
					<h1
						className="font-bold text-2xl"
						style={{ color: "var(--primary)" }}
					>
						{form.title}
					</h1>
					{form.description && (
						<p style={{ color: "var(--text-secondary)" }}>{form.description}</p>
					)}
				</div>
				<div className="space-y-6">
					{form.fields.map((field) => (
						<div key={field.id}>{renderField(field)}</div>
					))}
				</div>
			</div>
		</div>
	);
}
