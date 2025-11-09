import { FileUploaderDnd, ReusableModal } from "@/components/molecules";
import { SingleFileName } from "@/components/molecules/SignleFileName";
import { assuranceAPI } from "@/libs/api";
import { downloadMultipleUserDemoCSV } from "@/utils/downloadMultipleUserDemoCSV";
import csvToArray from "@/utils/helpers/csvToArray";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button } from "@material-tailwind/react";
import { FC, useState } from "react";

interface PropsType {
  open: boolean;
  close: () => void;
  updateData: () => Promise<void>;
}

export const BulkUserUploadModal: FC<PropsType> = ({
  open,
  close,
  updateData,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!file) return;

    setIsSubmitting(true);
    try {
      const reader = new FileReader();

      reader.onload = async (element) => {
        const text = element?.target?.result;

        const { success, data: value } = await csvToArray(text as string);

        if (success) {
          const { success } = await assuranceAPI.addBancassuranceByCSV(value);

          if (success) {
            await updateData();
            setFile(null);
            close();
            toastSuccess({ message: "Bulk upload successfully" });
          }
        }
        setIsSubmitting(false);
      };

      reader.readAsText(file as File);
    } catch (error) {
      console.error("Error during upload:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <ReusableModal onOpen={open} onClose={close}>
      <div className="bg-white rounded-md p-6 w-[500px] relative">
        {/* X Button */}
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
          onClick={close}
        >
          ×
        </button>

        <p className="flex justify-between font-medium mb-2">
          Import Multiple Users
          <span
            className="text-primary cursor-pointer"
            onClick={downloadMultipleUserDemoCSV}
          >
            Download a demo CSV file
          </span>
        </p>

        {!file && (
          <FileUploaderDnd
            getFileHandler={setFile}
            supportFormat="CSV"
            fileFormat={["text/csv"]}
          />
        )}

        {!!file && (
          <>
            <SingleFileName data={file} />

            <div className="flex justify-end mt-2">
              <Button
                variant="outlined"
                size="sm"
                color="red"
                className="rounded-md text-[10px] py-1 px-2 inline-block normal-case"
                onClick={() => setFile(null)}
              >
                Remove CSV
              </Button>
            </div>
          </>
        )}

        <div className="flex justify-end mt-4">
          <Button
            variant="filled"
            onClick={handleSubmit}
            disabled={isSubmitting || !file}
            className="rounded-md bg-secondary"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </ReusableModal>
  );
};
