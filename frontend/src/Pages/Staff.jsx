import { useEffect, useState } from "react";
import { getAllStaff } from "../api/staffApi";
import EditStaffModal from "../components/EditStaffModal";
import {
  updateStaff,
  updateStaffStatus
} from "../api/staffApi";
import {useNavigate} from "react-router-dom";

export default function Staff() {
    const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  
  const fetchStaff = async () => {

  try {

    const data = await getAllStaff();

    setStaff(data.staff);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};
  
  useEffect(() => {
  fetchStaff();
}, []);

const handleEdit = (member) => {
  setSelectedStaff(member);
  setIsEditOpen(true);
};

const handleSave = async (updatedData) => {
  try {

    await updateStaff(
      selectedStaff._id,
      updatedData
    );

    setIsEditOpen(false);

    fetchStaff();

  } catch (error) {

    console.error(error);

    alert("Unable to update staff.");

  }
};

const handleStatusChange = async (member) => {

  const confirmChange = window.confirm(
    `Are you sure you want to ${
      member.isActive ? "deactivate" : "activate"
    } ${member.fullName}?`
  );


  if (!confirmChange) return;


  try {

    await updateStaffStatus(member._id);

    fetchStaff();


  } catch(error){

    console.log(error);

    alert("Unable to update staff status.");

  }

};
  

  if (loading) {

    return <h1 className="text-2xl">Loading Staff...</h1>;

  }
  
const totalStaff = staff.length;

const totalDoctors = staff.filter(
  (member) => member.role === "Doctor"
).length;

const totalNurses = staff.filter(
  (member) => member.role === "Nurse"
).length;

const activeStaff = staff.filter(
  (member) => member.isActive
).length;

const filteredStaff = staff.filter((member) => {

  const matchesSearch =
    member.fullName.toLowerCase().includes(search.toLowerCase()) ||
    member.employeeId.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase());

  const matchesRole =
    roleFilter === "" || member.role === roleFilter;

  const matchesDepartment =
    departmentFilter === "" ||
    member.department === departmentFilter;

  const matchesStatus =
    statusFilter === "" ||
    (statusFilter === "Active" && member.isActive) ||
    (statusFilter === "Inactive" && !member.isActive);

  return (
    matchesSearch &&
    matchesRole &&
    matchesDepartment &&
    matchesStatus
  );

});

 return (
  <>
    <div className="p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Staff Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage doctors, nurses, technicians and hospital administrators.
        </p>
      </div>

      <button
  onClick={() => navigate("/register")}
  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition"
>
  + Register Staff
</button>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  <div className="bg-white rounded-xl shadow border p-6">
    <p className="text-gray-500 text-sm">Total Staff</p>
    <h2 className="text-3xl font-bold mt-2">
      {totalStaff}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow border p-6">
    <p className="text-gray-500 text-sm">Doctors</p>
    <h2 className="text-3xl font-bold mt-2">
      {totalDoctors}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow border p-6">
    <p className="text-gray-500 text-sm">Nurses</p>
    <h2 className="text-3xl font-bold mt-2">
      {totalNurses}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow border p-6">
    <p className="text-gray-500 text-sm">Active Staff</p>
    <h2 className="text-3xl font-bold mt-2">
      {activeStaff}
    </h2>
  </div>

</div>

<div className="bg-white rounded-xl shadow border p-5 mb-6">

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

    {/* Search */}

    <input
      type="text"
      placeholder="Search by Name, ID or Email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
    />

    {/* Role */}

    <select
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
      className="border rounded-lg px-4 py-3"
    >
      <option value="">All Roles</option>
      <option>Administrator</option>
      <option>Doctor</option>
      <option>Nurse</option>
      <option>Lab Technician</option>
      <option>Receptionist</option>
    </select>

    {/* Department */}

    <select
      value={departmentFilter}
      onChange={(e) => setDepartmentFilter(e.target.value)}
      className="border rounded-lg px-4 py-3"
    >
      <option value="">All Departments</option>
      <option>Administration</option>
      <option>Emergency</option>
      <option>ICU</option>
      <option>Cardiology</option>
      <option>Neurology</option>
      <option>Radiology</option>
      <option>Laboratory</option>
      <option>Pediatrics</option>
      <option>General Ward</option>
    </select>

    {/* Status */}

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border rounded-lg px-4 py-3"
    >
      <option value="">All Status</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>

  </div>

</div>



<div className="flex justify-between items-center mb-4">

  <h2 className="text-xl font-semibold text-slate-800">
    Staff Directory
  </h2>

  <p className="text-gray-500">
    Showing <span className="font-semibold">{filteredStaff.length}</span> of{" "}
    <span className="font-semibold">{staff.length}</span> staff members
  </p>

</div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Employee ID</th>

            <th className="text-left p-4">Name</th>

            <th className="text-left p-4">Role</th>

            <th className="text-left p-4">Department</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Last Login</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>
  {filteredStaff.length > 0 ? (
    filteredStaff.map((member) => (
      <tr
        key={member._id}
        className="border-t hover:bg-slate-50"
      >
        <td className="p-4">
          {member.employeeId}
        </td>

        <td className="p-4">
          <div>
            <p className="font-medium">
              {member.fullName}
            </p>
            <p className="text-sm text-gray-500">
              {member.email}
            </p>
          </div>
        </td>

        <td className="p-4">
          {member.role}
        </td>

        <td className="p-4">
          {member.department}
        </td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              member.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {member.isActive ? "Active" : "Inactive"}
          </span>
        </td>

        <td className="p-4">
          {member.lastLogin
            ? new Date(member.lastLogin).toLocaleString()
            : "Never"}
        </td>

        <td className="p-4">
          <button
  onClick={() => handleEdit(member)}
  className="text-cyan-600 hover:underline mr-5"
>
  Edit
</button>

          <button
  onClick={() => handleStatusChange(member)}
  className={
    member.isActive
      ? "text-red-600 hover:underline"
      : "text-green-600 hover:underline"
  }
>
  {member.isActive ? "Deactivate" : "Activate"}
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
        No staff members found.
      </td>
    </tr>
  )}
</tbody>

     </table>

    </div>

    <EditStaffModal
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      staff={selectedStaff}
      onSave={handleSave}
    />

  </div>
  </>
);
}