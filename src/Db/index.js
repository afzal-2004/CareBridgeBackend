import mongoose from "mongoose";

const Db_Conntection = async () => {
  try {
    const ConnectionInstance = mongoose.connect();
    console.log("Db Is Connect On :", ConnectionInstance.connection.host);
  } catch (error) {
    console.log("Something Wrong in connection  ", error);
    process.exit(1);
  }
};
export default Db_Conntection;
