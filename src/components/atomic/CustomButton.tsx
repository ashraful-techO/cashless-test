"use client";
import { Button } from "@material-tailwind/react";
import { FC } from "react";

export const CustomButton: FC<PropsType> = ({ children, variant, handleClick }) => {
	return (
		<Button
			variant={variant}
			className="rounded-md py-2 px-2 w-full my-2 text-xs border-[#aeaeae] hover:border-none hover:bg-primary hover:text-white hover:opacity-100 focus:ring-0 "
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

type VariantType = "outlined" | "filled" | "text";

interface PropsType {
	children: any;
	variant: VariantType;
	handleClick?: () => void;
}
