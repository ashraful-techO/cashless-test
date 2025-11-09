/* eslint-disable no-empty */

import { assuranceAPI } from "@/libs/api";
import { Dispatch } from "redux";
import { updateUserData, updateUserLoading } from "./user.slice";

export const getUserProfile = async (dispatch: Dispatch): Promise<void> => {
	dispatch(updateUserLoading(true));
	try {
		const { success, data, message } = await assuranceAPI.getUserInfo();

		if (success) dispatch(updateUserData(data as any));
	} catch (err) {
		console.log(err);
	} finally {
		dispatch(updateUserLoading(false));
	}
};
