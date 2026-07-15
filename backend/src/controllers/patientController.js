import Patient from "../models/patient.js";

export const createPatient =
  async (req, res) => {
    try {
      const patient =
        await Patient.create(req.body);

      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getPatients =
  async (req, res) => {
    try {
      const patients =
        await Patient.find();

      res.status(200).json(
        patients
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const updatePatientAIData = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        heartRate: req.body.heartRate,
        respirationRate: req.body.respirationRate,
        temperature: req.body.temperature,
        oxygenLevel: req.body.oxygenLevel,
        bloodPressure: req.body.bloodPressure,

        distressScore: req.body.distressScore,
        riskLevel: req.body.riskLevel,
        fallRisk: req.body.fallRisk,
        drowsyStatus: req.body.drowsyStatus,
        recommendation: req.body.recommendation,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      patient,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const updatePatientStatus = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    patient.status =
      patient.status === "Active"
        ? "Discharged"
        : "Active";

    await patient.save();

    res.json({
      success: true,
      patient,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};