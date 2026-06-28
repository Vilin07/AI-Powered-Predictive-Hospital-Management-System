import axios from "axios";

const API = "http://localhost:8000/api/alerts";

export const getAlerts = async () => {
    const res = await axios.get(API);
    return res.data;
};