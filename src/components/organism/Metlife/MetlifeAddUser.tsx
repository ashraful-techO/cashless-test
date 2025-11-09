"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

import { CreateSingleUser } from "./index";
import { BulkUserUploadModal } from "./BulkUserUploadModal";

export const MetlifeAddUser = () => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [bulkUserModal, setBulkUserModal] = useState(false);

  return (
    <>
      <Menu placement="bottom">
        <MenuHandler>
          <Button className="bg-primary text-white shadow-none text-[12px] mt-5 hover:shadow-none py-2 px-2 whitespace-nowrap no-overflow">
            Add User
          </Button>
        </MenuHandler>
        <MenuList className="p-2 min-w-[120px]">
          <MenuItem onClick={() => setCreateUserModal(true)}>
            Single Upload
          </MenuItem>
          <MenuItem onClick={() => setBulkUserModal(true)}>
            Bulk Upload
          </MenuItem>
        </MenuList>
      </Menu>

      {createUserModal && (
        <CreateSingleUser
          open={createUserModal}
          close={() => setCreateUserModal(false)}
          updateData={async () => {}}
        />
      )}

      {bulkUserModal && (
        <BulkUserUploadModal
          open={bulkUserModal}
          close={() => setBulkUserModal(false)}
          updateData={async () => {}}
        />
      )}
    </>
  );
};
