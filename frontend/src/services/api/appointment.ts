import api from '.';

import IAppointment from '../../interfaces/Appointment';
import IDoctor from '../../interfaces/Doctor';
import ISchedule from '../../interfaces/Schedule';
import ISpecialty from '../../interfaces/Specialties';

export async function getSpecialties() {
  try {
    const response = await api.get<{specialties: ISpecialty[]}>(
      '/appointments/specialties',
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function getDoctors(specialtyId: string) {
  try {
    const response = await api.get<{doctors: IDoctor[]}>(
      `/appointments/doctors/${specialtyId}`,
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function getSchedules(doctorId: string) {
  try {
    const response = await api.get<{schedules: ISchedule[]}>(
      `/appointments/schedules/${doctorId}`,
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
export async function createAppointment(
  userId: string,
  doctorId: string,
  scheduleId: string,
  time: string,
) {
  try {
    const response = await api.post<IAppointment>(
      '/appointments',
      {
        userId, doctorId, scheduleId, time,
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function getAppointments(userId: string) {
  try {
    const response = await api.get<{appointments: IAppointment[]}>(
      `/appointments/${userId}`,
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function removeAppointment(userId: string, appointmentId: string) {
  try {
    const response = await api.delete(
      `/appointments/${userId}/${appointmentId}`,
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
