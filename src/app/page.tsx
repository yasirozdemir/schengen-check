"use client";

import { useRouter } from "next/navigation";
import { useAppointment } from "./providers/AppointmentProvider";
import { IData } from "./lib/interfaces";

export default function Home() {
  const router = useRouter();
  const { countries } = useAppointment() as IData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const srcCountry = (form.srcCountry as HTMLSelectElement).value;
    const msnCountry = (form.msnCountry as HTMLSelectElement).value;

    if (srcCountry === "") {
      alert("Source Country is required!");
    }
    if (msnCountry === "") {
      alert("Mission Country is required!");
    }
    if (srcCountry !== "" && msnCountry !== "")
      router.push(
        `/appointments?sc=${srcCountry.toLowerCase()}&mc=${msnCountry.toLowerCase()}`
      );
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="srcCountry">Source Country:</label>
      <select name="srcCountry" id="srcCountry">
        <option value="">Select</option>
        {countries?.source.sort().map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </select>

      <label htmlFor="msnCountry">Mission Country:</label>
      <select name="msnCountry" id="msnCountry">
        <option value="">Select</option>
        <option value="all">All</option>
        {countries?.mission.sort().map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </select>

      <button type="submit">Search</button>
    </form>
  );
}
