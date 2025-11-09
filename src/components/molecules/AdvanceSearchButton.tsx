"use client";
import Icon, { arrowDown } from "@/libs/Icons";
import { Button } from "@material-tailwind/react";
import { FC } from "react";

interface PropsType {
	openPopover: () => void;
}
export const AdvanceSearchButton: FC<PropsType> = ({ openPopover }) => {
	return (
		<Button
			className="flex pl-4 py-3 hover:bg-transparent text-secondary/90 font-normal w-full rounded-none normal-case"
			variant="text"
			onClick={openPopover}
			ripple={false}
		>
			Advanced search <Icon path={arrowDown} width={16} height={16} fill="#2B2B2B" />
		</Button>
	);
};
