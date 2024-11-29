import { IAppointment } from "../../interfaces";

const AppointmentCard = ({
  source_country,
  mission_country,
  visa_category,
  visa_subcategory,
  center_name,
  appointment_date,
}: IAppointment) => {
  return (
    <li
      className={`shadow-md rounded-lg p-6 border border-gray-200 ${
        appointment_date ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {source_country} → {mission_country}
      </h3>
      <p>Visa Category: {visa_category}</p>
      <p>Visa Subcategory: {visa_subcategory}</p>
      <p>Center Name: {center_name}</p>
      {appointment_date ? (
        <p>Appointment Date: {appointment_date}</p>
      ) : (
        <p>No appointment available!</p>
      )}
    </li>
  );
};

export default AppointmentCard;
