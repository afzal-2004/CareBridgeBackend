const addNewDoctor = async (req, res) => {
  const {
    name,
    avtar,
    speciality,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about,
  } = req.body;
  console.log(
    name,
    avtar,
    speciality,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about
  );
};
export { addNewDoctor };
