import { useEffect,useMeno, useState } from "react";
import {
  getPatients,
  createPatient,
  updatePatientStatus,
} from "../api/patientApi";
import PatientDetailsModal from "../components/PatientDetailsModal";
import AddPatientModal from "../components/AddPatientModal";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


useEffect(() => {
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchPatients();
}, []);

if (loading) {
  return (
    <h2 className="text-2xl font-semibold">
      Loading Patients...
    </h2>
  );
}

const totalPatients = patients.length;

const activePatients = patients.filter(
  (patient) => patient.status === "Active"
).length;

const dischargedPatients = patients.filter(
  (patient) => patient.status === "Discharged"
).length;

const icuPatients = patients.filter(
  (patient) =>
    patient.roomNumber?.toUpperCase().includes("ICU")
).length;

const filteredPatients = patients.filter((patient) => {
  const matchesSearch =
    patient.name.toLowerCase().includes(search.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "" ||
    patient.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const handleAddPatient = async (patientData) => {
  try {
    const newPatient = await createPatient(patientData);

    setPatients((prev) => [...prev, newPatient]);

  } catch (error) {
    console.error(error);
  }
};

const handleStatusChange = async (id) => {
  try {
    const updatedPatient = await updatePatientStatus(id);

    setPatients((prev) =>
      prev.map((patient) =>
        patient._id === id ? updatedPatient : patient
      )
    );

  } catch (error) {
    console.error(error);
  }
};


  return (
  <div className="p-6">

    {/* Header */}
<div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-3xl font-bold text-slate-800">
      Patient Management
    </h1>

    <p className="text-gray-500 mt-1">
      View and manage all hospital patients.
    </p>

  </div>

  <button
    onClick={() => setShowAddModal(true)}
    className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl font-semibold shadow"
  >
    + Add Patient
  </button>

</div>

    {/* Summary Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <div className="bg-white rounded-xl shadow border p-6">

        <p className="text-gray-500 text-sm">
          Total Patients
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {totalPatients}
        </h2>

      </div>

      <div className="bg-white rounded-xl shadow border p-6">

        <p className="text-gray-500 text-sm">
          Active Patients
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {activePatients}
        </h2>

      </div>

      <div className="bg-white rounded-xl shadow border p-6">

        <p className="text-gray-500 text-sm">
          ICU Patients
        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          {icuPatients}
        </h2>

      </div>

      <div className="bg-white rounded-xl shadow border p-6">

        <p className="text-gray-500 text-sm">
          Discharged
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {dischargedPatients}
        </h2>

      </div>

    </div>

    {/* Search */}

    <div className="bg-white rounded-xl shadow border p-5 mb-8">

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Search by Patient ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Discharged">
            Discharged
          </option>

        </select>

      </div>

    </div>

    {/* Directory */}

    <div className="flex justify-between items-center mb-4">

      <h2 className="text-xl font-semibold text-slate-800">
        Patient Directory
      </h2>

      <p className="text-gray-500">

        Showing

        <span className="font-semibold">
          {" "}
          {filteredPatients.length}
        </span>

        {" "}of{" "}

        <span className="font-semibold">
          {patients.length}
        </span>

        {" "}patients

      </p>

    </div>

    {/* Table */}

    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">
              Patient ID
            </th>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Age
            </th>

            <th className="text-left p-4">
              Gender
            </th>

            <th className="text-left p-4">
              Room
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-center p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredPatients.length > 0 ? (

            filteredPatients.map((patient) => (

              <tr
                key={patient._id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  {patient.patientId}
                </td>

                <td className="p-4 font-medium">
                  {patient.name}
                </td>

                <td className="p-4">
                  {patient.age}
                </td>

                <td className="p-4">
                  {patient.gender}
                </td>

                <td className="p-4">
                  {patient.roomNumber}
                </td>

               <td className="p-4">

<button
  onClick={() => {
    console.log("Clicked", patient._id);
    handleStatusChange(patient._id);
  }}
  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
    patient.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {patient.status}
</button>

</td>

                <td className="text-center p-4">

                 <button
                    onClick={() => {
                    setSelectedPatient(patient);
                    setIsModalOpen(true);
                    }}
                    className="text-cyan-600 hover:underline font-medium"
                    >
                    View
                </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="7"
                className="text-center py-10 text-gray-500"
              >

                No patients found.

              </td>

            </tr>

          )}

        </tbody>

      </table>

      <PatientDetailsModal
        isOpen={isModalOpen}
        patient={selectedPatient}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
    <AddPatientModal
  isOpen={showAddModal}
  onClose={() => setShowAddModal(false)}
  onSave={handleAddPatient}
/>

  </div>
);
}