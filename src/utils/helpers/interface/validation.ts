export interface CreateSingleUserForm {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  gender?: string;
  packageType?: string;
}
export interface CreateMultiUserForm {
  packageType: string;
  batchNumber: string;
}

export interface SignInForm {
  phone: string;
  password: string;
}

export interface CreateUserForm {
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  gender: string;
  NID?: string;
  address: string;
  applicantsType: string;
  isRequiredMedical: boolean;
  isRequiredTest: boolean;
  agentName: string;
  agentCode: string;
  unitManagerName: string;
  branchManagerName: string;
  // Add the missing fields
  agentMobile: string;
  unitManagerMobile: string;
  branchManagerMobile: string;
  requiredTest?: string;
  requiredOtherTest?: string;
}
