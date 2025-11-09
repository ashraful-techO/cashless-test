import { useEffect, useRef, useState } from "react";

interface DebounceHookReturnType {
	value: string | null;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	cancel: () => void;
	setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useDebounce = (time: number): DebounceHookReturnType => {
	const [_value, setValue] = useState<string | null>(null);
	const mountedRef = useRef<boolean>(false);
	const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const cancel = () => {
		if (timeRef.current !== null) clearTimeout(timeRef.current);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		cancel();

		timeRef.current = setTimeout(() => {
			if (mountedRef.current) {
				setValue(value);
			}
		}, time);
	};

	return { value: _value, cancel, handleChange, setValue };
};
