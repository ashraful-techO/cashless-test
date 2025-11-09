import { Button, Typography } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { ReusableModal } from "./ReusableModal";
interface PropsType {
	open: boolean;
	close: () => void;
}
export const ConfirmationModal: FC<PropsType> = ({ open, close }) => {
	return (
		<ReusableModal onOpen={open} onClose={close}>
			<div className="p-6 bg-white w-[300px] rounded-md">
				<Typography variant="h5" className="text-center text-secondary">
					Are your sure, you want to logout!
				</Typography>

				<div className="flex flex-col items-center mt-3 w-full">
					<div className="flex gap-4">
						<Button className="px-8 py-2 w-full rounded" fullWidth color="gray" onClick={close}>
							No
						</Button>
						<Button className="px-8 py-2 w-full rounded" fullWidth color="red" onClick={() => signOut()}>
							Yes
						</Button>
					</div>
				</div>
			</div>
		</ReusableModal>
	);
};
