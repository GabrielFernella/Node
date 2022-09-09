import { Appointment } from './../entities/appointment';
import { CreateAppointment } from './create-appointment';
import { describe, it, expect } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    expect(
      createAppointment.execute({
        custumer: 'John Doe',
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-15');
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      custumer: 'John Doe',
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        custumer: 'John Doe',
        startsAt: getFutureDate('2022-08-14'),
        endsAt: getFutureDate('2022-08-18'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        custumer: 'John Doe',
        startsAt: getFutureDate('2022-08-08'),
        endsAt: getFutureDate('2022-08-12'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        custumer: 'John Doe',
        startsAt: getFutureDate('2022-08-12'),
        endsAt: getFutureDate('2022-08-14'),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
