import { updateURLSearchParams } from "@/utils/helpers/url.helpers";
import { ParsedUrlQuery } from "querystring";
import { BaseAPI } from "./baseAPI";
import { BR } from "./interface";
import {
  IAllAppoinmentdata,
  IAuth,
  IResponse,
  SignInPayload,
  UserData,
} from "./interface/assuarace";

class AssuranceAPI extends BaseAPI {
  constructor(baseURL: string) {
    super(baseURL);
  }

  /** Fetch paginated appointment list */
  // getAppointmentList = (query: ParsedUrlQuery) => {
  //   const optionalParams: Record<string, string> = {};
  //   if (!query?.page) optionalParams["page"] = "1";

  //   const params = updateURLSearchParams(query, optionalParams);
  //   return this.get<BR<IAllAppoinmentdata>>(`appointments?${params}`);
  // };

  /** Fetch all appointments */
  getAllAppointments = () => {
    return this.get<BR<IAllAppoinmentdata>>(`appointments/`);
  };

  /** Fetch single appointment by employeeId */
  getAppointmentById = (employeeId: string) => {
    if (!employeeId) throw new Error("employeeId is required");
    return this.get<BR<IAllAppoinmentdata>>(
      `appointments/employee/${employeeId}`
    );
  };

  /** Fetch all appointments by employee ID */
  getAppointmentDetailsById = (employeeId: string) => {
    if (!employeeId) throw new Error("employeeId is required");
    return this.get<BR<IAllAppoinmentdata>>(`appointments/${employeeId}`);
  };

  /** Update an appointment by ID */
  // updateAppointment = (id: string, payload: any) => {
  //   return this.patch<BR<IAllAppoinmentdata>>(`appointments/${id}`, payload);
  // };

  /** Delete an appointment by ID */
  deleteAppointment = (id: string) => {
    return this.delete<BR<any>>(`appointments/${id}`, {});
  };

  /** Update medical status */
  // updateMedicalStatus = (id: string, payload: any) => {
  //   return this.patch<BR<IAllAppoinmentdata>>(`appointments/${id}`, payload);
  // };

  /** Upload documents */
  // uploadDocuments = (id: string, payload: any) => {
  //   return this.patch<BR<IAllAppoinmentdata>>(`appointments/${id}`, payload);
  // };

  /** Add to appoinments */
  addAppoinments = (payload: any) => {
    return this.post<BR<IResponse>>(`appointments`, payload);
  };

  /** Add Bancassurance by CSV / JSON upload */
  // addBancassuranceByCSV = (payload: any) => {
  //   return this.post<BR<IPolicyResponse>>(
  //     `appointments/by-json-upload`,
  //     payload
  //   );
  // };

  /** Send SMS for appointment */
  // sendSms = (id: string) => {
  //   return this.get<BR<IAllAppoinmentdata>>(
  //     `appointments/send-sms-for-appointment/${id}`
  //   );
  // };

  /** Get authenticated user info */
  getUserInfo = () => {
    return this.post<BR<UserData>>(`auth/profile`, {});
  };

  /** Sign in user */
  signInUser = (payload: SignInPayload) =>
    this.post<BR<IAuth>>("auth/login", payload);

  /** Upload image/pdf */
  // uploadImage = (payload: any) => this.image<BR<any>>(`upload/pdf`, payload);

  /** Update downloaded status */
  // updateDownloadedStatus = (id: string) => {
  //   return this.put(`appointments/isDownloaded/${id}`, {});
  // };
}

// Export singleton instance
export const assuranceAPI = new AssuranceAPI(
  process.env.METLIFE_CASHLESS_SERVICE as string
);
