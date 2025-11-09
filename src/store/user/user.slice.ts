import { IUserData } from "@/libs/api/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IInitialState = {
	userData: null,
	isLoading: true,
};
const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		updateUserData: (state, action: PayloadAction<IUserData>) => {
			state.userData = action.payload;
		},
	},
});

export default slice.reducer;

export const { updateUserLoading, updateUserData } = slice.actions;

export const getUserState = (state: any) => state.user;

interface IInitialState {
	isLoading: boolean;
	userData: IUserData | null;
}
