import Alert from "../models/alert.js";

// Get All Alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({
      createdAt: -1,
    });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Alerts of One Patient
export const getPatientAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({
      patientId: req.params.patientId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Mark Alert as Read
export const markAlertAsRead = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: "Read",
      },
      {
        new: true,
      }
    );

    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};