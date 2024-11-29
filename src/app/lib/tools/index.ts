import axios from "axios";
import { IAppointment, ICountries, IData } from "../interfaces";

export const capitalize = (input: string) => {
  return input
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const createCountriesArray = (data: IAppointment[]) => {
  const countries: ICountries = {
    source: [],
    mission: [],
  };

  data.forEach((appointment: IAppointment) => {
    if (!countries?.source.includes(appointment.source_country)) {
      countries?.source.push(appointment.source_country);
    }
    if (!countries?.mission.includes(appointment.mission_country)) {
      countries?.mission.push(appointment.mission_country);
    }
  });

  return countries;
};

export const fetchData = async (sc?: string, mc?: string) => {
  try {
    const { data: temp } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL as string
    );

    const countries = createCountriesArray(temp);

    const data: IData = {
      appointments: {
        available: [],
        unavailable: [],
      },
      countries,
    };

    if (sc && mc) {
      const scExists = data.countries.source.some(
        (country) => country === capitalize(sc)
      );
      const mcExists = data.countries.mission.some(
        (country) => country === capitalize(mc)
      );

      if (!scExists && !mcExists) return null;
      else {
        temp.forEach((appointment: IAppointment) => {
          const scMatch = appointment.source_country === capitalize(sc);
          const mcMatch =
            appointment.mission_country === capitalize(mc) || mc === "all";

          if (scMatch && mcMatch) {
            if (appointment.appointment_date) {
              data.appointments.available.push(appointment);
            } else {
              data.appointments.unavailable.push(appointment);
            }
          }
        });
        return data;
      }
    } else {
      return {
        appointments: {
          available: [],
          unavailable: [],
        },
        countries,
      };
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
