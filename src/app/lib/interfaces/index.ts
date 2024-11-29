export interface IAppointment {
  source_country: string;
  mission_country: string;
  visa_type_id: number;
  visa_category: string;
  visa_subcategory: string;
  people_looking: number;
  center_name: string;
  appointment_date: null;
  book_now_link: string;
  last_checked: Date;
}

export interface ICountries {
  source: string[];
  mission: string[];
}

export interface IData {
  appointments: {
    available: IAppointment[];
    unavailable: IAppointment[];
  };
  countries: ICountries;
}
