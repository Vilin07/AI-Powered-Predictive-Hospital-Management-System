import { useEffect, useState } from "react";
import {
  getCurrentUser,
  changePassword
} from "../api/authApi";


export default function Profile(){

  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const [currentPassword,setCurrentPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [message,setMessage] = useState("");

  useEffect(()=>{

    const fetchProfile = async()=>{

      try{

        const data = await getCurrentUser();

        setUser(data.user);

      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }

    };


    fetchProfile();

  },[]);

const handleChangePassword = async (e)=>{

  e.preventDefault();

  try{

    const data = await changePassword({
      currentPassword,
      newPassword
    });


    setMessage(data.message);

    setCurrentPassword("");
    setNewPassword("");

  }
  catch(error){

    setMessage(
      error.response?.data?.message ||
      "Password change failed"
    );

  }

};

  if(loading){

    return (
      <h2 className="text-xl">
        Loading Profile...
      </h2>
    );

  }



  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        My Profile
      </h1>



      <div className="bg-white rounded-xl shadow border p-6 max-w-xl">


        <div className="space-y-4">


          <div>
            <p className="text-gray-500">
              Full Name
            </p>

            <p className="font-semibold">
              {user.fullName}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Employee ID
            </p>

            <p className="font-semibold">
              {user.employeeId}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {user.email}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Department
            </p>

            <p className="font-semibold">
              {user.department}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Role
            </p>

            <p className="font-semibold text-cyan-600">
              {user.role}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Last Login
            </p>

            <p className="font-semibold">
              {
                user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Never"
              }
            </p>
          </div>

        <div className="bg-white rounded-xl shadow border p-6 max-w-xl mt-6">

<h2 className="text-xl font-bold mb-4">
  Change Password
</h2>


<form
onSubmit={handleChangePassword}
className="space-y-4"
>


<input
type="password"
placeholder="Current Password"
value={currentPassword}
onChange={(e)=>setCurrentPassword(e.target.value)}
className="w-full border rounded-lg px-4 py-3"
/>


<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
className="w-full border rounded-lg px-4 py-3"
/>


<button
className="bg-cyan-600 text-white px-5 py-3 rounded-lg"
>
Update Password
</button>


</form>


{
message &&
<p className="mt-4 text-sm text-green-600">
{message}
</p>
}


</div>

          <div>
            <p className="text-gray-500">
              Account Status
            </p>

            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
              Active
            </span>

          </div>


        </div>


      </div>


    </div>

  );

}