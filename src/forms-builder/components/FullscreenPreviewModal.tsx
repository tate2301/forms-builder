import { Button } from "@/components/ui/button";
import type { Form } from "../types";
import { renderField } from "../utils/fieldRenderer";

interface FullscreenPreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	form: Form;
}

export function FullscreenPreviewModal({
	isOpen,
	onClose,
	form,
}: FullscreenPreviewModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: "$white",
					padding: "32px",
					borderRadius: "8px",
					maxWidth: "600px",
					width: "100%",
					maxHeight: "90vh",
					overflowY: "auto",
				}}
			>
				<h2 className="mb-2 tracking-tight">{form.title}</h2>
				{form.description && <p className="mb-6">{form.description}</p>}
				<form>
					{form.fields?.map((field) => (
						<div key={field.id} style={{ marginBottom: "16px" }}>
							{renderField(field)}
						</div>
					))}
				</form>
				<Button onClick={onClose} style={{ marginTop: "16px" }}>
					Close Preview
				</Button>
			</div>
		</div>
	);
}
