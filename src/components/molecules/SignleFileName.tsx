import { getFileSizeInMB } from "@/utils/helpers/handlers.helpers";
import { FC } from "react";

interface ISingleFileProps {
	data: File | null;
	isLoading?: boolean;
}

export const SingleFileName: FC<ISingleFileProps> = ({ data, isLoading }) => {
	const { name, size } = data || {};
	return (
		<div className="p-4 mb-4 border border-gray-300 rounded-md relative">
			<p className="flex items-center">
				<img src="/images/icons/csv.png" alt="csv-icon" style={{ marginRight: 4 }} /> {name}
				{/* {isLoading && <CircularProgress color="primary" size={20} sx={{ ml: "auto" }} />} */}
			</p>
			<p className="">{getFileSizeInMB(size as number)}</p>
		</div>
	);
};
