export const getFileSizeInMB = (size: number): string => {
	return (size / (1024 * 1024)).toFixed(2) + " MB";
};
