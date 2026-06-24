import Vital from "../models/vital.js";

export const createVital = async(req, res)=>{
    try{
        const vital = await Vital.create(req.body);
        res.status(201).json(vital);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getVitals =
  async (req, res) => {
    try {
      const vitals =
        await Vital.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json(vitals);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };