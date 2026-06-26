import LiveVital from "../models/liveVital.js";
import { generateAlert } from "../services/alertService.js";
import { getIO } from "../socket/socket.js";

// Create or Update Live Vitals
export const updateLiveVital = async (req, res) => {
  try {
    const { patientId } = req.body;

    const updatedVital = await LiveVital.findOneAndUpdate(
      { patientId },      // Find patient
      {
        ...req.body,
        lastUpdated: new Date(),
      },
      {
        new: true,         // Return updated document
        upsert: true,      // Create if not found
      }
    );

await generateAlert(updatedVital);

// Emit live update to all connected dashboards
const io = getIO();

io.emit("liveVitalsUpdated", updatedVital);

res.status(200).json(updatedVital);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all live vitals
export const getLiveVitals = async (req, res) => {
  try {
    const vitals = await LiveVital.find().sort({
      updatedAt: -1,
    });

    res.status(200).json(vitals);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one patient's live vitals
export const getLiveVitalByPatient = async (req, res) => {
  try {
    const vital = await LiveVital.findOne({
      patientId: req.params.patientId,
    });

    if (!vital) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(vital);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};