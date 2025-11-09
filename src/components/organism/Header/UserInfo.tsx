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

  return (
    <div>
      <Menu placement="bottom-end">
        <MenuHandler>
          <div className="flex items-center">
            <p className="text-secondary/100">
              <span className="text-[12px]">{userData?.userType}</span>
            </p>
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
