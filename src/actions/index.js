"use server";
import { connectionToDb } from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// must be to add use server to work server actions

// Add New user Server Action

export async function AddNewUserAction(formData, pathToRevalidate) {
  try {
    await connectionToDb();

    const createUser = await User.create(formData);
    if (createUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User added successfully",
      };
    } else {
      return {
        success: false,
        message: "Something error occurred! please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something error occurred! please try again",
    };
  }
}

//fetch user from server

export async function fetchUsersAction() {
  await connectionToDb();
  try {
    const getUsersList = await User.find();
    if (getUsersList) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUsersList)),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something error occurred! please try again",
    };
  }
}

// delete user using serve action

export async function deleteUserAction(currentId, pathToRevalidate) {
  await connectionToDb();
  try {
    const deleteUser = await User.findByIdAndDelete(currentId);
    if (deleteUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able Perform Delete Operation! please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something error occurred! please try again",
    };
  }
}

//update the user using server actions

export async function updateUserAction(currentId, formData, pathToRevalidate) {
  await connectionToDb();

  const { firstName, lastName, email, address } = formData;

  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: currentId },
      { firstName, lastName, email, address },
      { new: true }
    );
    if (updateUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Update user successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able to Perform Update user! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something error occurred! please try again",
    };
  }
}
