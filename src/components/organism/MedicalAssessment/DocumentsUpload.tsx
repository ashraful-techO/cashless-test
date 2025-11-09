import { assuranceAPI } from "@/libs/api";
import { FC, useId, useState } from "react";

interface PropsType {
  document: any;
  setDocument: any;
}
export const DocumentsUpload: FC<PropsType> = ({ document, setDocument }) => {
  const [loadingPolicy, setIsLoadingPolicy] = useState(false);
  const [loadingMedical, setIsLoadingMedical] = useState(false);
  const inputId = useId();

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
          <a
            href={document?.policyDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-blue-500 underline-offset-8 h-[159px] max-h-[159px] flex items-center justify-center rounded-lg"
          >
            Click to open the file
          </a>
        </div>
      ) : (
        <div>
          <p className="font-normal mb-1 mt-4">User Poliy Screenshot Upload</p>
          <input
            type="file"
            id={inputId}
            onChange={(e) =>
              handleUploadPolicyImage(e.target.files?.[0] || null)
            }
            style={{ display: "none" }}
          />

          <label htmlFor={inputId} className="upload-label">
            <div className="border border-dashed h-[159px] max-h-[159px] flex items-center justify-center rounded-lg">
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

      {document?.medicalDoc ? (
        <div>
          <p className={`font-normal mb-1 mt-4 `}>
            Medical Assessment Scan Copy
          </p>

          <a
            href={document?.medicalDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-blue-500 underline-offset-8 h-[159px] max-h-[159px] flex items-center justify-center rounded-lg"
          >
            <iframe
              src={document?.medicalDoc}
              className=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            Click to open the file
          </a>
        </div>
      ) : (
        <div>
          <p className="font-normal mb-1 mt-4">Medical Assessment Scan Copy</p>
          <input
            type="file"
            id={inputId}
            onChange={(e) =>
              handleUploadMedicalDoc(e.target.files?.[0] || null)
            }
            style={{ display: "none" }}
          />

          <label htmlFor={inputId} className="upload-label">
            <div className="border border-dashed h-[159px] max-h-[159px] flex items-center justify-center rounded-lg">
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
