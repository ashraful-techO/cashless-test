import { FC } from "react";
import { Item } from "./Item";
import { paginationRanges } from "./ranges";

export const Items: FC<PropsType> = ({ current, total, onClick }) => (
	<ul className="p-0 m-0 flex items-center">
		{current > 1 && (
			<Item
				className="w-auto text-primary bg-transparent shadow-none hover:shadow-none hover:bg-transparent capitalize text-xs font-normal p-0"
				onClick={() => onClick(current - 1)}
			>
				Previous
			</Item>
		)}

		{[...paginationRanges(current, total)].map((i) => (
			<Item
				key={i}
				isDots={!!(i === "...")}
				className={`w-7 h-7 text-center rounded-full text-[#707070] p-0 bg-transparent shadow-none hover:bg-primary/5 hover:shadow-none  ${
					i === current ? "text-white bg-primary" : ""
				}`}
				onClick={() => onClick(Number(i))}
			>
				{i}
			</Item>
		))}

		{current < total && (
			<Item
				className="w-auto text-primary bg-transparent shadow-none hover:shadow-none hover:bg-transparent capitalize text-xs font-normal p-0"
				onClick={() => onClick(current + 1)}
			>
				Next
			</Item>
		)}
	</ul>
);

interface PropsType {
	current: number;
	total: number;
	onClick: (page: number) => void;
}
