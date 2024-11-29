"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchData } from "../lib/tools";

const AppointmentContext = createContext({});

const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState({});

  const sc = useSearchParams().get("sc") as string;
  const mc = useSearchParams().get("mc") as string;

  useEffect(() => {
    const handleData = async () => {
      const data = await fetchData(sc, mc);
      if (!data) return;
      else setValue(data);
    };
    handleData();
  }, [sc, mc]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

const useAppointment = () => useContext(AppointmentContext);

export { useAppointment, AppointmentProvider };
