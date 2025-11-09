// mockUserInfoWrapper.ts
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { mockUserInfo } from "./appoinmentData";


export const mockUserInfoWrapper: IAllAppoinmentdata = {
  items: mockUserInfo,
  nextPage: null,
  total: mockUserInfo.length,
  totalPages: 1,
  pageNumber: 1,
};
