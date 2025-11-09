import { FileUploaderDnd } from "@/components/molecules";
import { assuranceAPI } from "@/libs/api";

import Image from "next/image";
import { FC, useState } from "react";

interface PropsType {
  document: any;
  setDocument: any;
}
export const DocumentsUpload: FC<PropsType> = ({ document, setDocument }) => {
  const [loadingPolicy, setIsLoadingPolicy] = useState(false);
  const [loadingMedical, setIsLoadingMedical] = useState(false);

  const handleUploadPolicyImage = async (file: File | null) => {
    if (file) {
      try {
        setIsLoadingPolicy(true);
        const payload = new FormData();
        payload.append("file", file);
        payload.append("type", "DOCUMENT");

        const { success, data, message } = await assuranceAPI.uploadImage(
          payload
        );
        if (success) {
          setDocument((prev: any) => ({
            ...prev,
            policyDoc: data,
          }));
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingPolicy(false);
      }
    }
  };

  const handleUploadMedicalDoc = async (file: File | null) => {
    if (file) {
      try {
        setIsLoadingMedical(true);
        const payload = new FormData();
        payload.append("file", file);
        payload.append("type", "DOCUMENT");

        const { success, data, message } = await assuranceAPI.uploadImage(
          payload
        );
        if (success) {
          setDocument((prev: any) => ({
            ...prev,
            medicalDoc: data,
          }));
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingMedical(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-x-4">
      {document?.policyDoc ? (
        <div>
          <p className={`font-normal mb-1 mt-4 `}>
            User Poliy Screenshot Upload
          </p>
          <Image
            src={document?.policyDoc || "/images/default-img.png"}
            alt=""
            width={200}
            height={200}
            className="w-full"
          />
        </div>
      ) : loadingPolicy ? (
        <div className="mt-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="my-2 h-4 w-full rounded-sm bg-gray-300 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <FileUploaderDnd
          getFileHandler={handleUploadPolicyImage}
          fileFormat={["image/jpeg", "image/jpg", "image/png"]}
          supportFormat="jpeg, jpg, png"
          label="User Poliy Screenshot Upload"
        />
      )}

      {document?.medicalDoc ? (
        <div>
          <p className={`font-normal mb-1 mt-4 `}>
            Medical Assessment Scan Copy
          </p>
          <Image
            src={document?.medicalDoc || "/images/default-img.png"}
            alt=""
            width={200}
            height={200}
            className="w-full"
          />
        </div>
      ) : loadingMedical ? (
        <div className="mt-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="my-2 h-4 w-full rounded-sm bg-gray-300 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <FileUploaderDnd
          getFileHandler={handleUploadMedicalDoc}
          fileFormat={[
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ]}
          supportFormat="jpeg, jpg, png, pdf"
          label="Medical Assessment Upload"
        />
      )}
    </div>
  );
};
