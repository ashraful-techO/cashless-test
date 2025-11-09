import { FormInput } from "@/components/atomic";
import { ReusableModal } from "@/components/molecules";
import { FileUpload } from "@/components/molecules/FileUpload";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formatAddUnderscores } from "@/utils/helpers/format.helpers";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button } from "@material-tailwind/react";
import dateformat from "dateformat";
import { FC, useState } from "react";



interface PropsType {
  selectdata: Appoinmentdata;
  close: () => void;
  updateData: () => Promise<void>;
}
export const MedicalAssessmentModal: FC<PropsType> = ({
  selectdata,
  close,
  updateData,
}) => {
  const [document, setDocument] = useState({
    policyDoc:
      selectdata?.medicalDocument?.find(
        (el) =>
          formatAddUnderscores(el?.documentName) === "USER_POLICY_SCREEN_SHOT"
      )?.url || "",
    medicalDoc:
      selectdata?.medicalDocument?.find(
        (el) => formatAddUnderscores(el?.documentName) === "MEDICAL_REPORT"
      )?.url || "",
  });

  console.log(document?.medicalDoc);
  console.log(document?.policyDoc);

  const [loading, setIsLoading] = useState(false);

  const hanldeSubmit = async () => {
    const payload = {
      medicalDocument: [
        { documentName: "Medical Report", url: document?.medicalDoc },
        { documentName: "User Policy Screen Shot", url: document?.policyDoc },
      ],
    };

    setIsLoading(true);
    try {
      const { success, data, message } = await assuranceAPI.uploadDocuments(
        selectdata?.id,
        payload
      );
      if (success) {
        close();
        updateData();
        toastSuccess({ message: "Document upload successfully" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReusableModal onOpen={!!selectdata} onClose={close}>
      <div className="p-6  bg-white rounded-md min-w-[800px] max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-x-4 ">
          <FormInput disabled label="Id" value={selectdata?.ID} />

          <FormInput
            disabled
            label="Mobile Number"
            value={selectdata?.Mobile}
          />

          <FormInput disabled label="Name" value={selectdata?.Name} />
          <FormInput disabled label="Email" value={selectdata?.Email} />
          <FormInput disabled label="Department" value={selectdata?.Department} />
        </div>


        <div className="grid grid-cols-2 gap-x-4">
          <FileUpload
            label="User Policy Screenshot Upload"
            imageURL={document?.policyDoc}
            setValue={(url: string) =>
              setDocument((prev: any) => ({
                ...prev,
                policyDoc: url,
              }))
            }
          />

          <FileUpload
            label="Medical Assessment Scan Copy"
            imageURL={document.medicalDoc}
            setValue={(url: string) =>
              setDocument((prev: any) => ({
                ...prev,
                medicalDoc: url,
              }))
            }
          />
        </div>

        {/* <DocumentsUpload document={document} setDocument={setDocument} /> */}

        <div className="flex justify-end">
          <Button className="bg-primary mt-5" onClick={hanldeSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </ReusableModal>
  );
};
