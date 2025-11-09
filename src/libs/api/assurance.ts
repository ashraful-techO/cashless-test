import { updateURLSearchParams } from "@/utils/helpers/url.helpers";
import { ParsedUrlQuery } from "querystring";
import { BaseAPI } from "./baseAPI";
import { BR } from "./interface";
import {
  IAllAppoinmentdata,
  IAuth,
  IPolicyResponse,
  SignInPayload,
  UserData,
} from "./interface/assuarace";

class AssuranceAPI extends BaseAPI {
  constructor(baseURL: string) {
    super(baseURL);
  }

  getAppoinmentData = (query: ParsedUrlQuery) => {
    let optionalParams: any = {};
    if (!query?.page) optionalParams["page"] = "1";
    const params = updateURLSearchParams(query, optionalParams);

    return this.get<BR<IAllAppoinmentdata>>(`underwritings?${params}`);
  };

  getExportData = (query: ParsedUrlQuery) => {
    let optionalParams: any = {};
    const params = updateURLSearchParams(query, optionalParams);

    return this.get(`underwritings/export?${params}`);
  };

  updateAppoinmnetList = (id: string, payload: any) => {
    return this.patch<BR<IAllAppoinmentdata>>(`underwritings/${id}`, payload);
  };

  deleteAppointment = (id: string) => {
    // No payload needed for simple delete
    return this.delete<BR<any>>(`underwritings/${id}`, {});
  };

  updateMedicalStatus = (id: string, payload: any) => {
    return this.patch<BR<IAllAppoinmentdata>>(`underwritings/${id}`, payload);
  };
  uploadDocuments = (id: string, payload: any) => {
    return this.patch<BR<IAllAppoinmentdata>>(`underwritings/${id}`, payload);
  };
  addBancassurance = (payload: any) => {
    return this.post<BR<IPolicyResponse>>(`underwritings`, payload);
  };

  addBancassuranceByCSV = (payload: any) => {
    return this.post<BR<IPolicyResponse>>(
      `underwritings/by-json-upload`,
      payload
    );
  };
  sendSms = (id: string) => {
    return this.get<BR<IAllAppoinmentdata>>(
      `underwritings/send-sms-for-appointment/${id}`
    );
  };
  getUserInfo = () => {
    return this.post<BR<UserData>>(`auth/profile`, {});
  };

  signInUser = (payload: SignInPayload) =>
    this.post<BR<IAuth>>("auth/login", payload);

  uploadImage = (payload: any) => this.image<BR<any>>(`upload/pdf`, payload);


  updateDownloadedStatus = (id: string) => {
    return this.put(`underwritings/isDownloaded/${id}`, {});
  };

}

export const assuranceAPI = new AssuranceAPI(
  process.env.METLIFE_UNDERWRITING_SERVICE as string
);
