"use client";

import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialFormServerActionData, userFormControls } from "@/utils";
import { AddNewUserAction, updateUserAction } from "@/actions";
import { UserContext } from "@/context";

const AddNewUser = () => {
  const {
    editebleId,
    setEditebleId,
    showPopup,
    setShowPopup,
    addNewuserFormData,
    setAddNewuserFormData,
  } = useContext(UserContext);

  const handleUserSaveButton = () => {
    return Object.keys(addNewuserFormData).every(
      (key) => addNewuserFormData[key].trim() !== ""
    );
  };

  const handelAddNewUserAction = async () => {
    const result =
      editebleId !== null
        ? await updateUserAction(
            editebleId,
            addNewuserFormData,
            "/user-mangement"
          )
        : await AddNewUserAction(addNewuserFormData, "/user-management");
    setShowPopup(false);
    setEditebleId(null);
    setAddNewuserFormData(initialFormServerActionData);
  };

  return (
    <div>
      <Button onClick={() => setShowPopup(true)}>Add New User</Button>
      <Dialog
        open={showPopup}
        onOpenChange={() => {
          setShowPopup(false);
          setEditebleId(null);
          setAddNewuserFormData(initialFormServerActionData);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editebleId !== null ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <form action={handelAddNewUserAction} className="grid gap-4 py-4">
            {userFormControls.map((each) => (
              <div className="mb-5" key={each.name}>
                <Label htmlFor={each.name} className="text-right">
                  {each.label}
                </Label>
                <Input
                  id={each.name}
                  placeholder={each.placeholder}
                  className="col-span-3"
                  type={each.type}
                  value={addNewuserFormData[each.name]}
                  onChange={(event) =>
                    setAddNewuserFormData({
                      ...addNewuserFormData,
                      [each.name]: event.target.value,
                    })
                  }
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                className="disabled:opacity-55"
                disabled={!handleUserSaveButton()}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewUser;
