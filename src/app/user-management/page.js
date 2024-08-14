import { fetchUsersAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUser from "@/components/user";
import React from "react";

const UserManagement = async () => {
  const getAllUsersList = await fetchUsersAction();
  return (
    <div className="p-20 max-w-8xl">
      <div className="flex items-center justify-between">
        <h1>user management</h1>
        <AddNewUser />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {getAllUsersList &&
        getAllUsersList.data &&
        getAllUsersList.data.length > 0 ? (
          getAllUsersList.data.map((eachUser) => (
            <SingleUser key={eachUser.firstName} user={eachUser} />
          ))
        ) : (
          <h3>No users Found! Add New User</h3>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
