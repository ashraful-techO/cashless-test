"use client";
import { ConfirmationModal } from "@/components/molecules";
import { getUserState } from "@/store/actions";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
export const UserInfo = () => {
  const [logOutConfirmation, setLogoutConfirmation] = useState<boolean>(false);

  const { userData } = useSelector(getUserState);

  // console.log("User Data in UserInfo:", userData?.name);

  return (
    <div>
      <Menu placement="bottom-end">
        <MenuHandler>
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <p className="text-secondary/100 text-[14px]">
                {userData?.userType}
              </p>
              <p className="text-secondary/100 text-[14px]">
                <span className="text-[12px]">{userData?.name}</span>
              </p>
            </div>
            <Avatar
              src="./images/avatar.jpg"
              size="sm"
              className="cursor-pointer"
            />
          </div>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setLogoutConfirmation(true)}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
      {logOutConfirmation && (
        <ConfirmationModal
          open={logOutConfirmation}
          close={() => setLogoutConfirmation(false)}
        />
      )}
    </div>
  );
};
