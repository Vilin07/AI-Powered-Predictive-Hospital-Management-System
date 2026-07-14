export default function PatientDetailsModal({
  isOpen,
  patient,
  onClose,
}) {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="bg-cyan-600 text-white px-8 py-6 flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Patient Details
            </h2>

            <p className="opacity-90">
              AI Patient Summary
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl font-bold hover:text-red-200"
          >
            ×
          </button>

        </div>

        <div className="p-8 space-y-8">

          {/* Patient Information */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              Patient Information
            </h3>

            <div className="grid md:grid-cols-3 gap-5">

              <InfoCard title="Patient ID" value={patient.patientId} />

              <InfoCard title="Full Name" value={patient.name} />

              <InfoCard title="Age" value={patient.age} />

              <InfoCard title="Gender" value={patient.gender} />

              <InfoCard title="Room" value={patient.roomNumber} />

              <InfoCard title="Status" value={patient.status} />

            </div>

          </div>

          {/* Live Vitals */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              Live Vitals
            </h3>

            <div className="grid md:grid-cols-5 gap-5">

              <VitalCard
                title="Heart Rate"
                value="82 BPM"
                color="text-red-600"
              />

              <VitalCard
                title="Respiration"
                value="18/min"
                color="text-blue-600"
              />

              <VitalCard
                title="SpO₂"
                value="98%"
                color="text-green-600"
              />

              <VitalCard
                title="Temperature"
                value="98.6°F"
                color="text-orange-500"
              />

              <VitalCard
                title="Blood Pressure"
                value="120/80"
                color="text-cyan-600"
              />

            </div>

          </div>

          {/* AI Analysis */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              AI Clinical Analysis
            </h3>

            <div className="grid md:grid-cols-4 gap-5">

              <VitalCard
                title="Distress Score"
                value="22"
                color="text-orange-600"
              />

              <VitalCard
                title="Risk Level"
                value="Low"
                color="text-green-600"
              />

              <VitalCard
                title="Drowsiness"
                value="No"
                color="text-blue-600"
              />

              <VitalCard
                title="Fall Risk"
                value="Low"
                color="text-purple-600"
              />

            </div>

          </div>

          {/* Recommendation */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              AI Recommendation
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">

              <p className="text-gray-700 leading-8">

                Patient condition appears stable.

                Continue routine monitoring.

                No immediate medical intervention required.

              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg border"
            >
              Close
            </button>

            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
            >
              Download AI Report
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 bg-gray-50">
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className="font-bold text-lg mt-2">{value}</h4>
    </div>
  );
}

function VitalCard({ title, value, color }) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className={`font-bold text-2xl mt-2 ${color}`}>
        {value}
      </h4>
    </div>
  );
}