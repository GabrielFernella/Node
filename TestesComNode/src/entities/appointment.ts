export interface AppointmentProps {
  custumer: string;
  startsAt: Date;
  endsAt: Date;
}
export class Appointment {
  private props: AppointmentProps;

  get customer(): string {
    return this.props.custumer;
  }

  get startsAt(): Date {
    return this.props.startsAt;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    this.props = props;
  }
}
