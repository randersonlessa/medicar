export const data = {
  specialties: [
    {
      id: '1',
      name: 'Pediatria',
    },
    {
      id: '2',
      name: 'Ginecologia',
    },
    {
      id: '3',
      name: 'Clínico Geral',
    },
  ],
  doctors: [
    {
      id: '1',
      name: 'Drauzio Varella',
      specialtyId: '1',
    },
    {
      id: '2',
      name: 'Tony Tony Chopper',
      specialtyId: '2',
    },
    {
      id: '3',
      name: 'Gregory House',
      specialtyId: '3',
    },
  ],
  schedules: [
    {
      id: '1',
      doctorId: '1',
      day: '16/08/2022',
      empty: false,
      schedules: [
        '14:00',
        '14:15',
        '16:00',
      ],
    },
    {
      id: '2',
      doctorId: '2',
      day: '16/08/2022',
      empty: false,
      schedules: [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '14:00',
      ],
    },
    {
      id: '3',
      doctorId: '3',
      day: '16/08/2022',
      empty: false,
      schedules: [
        '14:00',
        '14:15',
        '16:00',
      ],
    },
  ],
  appointments: [],
  users: [],
  tokens: [],
};
