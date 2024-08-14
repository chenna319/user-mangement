"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction, updateUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

const SingleUser = ({ user }) => {
  const { setShowPopup, setAddNewuserFormData, setEditebleId } =
    useContext(UserContext);
  const handleDeleteAction = async (currentId) => {
    const deleteUser = await deleteUserAction(currentId, "/user-management");
    console.log(deleteUser);
  };
  const handleEdit = async (currentUser) => {
    setShowPopup(true);
    setAddNewuserFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      address: currentUser.address,
    });
    setEditebleId(currentUser._id);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user?.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEdit(user)}>Edit</Button>
        <Button onClick={() => handleDeleteAction(user._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleUser;
