"use client";

import { IData } from "../../interfaces";
import AppointmentCard from "./AppointmentCard";
import { useAppointment } from "@/app/providers/AppointmentProvider";

const Appointments = () => {
  const { appointments } = useAppointment() as IData;

  return (
    <>
      {appointments && (
        <ol>
          {appointments.available?.length > 0 &&
            appointments.available.map((appointment, i) => (
              <AppointmentCard key={i} {...appointment} />
            ))}
          {appointments.unavailable?.length > 0 &&
            appointments.unavailable.map((appointment, i) => (
              <AppointmentCard key={i} {...appointment} />
            ))}
        </ol>
      )}
    </>
  );
};

export default Appointments;
