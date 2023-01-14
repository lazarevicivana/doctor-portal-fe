export class NotificationPatient {
  state?: string;
  patientName?: string;
  patientSurname?: string;
  notifications?: string[];

  patientId?:string;

  constructor(state: string, patientName: string, patientSurname: string, notifications: string[], patientId?:string) {
    this.state = state;
    this.patientName = patientName;
    this.patientSurname = patientSurname;
    this.notifications = notifications;
    this.patientId = patientId;
  }
}
