import { Button } from "@material-tailwind/react";
import { FC, MouseEventHandler } from "react";

export const Item: FC<PagiItemProps> = (props) => {
	const { isDots, children, ...rest } = props;

	return (
		<li className="flex my-0 mx-[2px]">
			{isDots ? (
				<span className="w-7 h-7 leading-8 text-center">{children}</span>
			) : (
				<Button {...rest}>{children}</Button>
			)}
		</li>
	);
};

interface PagiItemProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isDots?: boolean;
	className?: string;
	children: any;
}
