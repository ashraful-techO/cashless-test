import { FC, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ReusableModal } from "./ReusableModal";
import { assuranceAPI } from "@/libs/api";
import { toastError, toastSuccess } from "@/utils/helpers/toast.helpers";



interface PropsType {
  open: boolean;
  close: () => void;       // closes DeleteConfirmationModal
  selectData?: { id?: string };
  updateData: () => Promise<void>;
  parentClose?: () => void; // closes UserModal
}


export const DeleteConfirmationModal: FC<PropsType> = ({
  open,
  close,
  selectData,
  updateData,
  parentClose
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = async () => {
    if (!selectData?.id) return;
    setIsDeleting(true);

    try {
      const { success } = await assuranceAPI.deleteAppointment(selectData.id);

      if (success) {
        toastSuccess({ message: "Record deleted successfully" });
        await updateData();
        close(); // closes the DeleteConfirmationModal

        // ✅ also close the parent UserModal
        if (typeof parentClose === "function") parentClose();
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


  return (
    <ReusableModal onOpen={open} onClose={close}>
      <div className="p-6 bg-white w-[320px] rounded-md">
        <Typography variant="h5" className="text-center text-red-600">
          Are you sure you want to delete this record?
        </Typography>

        <div className="flex justify-center mt-5 gap-4">

          <Button
            color="red"
            onClick={deleteHandler}
            className="px-6 py-2 rounded-md"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button
            color="gray"
            onClick={close}
            className="px-6 py-2 rounded-md"
            disabled={isDeleting}
          >
            No
          </Button>


        </div>
      </div>
    </ReusableModal>
  );
};
