import { getDashboardAnalytics } from "../services/dashboardService.js";

export const getDashboard = async (req,res) => {
  try {
    const dashboard =
      await getDashboardAnalytics();

    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};