export class NotificationPatient {
  state?: string;
  patientName?: string;
  patientSurname?: string;
  notifications?: string[];

  constructor(state: string, patientName: string, patientSurname: string, notifications: string[]) {
    this.state = state;
    this.patientName = patientName;
    this.patientSurname = patientSurname;
    this.notifications = notifications;
  }
}
