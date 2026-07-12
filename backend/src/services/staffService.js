import User from "../models/User.js";

// Get all staff
export const getAllStaffService = async () => {
  return await User.find().select("-password");
};

// Update staff details
export const updateStaffService = async (id, updatedData) => {

  // Never allow employeeId to be changed
  delete updatedData.employeeId;

  // Never update password from this API
  delete updatedData.password;

  const updatedStaff = await User.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!updatedStaff) {
    throw new Error("Staff member not found.");
  }

  return updatedStaff;
};


export const updateStaffStatus = async (id) => {

  const staff = await User.findById(id);

  if (!staff) {
    throw new Error("Staff member not found.");
  }

  staff.isActive = !staff.isActive;

  await staff.save();

  return staff;

};