import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import Icon, { moreIcon } from "@/libs/Icons";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FC } from "react";

interface PropsType {
	data: Appoinmentdata;
	updateData: () => Promise<void>;
}
// export const MenuItems: FC<PropsType> = ({ data, updateData }) => {
// 	const handleCompleted = async (id: any) => {
// 		const payload = {
// 			medicalStatus: "COMPLETED",
// 		};

// 		try {
// 			const { success, data, message } = await assuranceAPI.updateDeliveryStatus(id, payload);
// 			if (success) {
// 				updateData();
// 				toastSuccess({ message: "Completed successfully" });
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// 	return (
// 		<>
// 			{/* {data?.medicalDocument?.length > 0 && (
// 				<Menu placement="left">
// 					<MenuHandler>
// 						<Button className="bg-transparent shadow-none hover:shadow-none ml-[-20px] py-0">
// 							<Icon path={moreIcon} />
// 						</Button>
// 					</MenuHandler>
// 					<MenuList className="p-1 ">
// 						<MenuItem className="hover:bg-transparent" onClick={() => handleCompleted(data?.id)}>
// 							Completed
// 						</MenuItem>
// 					</MenuList>
// 				</Menu>
// 			)} */}
// 		</>
// 	);
// };
