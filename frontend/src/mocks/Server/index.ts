import { createServer, Model, Response } from 'miragejs';
import { API_URL } from '../../config';
import { data } from './data';

export const CreateServer = () => {
  createServer({
    models: {
      user: Model,
      token: Model,
      specialty: Model,
      doctor: Model,
      schedule: Model,
      appointment: Model,
    },
    seeds(server) {
      server.db.loadData(data);
    },
    routes() {
      this.urlPrefix = API_URL;
      this.timing = 2000;

      this.post('/users/login', (schema, request) => {
        const body = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({
          email: body.email,
        });

        if (user) {
          if (user.password === body.password) {
            const token = schema.db.tokens.insert({ time: Date.now(), userId: user.id });
            delete user.password;

            return { user, token: token.id };
          }
          const error = { errors: [{ field: 'password', message: 'senha inválida' }] };
          return new Response(400, {}, error);
        }
        const error = { errors: [{ field: 'email', message: 'usuário inválido' }] };
        return new Response(400, {}, error);
      });

      this.post('/users', (schema, request) => {
        const body = JSON.parse(request.requestBody);

        const verifyEmail = schema.db.users.findBy({ email: body.email });

        if (verifyEmail) {
          const error = { errors: [{ field: 'email', message: 'email já cadastrado' }] };
          return new Response(400, {}, error);
        }

        const user = schema.db.users.insert(body);

        const token = schema.db.tokens.insert({ time: Date.now(), userId: user.id });

        delete user.password;
        return { user, token: token.id };
      });

      this.get('/users/:userId', (schema, request) => {
        const { userId } = request.params;
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const user = schema.db.users.findBy({ id: userId });
        delete user.password;
        return user;
      });

      this.get('/appointments/specialties', (schema, request) => {
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const specialties = schema.db.specialties.where({});

        return { specialties };
      });

      this.get('/appointments/doctors/:specialtyId', (schema, request) => {
        const { specialtyId } = request.params;
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const doctors = schema.db.doctors.where({ specialtyId });

        return { doctors };
      });

      this.get('/appointments/schedules/:doctorId', (schema, request) => {
        const { doctorId } = request.params;
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const schedules = schema.db.schedules.where({ doctorId, empty: false });

        return { schedules };
      });

      this.post('/appointments', (schema, request) => {
        const {
          userId, doctorId, scheduleId, time,
        } = JSON.parse(request.requestBody);
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token || token.userId !== userId) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const schedule = schema.db.schedules.findBy({ id: scheduleId });

        if (!schedule) {
          const error = { errors: [{ field: 'scheduleId', message: 'inválido' }] };
          return new Response(400, {}, error);
        }

        const { schedules } = schedule;
        const schedulesIndex = schedules.indexOf(time);
        const last = schedules.length === 1;

        if (schedulesIndex === -1) {
          const error = { errors: [{ field: 'time', message: 'inválido' }] };
          return new Response(400, {}, error);
        }

        if (schedule.doctorId !== doctorId) {
          const error = { errors: [{ field: 'doctorId', message: 'inválido' }] };
          return new Response(400, {}, error);
        }

        schedules.splice(schedulesIndex, 1);
        schema.db.schedules.update({ id: scheduleId }, { empty: last, schedules });

        const doctor = schema.db.doctors.findBy({ id: doctorId });
        const specialty = schema.db.specialties.findBy({ id: doctor.specialtyId });

        return schema.db.appointments.insert({
          specialty: specialty.name,
          doctor: doctor.name,
          day: schedule.day,
          time,
          scheduleId,
          userId,
        });
      });

      this.get('/appointments/:userId', (schema, request) => {
        const { userId } = request.params;
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token || token.userId !== userId) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const appointments = schema.db.appointments.where({ userId });

        return { appointments };
      });

      this.delete('/appointments/:userId/:appointmentId', (schema, request) => {
        const { userId, appointmentId } = request.params;
        const headers = request.requestHeaders;

        const token = schema.db.tokens.findBy({ id: headers.Authorization });

        if (!token || token.userId !== userId) {
          const error = { errors: [{ message: 'não autorizado' }] };
          return new Response(401, {}, error);
        }

        const appointment = schema.db.appointments.findBy({ id: appointmentId });
        const schedule = schema.db.schedules.findBy({ id: appointment.scheduleId });
        const { schedules } = schedule;
        schedules.push(appointment.time);

        schema.db.schedules.update({ id: schedule.id }, { empty: false, schedules });

        schema.db.appointments.remove({ id: appointmentId });

        return { message: 'Consulta desmarcada com sucesso!' };
      });
    },
  });
};
