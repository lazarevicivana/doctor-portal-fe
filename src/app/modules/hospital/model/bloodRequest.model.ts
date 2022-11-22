export class BloodRequest {
  type: string = '';
  amount: number | undefined;
  reason: string = '';
  date: Date = new Date();
  doctor: string = '';
  status: number = 0;
  comment: string = '';
  public constructor(obj?: any) {
    if (obj) {
      this.type = obj.type;
      this.amount = obj.amount;
      this.reason = obj.reason;
      this.date = obj.date;
      this.doctor = obj.doctor;
      this.status = obj.status;
      this.comment = obj.comment;
    }
  }
}
