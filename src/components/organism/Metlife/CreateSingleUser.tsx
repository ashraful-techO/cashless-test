import {
  ControlerFormInput,
  ControlerFormSelect,
  ReusableModal,
} from "@/components/molecules";
import { assuranceAPI } from "@/libs/api";
import { CreateUserForm } from "@/utils/helpers/interface/validation";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { CreateUserValidation } from "@/utils/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox } from "@material-tailwind/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface PropsType {
  open: boolean;
  close: () => void;
  updateData: () => Promise<void>;
}

export const CreateSingleUser: FC<PropsType> = ({
  open,
  close,
  updateData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm<CreateUserForm>({
    resolver: yupResolver(CreateUserValidation),
    defaultValues: {
      isRequiredMedical: false,
      isRequiredTest: false,
    },
  });

  const { isRequiredTest, isRequiredMedical } = watch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (value: CreateUserForm) => {
    setIsSubmitting(true); // disable submit button immediately
    console.log(value);
    try {
      console.log("Submitting:", value);

      const { data, message, success } = await assuranceAPI.addBancassurance(
        value
      );

      if (success) {
        toastSuccess({ message: "User created successfully" });

        // Reset the form completely
        reset({
          isRequiredMedical: false,
          isRequiredTest: false,
        });

        // Refresh table data
        await updateData();

        // Close the modal
        close();
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false); // re-enable submit button
    }
  };

  return (
    <ReusableModal onOpen={open} onClose={close}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="relative p-6 bg-white rounded-md min-w-[800px] max-w-[500px] max-h-[600px] overflow-y-auto">
          {/*  Close Button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>

          <div className="grid grid-cols-2 gap-x-4">
            <ControlerFormInput
              control={control}
              error={errors?.policyNumber?.message}
              name="policyNumber"
              label="ID"
            />
            <ControlerFormInput
              control={control}
              error={errors?.policyOwnerName?.message}
              name="policyOwnerName"
              label="Employee Name"
            />
            <ControlerFormInput
              control={control}
              error={errors?.mobile?.message}
              name="mobile"
              label="Mobile Number"
            />
            <ControlerFormInput
              control={control}
              error={errors?.NID?.message}
              name="mobile"
              label="Email Address"
            />
            
            <ControlerFormInput
              error={errors?.address?.message}
              control={control}
              name="address"
              label="Deptartment"
            />
            
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};
