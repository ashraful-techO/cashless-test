import { FormInput } from "@/components/atomic";
import {
  ControlerFormInput,
  ControlerFormSelect,
  ControlerMultiLineForm,
  ReusableModal,
} from "@/components/molecules";
import { CustomDatePicker } from "@/components/molecules/CustomDatePicker";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { getLocalDate } from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { assuranceAPI } from "@/libs/api";
import { toastError, toastSuccess } from "@/utils/helpers/toast.helpers";
import { DeleteConfirmationModal } from "@/components/molecules/DeleteConfirmationModal";

interface PropsType {
  selectdata: Appoinmentdata;
  close: () => void;
  updateData: () => Promise<void>;
}

export const UserModal: FC<PropsType> = ({ selectdata, close, updateData }) => {
  const [loading, setIsLoading] = useState(false);
  const [deleting, setIsDeleting] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openDeleteModal = () => setModalOpen(true);
  const closeDeleteModal = () => setModalOpen(false);

  const [medicalSchedule, setMedicalSchedule] = useState<Date | null>(() =>
    selectdata?.medicalAppointmentDate
      ? getLocalDate(selectdata.medicalAppointmentDate)
      : null
  );

  const [testSchedule, setTestSchedule] = useState<Date | null>(() =>
    selectdata?.testAppointmentDate
      ? getLocalDate(selectdata.testAppointmentDate)
      : null
  );

  const [document, setDocument] = useState<any[]>(
    selectdata?.medicalDocument || []
  );

  const { handleSubmit, control, setValue } = useForm<Appoinmentdata>({
    defaultValues: selectdata || {},
  });

  // Disable form if CSteam already scheduled
  const isLabTestTaken = !!selectdata?.testAppointmentDate;
  const isMedicalTestTaken = !!selectdata?.medicalAppointmentDate;
  const isFormLocked = isLabTestTaken || isMedicalTestTaken;

  // Sync documents with form
  useEffect(() => {
    setValue("medicalDocument", document);
  }, [document, setValue]);

  const deleteHandler = async () => {
    if (!selectdata?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const { success } = await assuranceAPI.deleteAppointment(selectdata.id);

      if (success) {
        toastSuccess({ message: "Record deleted successfully" });
        await updateData(); // refresh table/list
        close(); // close modal
      } else {
        toastError({ message: "Failed to delete record" });
      }
    } catch (error) {
      console.error(error);
      toastError({ message: "An unexpected error occurred while deleting" });
    } finally {
      setIsDeleting(false);
    }
  };

  const submitHandler = async (value: Appoinmentdata) => {
    const payload = {
      ...value,
      medicalDocument: document,
    };

    setIsLoading(true);
    try {
      const { success } = await assuranceAPI.updateAppoinmnetList(
        selectdata?.id,
        payload
      );
      if (success) {
        toastSuccess({ message: "Information updated successfully" });
        updateData();
        close();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Populate form when selectdata changes
  useEffect(() => {
    if (selectdata) {
      Object.entries(selectdata).forEach(([key, value]) => {
        setValue(key as keyof Appoinmentdata, value);
      });
      setMedicalSchedule(
        selectdata.medicalAppointmentDate
          ? getLocalDate(selectdata.medicalAppointmentDate)
          : null
      );
      setTestSchedule(
        selectdata.testAppointmentDate
          ? getLocalDate(selectdata.testAppointmentDate)
          : null
      );
      setDocument(selectdata.medicalDocument || []);
    }
  }, [selectdata]);

  return (
    <ReusableModal onOpen={!!selectdata} onClose={close}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="p-4 bg-white z-100 rounded-md min-w-[200px] max-h-[450px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-2">
            <ControlerFormInput
              control={control}
              name="employeeId"
              label="employeeId"
              disabled={isFormLocked}
            />
            <ControlerFormInput
              control={control}
              name="employeeName"
              label="Employee Name"
              disabled={isFormLocked}
            />
            <ControlerFormInput
              control={control}
              name="mobile"
              label="Mobile Number"
              disabled={isFormLocked}
            />

            <ControlerFormInput
              control={control}
              label="email"
              name="Email"
              disabled={isFormLocked}
            />
            <ControlerFormInput
              control={control}
              label="Department"
              name="employeeDepartment"
              disabled={isFormLocked}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-2"></div>

          <div className="mt-11 flex gap-4 justify-between">
            {/* Delete Button */}
            {/* <Button
              color="red"
              onClick={openDeleteModal}
              disabled={isFormLocked || deleting}
            >
              Delete
            </Button> */}

            {/* <DeleteConfirmationModal
              open={modalOpen}
              close={closeDeleteModal}
              selectData={selectdata}
              updateData={updateData}
              parentClose={close} // this is the UserModal close
            /> */}

            {/* Update Button */}
            {/* <Button
              color="blue"
              type="submit"
              disabled={isFormLocked || loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button> */}
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};
