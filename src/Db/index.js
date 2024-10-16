import mongoose from "mongoose";
import DB_NAME from "../Constant.js";
const Db_Conntection = async () => {
  try {
    const ConnectionInstance = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Db Is Connect On ${(await ConnectionInstance).connection.host} `
    );
  } catch (error) {
    console.log("Something Wrong in connection  ", error);
    process.exit(1);
  }
};
export default Db_Conntection;
