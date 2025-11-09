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
import { FC } from "react";
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
  } = useForm<CreateUserForm>({ resolver: yupResolver(CreateUserValidation) });
  //console.log(errors);
  const { isRequiredTest, isRequiredMedical } = watch();

  const submitHandler = async (value: CreateUserForm) => {
    try {
      const { data, message, success } = await assuranceAPI.addBancassurance(
        value
      );
      if (success) {
        reset();
        updateData();
        close();
        toastSuccess({ message: "User create succefully" });
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
  return (
    <ReusableModal onOpen={open} onClose={close}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="p-6  bg-white rounded-md min-w-[800px] max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-4 ">
            <ControlerFormInput
              error={errors?.agentCode?.message}
              control={control}
              name="agentCode"
              label="Agent Code"
            />
            <ControlerFormInput
              error={errors?.agentName?.message}
              control={control}
              name="agentName"
              label="Agent Name"
            />
            <ControlerFormInput
              error={errors?.agentMobile?.message}
              control={control}
              name="agentMobile"
              label="Agent Mobile No"
            />
            <ControlerFormInput
              error={errors?.branchManagerName?.message}
              control={control}
              name="branchManagerName"
              label="Br. Manager Name"
            />
            <ControlerFormInput
              error={errors?.branchManagerMobile?.message}
              control={control}
              name="branchManagerMobile"
              label="Br. Manager Mobile"
            />
            <ControlerFormInput
              error={errors?.unitManagerName?.message}
              control={control}
              name="unitManagerName"
              label="Unit Manager Name"
            />
            <ControlerFormInput
              error={errors?.unitManagerMobile?.message}
              control={control}
              name="unitManagerMobile"
              label="Unit Manager Mobile"
            />
            <ControlerFormInput
              control={control}
              error={errors?.policyNumber?.message}
              name="policyNumber"
              label="Policy Number"
            />
            <ControlerFormInput
              control={control}
              error={errors?.policyOwnerName?.message}
              name="policyOwnerName"
              label="Policy Owner Name"
            />

            <ControlerFormInput
              control={control}
              error={errors?.mobile?.message}
              name="mobile"
              label="Mobile Number"
            />

            {/* <ControlerFormInput
              control={control}
              error={errors?.NID?.message}
              name="NID"
              label="Policy Owners Nid No."
            /> */}

            <ControlerFormSelect
              control={control}
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              label="Gender"
              name="gender"
              error={errors?.gender?.message}
            />

            <ControlerFormInput
              error={errors?.address?.message}
              control={control}
              name="address"
              label="Address"
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
              label="Applicants Type"
              name="applicantsType"
              error={errors?.applicantsType?.message}
            />

            <div className="mt-4">
              <p>Is Required Medical</p>
              <div className="flex items-center">
                <Checkbox
                  {...({} as any)}
                  checked={isRequiredMedical === true}
                  className="w-4 h-4 rounded-full"
                  // id="ripple-off"
                  label="Yes"
                  ripple={false}
                  onChange={() => setValue("isRequiredMedical", true)}
                />
                <Checkbox
                  {...({} as any)}
                  checked={isRequiredMedical === false}
                  className="w-4 h-4 rounded-full"
                  // id="ripple-off"
                  label="No"
                  ripple={false}
                  onChange={() => setValue("isRequiredMedical", false)}
                />
              </div>
              {errors?.isRequiredMedical?.message && (
                <p className="text-red-500 mt-1 ">
                  {errors?.isRequiredMedical?.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <p>Is Required Test</p>
              <div className="flex items-center">
                <Checkbox
                  {...({} as any)}
                  checked={isRequiredTest === true}
                  className="w-4 h-4 rounded-full"
                  // id="ripple-off"
                  label="Yes"
                  ripple={false}
                  onChange={() => setValue("isRequiredTest", true)}
                />

                <Checkbox
                  {...({} as any)}
                  checked={isRequiredTest === false}
                  className="w-4 h-4 rounded-full"
                  // id="ripple-off"
                  label="No"
                  ripple={false}
                  onChange={() => setValue("isRequiredTest", false)}
                />
              </div>
              {errors?.isRequiredTest?.message && (
                <p className="text-red-500 mt-1 ">
                  {errors?.isRequiredTest?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {isRequiredTest && (
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
                    value: "ECG Urine Analysis Profile",
                  },
                  { label: "DIABETES_PROFILE", value: "Diabetes Profile" },
                ]}
                label="Test Type"
                name="requiredTest"
                error={errors?.requiredTest?.message}
              />
            )}

            {isRequiredTest && (
              <ControlerFormInput
                control={control}
                name="requiredOtherTest"
                label="Other Test(if any)"
              />
            )}
          </div>

          <div className="mt-11 flex gap-4">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};
