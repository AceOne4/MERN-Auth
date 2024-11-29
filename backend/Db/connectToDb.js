import mongoose from "mongoose";

export const connetToDatabase = async () => {
  try {
    const connecetion = await mongoose.connect(process.env.MONGODB_URL);
    console.log("its connencting", connecetion.connection.host);
  } catch (error) {
    console.log("Connection error: " + error.message);
    process.exit(1);
  }
};
