interface IAppointment {
  id: string;
  specialty: string;
  doctor: string;
  day: string;
  time: string;
  userId: number;
}

export default IAppointment;
