import { FC } from "react";

interface PropsType {
	src?: string;
	name?: string;
	fontSize?: string;
	width?: string;
	height?: string;
}
export const Avatar: FC<PropsType> = ({ src, name, fontSize, width, height }) => {
	let firstChar;
	if (name) {
		firstChar = name.charAt(0);
	}

	return (
		<div>
			{src ? (
				<div className="rounded-lg">
					<img className={`rounded-full ${width}`} src={src} alt="Client Image" />
				</div>
			) : (
				<div className="inline-block">
					<div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center">
						<p className={`font-medium text-secondary  `}>{firstChar}</p>
					</div>
				</div>
			)}
		</div>
	);
};
