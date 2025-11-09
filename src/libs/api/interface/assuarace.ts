export interface IAllAppoinmentdata {
  items: Appoinmentdata[];
  nextPage: any;
  total: number;
  totalPages: number;
  pageNumber: number;
}

export interface Appoinmentdata {
  isDownloaded: any;
  _id(_id: any): unknown;
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  NID?: string;
  gender: string;
  address: string;
  applicantsType: string;
  isRequiredMedical: boolean;
  isRequiredTest: boolean;
  requiredTest: string;
  requiredOtherTest: string;
  appointmentLink: string;
  medicalStatus: string;
  testStatus: string;
  overallStatus: string;
  paymentStatus: string;
  medicalDocument: MedicalDocument[];
  testDocument: string[];
  userPolicyDocument?: UserPolicyDocument[];
  createdAt: string;
  updatedAt: string;
  id: string;
  diagnosticInfo?: string;
  medicalAppointmentDate?: string;
  testAppointmentDate?: string;
  submissionDate?: string;
  comment?: string;
  paymentDate?: string;
  isSMSSent?: boolean;
  // bankName: string;
  agentCode: string;
  agentName: string;
  agentMobile: string;
  unitManagerName: string;
  unitManagerMobile: string;
  branchManagerName: string;
  branchManagerMobile: string;
  medicalInfo: string;
  ID: string;
  Name: string;
  Email: string;
  Mobile: string;
  Department: string;
}

export interface MedicalDocument {
  documentName: string;
  url: string;
}

export interface UserPolicyDocument {
  documentName: string;
  url: string;
}

export interface AppoinmentUpdatePayload {
  medicalAppointmentDate: string;
  testAppointmentDate: string;
  diagnosticInfo: string;
  comment: string;
}

export interface IAuth {
  accessToken: string;
  id: string;
  phone: string;
  userType: string;
}

export interface SignInPayload {
  phone: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  phone: string;
  userType: string;
}
interface AddPolicyDataDTO {
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  gender: string;
  address: string;
  applicantsType: string;
  requiredTest: string;
}

export interface IPolicyResponse {
  success: boolean;
  data: PolicyData;
  message: string | null;
}

interface PolicyData {
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  gender: string;
  address: string;
  applicantsType: string;
  requiredTest: string;
  appointmentLink: string;
  medicalStatus: string;
  testStatus: string;
  overallStatus: string;
  paymentStatus: string;
  medicalDocument: any[]; // If documents have a specific structure, replace 'any' with that type
  testDocument: any[]; // Same as above
  csAppointmentStatus: string;
  isSMSSent: boolean;
  smsCount: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  medicalInfo: string;
}
