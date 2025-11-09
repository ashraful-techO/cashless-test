export interface IUserCount {
	numberOfUsers: number;
	activeUsers: number;
	totalCallByClientId: number;
	InActiveUsers: number;
}
export interface IUserData {
	_id: string;
	logo: any;
	companyName: string;
	poc: string;
	contactNumber: string;
	contactNumberAlt: string;
	email: any;
	activatorId: string;
	activatorName: string;
	comment: any;
	createdBy: string;
	createdAt: string;
	__v: number;
	zid: string;
	corporateClientType?: string;
}

export interface ITotalUser {
	data: UserDataDetails[];
	total: number;
	totalPages: number;
	nextPage: number;
	pageNumber: number;
}
export interface UserDataDetails {
	subscriptionId: string;
	firstName: string;
	lastName?: string;
	mobileNumber: string;
	subscriptionTime: string;
	activated: boolean;
	gender?: string;
	expiredDate: string;
	packageType?: string;
}
export interface ICreateSubscriptionData {
	successfull: User[];
	failed: User[];
}

export interface CreateSUbscriptionPayload {
	clientId: string;
	users: User[];
	packageType: string;
	expiredDate?: string;
}

export interface User {
	firstName: string;
	lastName: string;
	mobileNumber: string;
	gender: string;
	policyId: string;
}
