import {
  getAllStaffService,
  updateStaffService,
  updateStaffStatus,
} from "../services/staffService.js";
// Get Staff
export const getAllStaff = async (req, res) => {

  try {

    const staff = await getAllStaffService();

    res.status(200).json({
      success: true,
      staff,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const changeStaffStatus = async (req, res) => {

  try {

    const staff = await updateStaffStatus(req.params.id);

    res.status(200).json({
      success: true,
      message: "Staff status updated successfully.",
      staff,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};