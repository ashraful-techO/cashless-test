import { FC } from "react";

interface PropsType {
	rowNumber: number;
	cellNumber: number;
}
export const TableLoader: FC<PropsType> = ({ rowNumber, cellNumber }) => {
	return (
		<>
			{Array.from({ length: rowNumber }).map((_, rowIndex) => (
				<tr key={rowIndex}>
					{Array.from({ length: cellNumber }).map((_, cellIndex) => (
						<td className="px-4" key={cellIndex}>
							<div className=" my-3 h-3 w-[calc(100vw - 50px)] rounded-full bg-gray-300 animate-pulse"></div>
						</td>
					))}
				</tr>
			))}
		</>
	);
};
