import { FormInput } from "@/components/atomic";
import {
  ControlerFormInput,
  ControlerFormSelect,
  ControlerMultiLineForm,
  ReusableModal,
} from "@/components/molecules";
import { CustomDatePicker } from "@/components/molecules/CustomDatePicker";
import { FileUpload } from "@/components/molecules/FileUpload";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import {
  formatAddUnderscores,
  getLocalDate,
} from "@/utils/helpers/format.helpers";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TestDocumentUpload } from "./TestDocumentUpload";

interface PropsType {
  selectdata: Appoinmentdata;
  close: () => void;
  updateData: () => Promise<void>;
}
export const UserModal: FC<PropsType> = ({ selectdata, close, updateData }) => {
  // console.log({ selectdata });
  const [loading, setIsLoading] = useState(false);
  const [medicalSchedule, setMedicalSchedule] = useState<Date>(() =>
    getLocalDate(selectdata?.medicalAppointmentDate)
  );
  const [testSchedule, setTestSchedule] = useState<Date>(() =>
    getLocalDate(selectdata?.testAppointmentDate)
  );

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

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Appoinmentdata>();

  const { testDocument } = watch();

  const submitHandler = async (value: Appoinmentdata) => {
    setIsLoading(true);
    try {
      const { success, data, message } =
        await assuranceAPI.updateAppoinmnetList(selectdata?.id, { ...value });
      if (success) {
        close();
        updateData();
        toastSuccess({ message: "Information updated successfully" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectdata) {
      Object.entries(selectdata || {}).forEach(([key, value]) => {
        setValue(key as keyof Appoinmentdata, value);
      });
    }
  }, [selectdata]);

  // useEffect(() => {
  // 	if (testDocument) {
  // 		setValue("testDocument", selectdata?.testDocument);
  // 	}
  // }, [testDocument]);

  useEffect(() => {
    if (document) {
      setValue("medicalDocument", [
        {
          documentName: "Medical Report",
          url: document?.medicalDoc,
        },
        {
          documentName: "User Policy Screen Shot",
          url: document?.policyDoc,
        },
      ]);
    }
  }, [document]);

  return (
    <ReusableModal onOpen={!!selectdata} onClose={close}>
      <form action="" onSubmit={handleSubmit(submitHandler)}>
        <div className="p-6  bg-white rounded-md min-w-[800px] max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-4 ">
            <ControlerFormInput
              control={control}
              name="policyNumber"
              label="Policy Number"
            />

            <ControlerFormInput
              control={control}
              name="mobile"
              label="Mobile Number"
            />

            <ControlerFormInput
              control={control}
              name="policyOwnerName"
              label="Name"
            />

            <div className="grid grid-cols-2 gap-x-4">
              <ControlerFormInput
                control={control}
                name="gender"
                label="Gender"
              />
              <ControlerFormSelect
                control={control}
                items={[
                  {
                    label: "Juvenile Medical (Child)",
                    value: "Juvenile Medical (Child)",
                  },
                  { label: "Adult Medical", value: "Adult Medical" },
                  {
                    label: "Juvenile Medical (Both)",
                    value: "Juvenile Medical (Both)",
                  },
                ]}
                label="Medical Type"
                name="applicantsType"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <FormInput label="medical info" value={selectdata?.medicalInfo} />
            <FormInput label="Address" value={selectdata?.address} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 ">
            <ControlerFormSelect
              control={control}
              items={[
                { label: "N/A", value: "N/A" },
                {
                  label: "BLOOD_PROFILE_UP_TO_1_CRORE",
                  value: "Blood Profile up to 1 crore",
                },
                {
                  label: "BLOOD_PROFILE_ABOVE_1_CRORE",
                  value: "Blood Profile above 1 crore",
                },
                {
                  label: "ECG_Urine Analysis Profile",
                  value: "ECG Urine Analysis Profile",
                },
                { label: "DIABETES_PROFILE", value: "Diabetes Profile" },
                { label: "ETT", value: "ETT" },
              ]}
              label="Test Type"
              name="requiredTest"
            />

            <ControlerFormInput
              control={control}
              name="requiredOtherTest"
              label="Required Other Test"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 ">
            {selectdata?.requiredTest && (
              <>
                <CustomDatePicker
                  label="Lab Test Schedule Date"
                  placeholder="Select a date"
                  startDate={testSchedule}
                  setStartDate={setTestSchedule as any}
                />
                <FormInput
                  disabled
                  name="testStatus"
                  label="Lab Test Status"
                  value={selectdata?.testStatus}
                />
              </>
            )}

            <CustomDatePicker
              label="Medical Schedule Date"
              placeholder="Select a date"
              startDate={medicalSchedule}
              setStartDate={setMedicalSchedule as any}
            />

            <FormInput
              disabled
              name="medicalStatus"
              label="Medical Status"
              value={selectdata?.medicalStatus}
            />

            <div className="mt-5">
              <ControlerMultiLineForm
                control={control}
                label="Diagnostic Center Info"
                name="diagnosticInfo"
              />
            </div>

            <div className="mt-5">
              <ControlerMultiLineForm
                control={control}
                label="Comments"
                name="comment"
              />
            </div>
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

          <TestDocumentUpload testDocument={testDocument} setValue={setValue} />

          <div className="mt-11 flex gap-4 justify-end">
            <Button type="submit">{loading ? "Updating..." : "Update"}</Button>
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};
