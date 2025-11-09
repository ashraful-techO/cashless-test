import { assuranceAPI } from "@/libs/api";
import Image from "next/image";
import { FC, useEffect, useId, useState } from "react";

interface PropsType {
  label: string;
  setValue: any;
  imageURL?: string;
}

export const FileUpload: FC<PropsType> = ({ label, imageURL, setValue }) => {
  console.log({ imageURL });
  const inputId = useId();
  const [file, setFile] = useState<any>();

  const handleUploadPolicyImage = async (file: File | null) => {
    if (file) {
      const payload = new FormData();
      payload.append("file", file);
      payload.append("type", "DOCUMENT");
      try {
        const { success, data, message } = await assuranceAPI.uploadImage(
          payload
        );
        console.log({ data });
        const url = data || "";
        console.log({ url });
        setValue(url);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  const handleDeleteFile = () => {
    setValue("");
  };

  useEffect(() => {
    if (file) handleUploadPolicyImage(file);
  }, [file]);

  return (
    <div>
      <p className="font-normal mb-1 mt-4">{label}</p>

      {imageURL ? (
        <div className="relative h-full">
          <a
            href={imageURL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-blue-500 underline-offset-8 h-[159px] max-h-[159px] flex items-center justify-center rounded-lg"
          >
            <iframe
              src={imageURL}
              className=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <p className="text-center text-blue-800 text-sm mt-1">
              Click to open the file
            </p>
          </a>
          <Image
            src="/images/icons/delete.png"
            alt=""
            width={24}
            height={24}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={handleDeleteFile}
          />
        </div>
      ) : (
        <div>
          <input
            type="file"
            id={inputId}
            onChange={(e) =>
              setFile(e?.target?.files && e.target.files?.[0]) as any
            }
            style={{ display: "none" }}
          />

          <label htmlFor={inputId} className="upload-label">
            <div className="bg-gray-200 h-[159px] max-h-[159px] flex items-center justify-center rounded-lg">
              <div className="flex flex-col gap-1 items-center">
                <p className="text-center mb-2 font-medium ">
                  Drag & Drop or{" "}
                  <span style={{ color: "var(--primary)", cursor: "pointer" }}>
                    Choose
                  </span>{" "}
                  file to upload
                </p>
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};
