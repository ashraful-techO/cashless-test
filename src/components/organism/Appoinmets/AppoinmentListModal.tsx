import { FormInput, MultipleFormInput } from "@/components/atomic";
import { ReusableModal } from "@/components/molecules";
import { CustomDatePicker } from "@/components/molecules/CustomDatePicker";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formattedDate, getLocalDate } from "@/utils/helpers/format.helpers";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button } from "@material-tailwind/react";
import { FC, useState } from "react";

interface PropsType {
  selectdata: Appoinmentdata;
  close: () => void;
  updateData: () => Promise<void>;
}
export const AppoinmentListModal: FC<PropsType> = ({
  selectdata,
  close,
  updateData,
}) => {
  const [loading, setIsLoading] = useState(false);
  const [medicalSchedule, setMedicalSchedule] = useState<Date>(() =>
    getLocalDate(selectdata?.medicalAppointmentDate)
  );
  const [testSchedule, setTestSchedule] = useState<Date>(() =>
    getLocalDate(selectdata?.testAppointmentDate)
  );

  const [text, setText] = useState({
    diagnosticInfo: `${selectdata?.diagnosticInfo || ""}`,
    comments: `${selectdata?.comment || ""}`,
  });

  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateAppoinmetData = async () => {
    // const payload = {
    //   medicalAppointmentDate: formattedDate(medicalSchedule),
    //   testAppointmentDate: formattedDate(testSchedule),
    //   diagnosticInfo: text?.diagnosticInfo,
    //   comment: text?.comments,
    // };

    const payload = {
      diagnosticInfo: text?.diagnosticInfo,
      comment: text?.comments,
      ...(selectdata?.isRequiredMedical && medicalSchedule
        ? { medicalAppointmentDate: formattedDate(medicalSchedule) }
        : {}),
      ...(selectdata?.isRequiredTest && testSchedule
        ? { testAppointmentDate: formattedDate(testSchedule) }
        : {}),
    };

    setIsLoading(true);
    try {
      const { success, data, message } =
        await assuranceAPI.updateAppoinmnetList(selectdata?.id, payload);
      if (success) {
        setUpdateSuccess(true);
        updateData();
        toastSuccess({ message: "Information updated successfully" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendSmsUser = async () => {
    setIsLoading(true);
    try {
      const { success, data, message } = await assuranceAPI.sendSms(
        selectdata?.id
      );
      if (success) {
        close();
        updateData();
        toastSuccess({ message: "SMS send successfully" });
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
        <div className="grid grid-cols-2 gap-4 ">
          <FormInput
            disabled
            label="Policy Number"
            value={selectdata?.policyNumber}
          />

          <FormInput
            disabled
            label="Mobile Number"
            value={selectdata?.mobile}
          />

          <FormInput
            disabled
            label="Name"
            value={selectdata?.policyOwnerName}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput disabled label="Gender" value={selectdata?.gender} />
            <FormInput
              disabled
              label="Applicant's Medical"
              value={selectdata?.applicantsType}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <FormInput
            disabled
            label="Medical Info"
            value={selectdata?.medicalInfo}
          />
          <FormInput disabled label="Address" value={selectdata?.address} />
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <FormInput
            disabled
            label="Required Lab Test"
            value={selectdata?.requiredTest}
          />
          <FormInput
            disabled
            label="Required Other Test"
            value={selectdata?.requiredOtherTest}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          {selectdata?.isRequiredMedical && (
            <>
              <CustomDatePicker
                label="Medical Schedule Date"
                placeholder="Select a date"
                startDate={medicalSchedule}
                setStartDate={setMedicalSchedule as any}
              />

              <FormInput
                disabled
                label="Medical Status"
                value={selectdata?.medicalStatus}
              />
            </>
          )}

          {selectdata?.isRequiredTest && (
            <>
              <CustomDatePicker
                label="Lab Test Schedule Date"
                placeholder="Select a date"
                startDate={testSchedule}
                setStartDate={setTestSchedule as any}
              />
              <FormInput
                disabled
                label="Lab Test Status"
                value={selectdata?.testStatus}
              />
            </>
          )}

          <MultipleFormInput
            label="Diagnostic Center Info"
            name="diagnosticInfo"
            onChange={handleChange}
            value={text?.diagnosticInfo}
          />

          <MultipleFormInput
            label="Comments"
            name="comments"
            onChange={handleChange}
            value={text?.comments}
          />
        </div>

        <div className="mt-11 flex gap-4">
          <Button
            className="bg-primary"
            onClick={updateAppoinmetData}
            disabled={updateSuccess}
          >
            Submit
          </Button>
          {updateSuccess && <Button onClick={sendSmsUser}>Send SMS</Button>}
        </div>
      </div>
    </ReusableModal>
  );
};
