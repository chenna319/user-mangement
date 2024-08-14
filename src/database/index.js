import mongoose from "mongoose";

export const connectionToDb = () => {
  const url =
    process.env.MONGO_URL ||
    "mongodb+srv://chennavemulapalli5:vemulapalli77300@cluster0.ayx8v.mongodb.net/";
  mongoose
    .connect(url)
    .then(() => console.log("database connection established"))
    .catch((e) => console.log(e));
};
