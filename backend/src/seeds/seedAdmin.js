import dotenv from "dotenv";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {

    try {

        await connectDB();

        const existingAdmin = await User.findOne({
            email: "admin@hospital.com",
        });

        if (existingAdmin) {

            console.log("Administrator already exists.");

            process.exit();

        }

        await User.create({

            fullName: "Hospital Administrator",

            employeeId: "ADMIN001",

            email: "admin@hospital.com",

            department: "Administration",

            role: "Administrator",

            password: "Admin@123",

        });

        console.log("Administrator account created.");

        process.exit();

    }

    catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedAdmin();