import { AppointmentRepository } from './../repositories/appointment-repository';
import { Appointment } from '../entities/appointment';

interface CreateAppointmentRequest {
  custumer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    custumer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentsRepository.findOverLappingAppointment(
      startsAt,
      endsAt
    );

    if (overlappingAppointment) {
      throw new Error('Another appointments overlaps thos appointment dates');
    }

    const appointment = new Appointment({ custumer, startsAt, endsAt });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
