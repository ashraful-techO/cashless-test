import { ParsedUrlQuery } from "querystring";

export const updateURLSearchParams = (query: ParsedUrlQuery, newQuery?: Record<string, string>): URLSearchParams => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (Array.isArray(value)) {
			value.map((e) => params.append(key, e));
		} else {
			params.set(key, value as string);
		}
	}
	if (newQuery) {
		for (const [key, value] of Object.entries(newQuery)) {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		}
	}

	return params;
};
