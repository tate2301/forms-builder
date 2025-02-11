"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
	value,
	onChange,
}: {
	value: Date;
	onChange: (date: Date | undefined) => void;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild={true}>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
					)}
				>
					<CalendarIcon />
					{value ? format(value, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={onChange}
					initialFocus={true}
				/>
			</PopoverContent>
		</Popover>
	);
}
