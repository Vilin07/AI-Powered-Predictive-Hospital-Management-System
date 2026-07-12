import { useState, useEffect } from "react";

export default function EditStaffModal({
  isOpen,
  onClose,
  staff,
  onSave,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    role: "",
  });

  useEffect(() => {
    if (staff) {
      setForm({
        fullName: staff.fullName,
        email: staff.email,
        department: staff.department,
        role: staff.role,
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Staff Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Department
            </label>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Administration</option>
              <option>Emergency</option>
              <option>ICU</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Radiology</option>
              <option>General Ward</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Administrator</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Technician</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-600 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}