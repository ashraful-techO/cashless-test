import { FileUploaderDnd } from "@/components/molecules";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface PropsType {
  setValue: UseFormSetValue<Appoinmentdata>;
  testDocument: string[];
}

export const TestDocumentUpload: FC<PropsType> = ({
  setValue,
  testDocument,
}) => {
  const [uploaders, setUploaders] = useState<number[]>([1]);
  const [testDocuments, setTestDocuments] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 🔄 Sync with backend-provided documents
  useEffect(() => {
    if (testDocument && testDocument.length > 0) {
      setTestDocuments(testDocument);
      setSuccess(true);
    }
  }, [testDocument]);

  // Handle file upload
  const handleUploadTestImage = async (file: File | null) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const payload = new FormData();
      payload.append("file", file);
      payload.append("type", "DOCUMENT");

      const { success, data } = await assuranceAPI.uploadImage(payload);
      if (success) {
        const updated = [...testDocuments, data];
        setTestDocuments(updated);
        setValue("testDocument", updated);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Add more uploader if needed
  const addMoreUploader = () => {
    setSuccess(false);
    setUploaders([uploaders.length + 1]); // reset uploader
  };

  // Delete file
  const handleDeleteFile = (index: number) => {
    const updatedDocuments = testDocuments.filter((_, i) => i !== index);
    setTestDocuments(updatedDocuments);
    setValue("testDocument", updatedDocuments);
    setSuccess(updatedDocuments.length > 0);
  };

  return (
    <div>
      {/* File Uploader - Only visible if no successful upload */}
      {!success &&
        uploaders.map((id) => (
          <FileUploaderDnd
            key={id}
            getFileHandler={handleUploadTestImage}
            fileFormat={[
              "image/jpeg",
              "image/jpg",
              "image/png",
              "application/pdf",
            ]}
            supportFormat="jpeg, jpg, png, pdf"
            label="Lab Test Document"
          />
        ))}
      {isUploading && (
        <p className="text-sm text-gray-500 mt-2">Uploading...</p>
      )}

      {/* Uploaded Documents */}
      {testDocuments.length > 0 && (
        <div className="mt-4">
          <p className="font-normal mb-1">Uploaded Lab Test Documents</p>
          <div className="grid grid-cols-2 gap-5">
            {testDocuments.map((doc, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden"
              >
                {/* Wrap preview inside anchor for "Click to open file" */}
                <a
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 rounded-lg overflow-hidden"
                >
                  {doc.endsWith(".pdf") ? (
                    <iframe
                      src={doc}
                      style={{ width: "90%", height: "120px" }}
                    />
                  ) : (
                    <Image
                      src={doc}
                      alt={`Test document ${index + 1}`}
                      width={170}
                      height={120}
                      className="object-cover w-full h-[120px]"
                    />
                  )}
                  <p className="text-center text-blue-500 text-sm mt-1">
                    Click to open the file
                  </p>
                </a>

                {/* Delete icon */}
                <Image
                  src="/images/icons/delete.png"
                  alt="Delete"
                  width={24}
                  height={24}
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => handleDeleteFile(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add More button */}
      {success && (
        <Button
          onClick={addMoreUploader}
          variant="outlined"
          size="sm"
          className="mt-4 border-primary text-primary"
        >
          Add More Lab Test
        </Button>
      )}
    </div>
  );
};
