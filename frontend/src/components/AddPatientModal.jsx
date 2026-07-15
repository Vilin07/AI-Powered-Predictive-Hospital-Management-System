import { useState } from "react";

export default function AddPatientModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "Male",
    roomNumber: "",
    status: "Active",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(form);

    setForm({
      patientId: "",
      name: "",
      age: "",
      gender: "Male",
      roomNumber: "",
      status: "Active",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          Add New Patient
        </h2>

        <div className="space-y-4">

          <input
            name="patientId"
            placeholder="Patient ID"
            value={form.patientId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Active</option>
            <option>Discharged</option>
          </select>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-cyan-600 text-white px-5 py-3 rounded-lg"
          >
            Add Patient
          </button>

        </div>

      </div>

    </div>
  );
}