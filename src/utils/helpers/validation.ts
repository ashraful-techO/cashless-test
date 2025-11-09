import * as yup from "yup";

export const signInValidation = yup
  .object({
    phone: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const createSingleUserValidation = (userName?: string) =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      .min(11, "Mobile number must be 11 digits")
      .max(11, "Mobile number must be 11 digits")
      .matches(/^01[3-9]\d{8}$/, "Mobile number should contain only numbers"),
    packageType:
      userName === "GUARDIAN_LIFE_INSURANCE"
        ? yup.string().required("Package is required")
        : yup.string(),
  });

export const createMultiUserValidation = yup.object({
  packageType: yup.string().required("Package is required"),
  batchNumber: yup.string().required("Batch is required"),
});

export const upDateCIPValidation = yup.object({
  status: yup.string().required("Status is required"),
  reason: yup.string().optional(),
  partnerClaimId: yup.string().optional(),
  settlementAmount: yup.string().optional(),
});

export const CreateUserValidation = yup.object({
  agentName: yup.string().required("Agent name is required"),
  unitManagerName: yup.string().required("Unit Manager name is required"),
  branchManagerName: yup.string().required("Br. Manager name is required"),
  policyNumber: yup.string().required("Policy number is required"),
  policyOwnerName: yup.string().required("Policy owner name is required"),
  mobile: yup
    .string()
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .min(6, "Mobile number must be at least 6 digits")
    .max(11, "Mobile number cannot exceed 11 digits")
    .required("Mobile number is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  NID: yup.string().optional(),
  applicantsType: yup.string().required("Applicants type is required"),
  isRequiredMedical: yup.boolean().required("Medical test is required"),
  isRequiredTest: yup.boolean().required("Medical test is required"),
  requiredTest: yup
    .string()
    .optional()
    .when("isRequiredTest", {
      is: true,
      then: (schema) =>
        schema.required(
          "Required test is mandatory when isRequiredTest is true"
        ),
    }),
  requiredOtherTest: yup.string().optional(),
  agentCode: yup.string().required("Agent code is required"),
  agentMobile: yup.string().required("agentMobile is required"),
  unitManagerMobile: yup.string().required("unitManagerMobile is required"),
  branchManagerMobile: yup.string().required("branchManagerMobile is required"),
});
