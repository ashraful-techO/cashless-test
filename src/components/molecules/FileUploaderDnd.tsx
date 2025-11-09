"use client";
import Icon, { uploadIcon } from "@/libs/Icons";
import { ChangeEvent, DragEvent, FC, useState } from "react";

interface PropsType {
	label?: string;
	isDisabled?: boolean;
	getFileHandler?: any;
	isRequired?: boolean;
	id?: string;
	fileFormat: string[];
	supportFormat: string;
}

export const FileUploaderDnd: FC<PropsType> = (props) => {
	const { id = "", fileFormat, supportFormat, isDisabled, isRequired = false, getFileHandler, label } = props;
	const [dragCount, setDragCount] = useState<number>(0);

	const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			if (!fileFormat.includes(e.target.files[0].type)) {
				alert("Invalid File type! ");
				return;
			} else {
				if (e.target.files[0]) getFileHandler(e.target?.files[0]);
			}
		}
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const { files } = e.dataTransfer;
		if (files && files[0]) {
			const payload = { target: { files } } as ChangeEvent<HTMLInputElement>;
			handleFileUpload(payload);
			setDragCount(0);
		} else {
			setDragCount(0);
		}
	};

	const handleDragCount = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === "dragenter") {
			setDragCount((prev) => (prev += 1));
		} else if (e.type === "dragleave" || e.type === "dragend") {
			setDragCount((prev) => (prev -= 1));
		}
	};

	return (
		<div>
			{label && <p className={`font-normal mb-1 mt-4 `}>{label}</p>}
			<input
				hidden
				type="file"
				name={id}
				multiple={false}
				id={`upload-img-${id}`}
				onChange={handleFileUpload}
				style={{ height: "1px", background: "black" }}
				required={isRequired}
				disabled={isDisabled}
			/>
			<div
				id="dropZone"
				onDrop={handleDrop}
				onDragEnter={handleDragCount}
				onDragLeave={handleDragCount}
				onDragOver={(e) => e.preventDefault()}
				className={`${
					dragCount > 0 ? "active" : ""
				} py-16 px-2 flex justify-center border border-dashed border-gray-300 rounded-lg `}
				title="Choose or drag & drop a file to Upload"
				onClick={() => document.getElementById(`upload-img-${id}`)?.click()}
			>
				<div>
					<div className="flex flex-col items-center">
						<Icon path={uploadIcon} fill="var(--primary)" width={48} height={48} />
						{/* <Image src="/images/metlife.png" width={200} height={200} alt="" /> */}
					</div>

					<p className="text-center mb-2 font-medium ">
						Drag & Drop or <span style={{ color: "var(--primary)", cursor: "pointer" }}>Choose</span> file
						to upload
					</p>

					<p className="text-center">Supported format: {supportFormat}</p>
				</div>
			</div>
		</div>
	);
};
