export interface IAllAppoinmentdata {
  totalCount: any;
  appointments: never[];
  name: string;
  phone: string;
  email: string;
  department: string;
  complaints: any;
  medicines: any;
  data: Appoinmentdata[];
  nextPage: any;
  total: number;
  totalPages: number;
  pageNumber: number;
  success: boolean;
  message: string | null;
  items: Appoinmentdata[];
}

export interface Medicine {
  name: string;
  dosage: string;
  quantity: string;
  instructions: string;
}

export interface Appoinmentdata {
  status?: string;
  employeeDepartment: string;
  employeeName: string;
  id: string;
  employeeId: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  doctorName: string;
  complaints: string[];
  medicines: Medicine[];
  createdAt: string;
  updatedAt: string;
}


export interface MedicalDocument {
  documentName: string;
  url: string;
}


export interface AppoinmentUpdatePayload {
 
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

export interface IResponse {
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
