import { pathWithRole } from "../constants/user.role";

export const isHaveAccess = (role: string, path: string) => {
	return pathWithRole[role]?.includes(path);
};

export const getAccessiblePaths = (role: string): string[] | undefined => {
	return pathWithRole[role];
};
