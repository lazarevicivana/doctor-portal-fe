export class MedicinePrescriptionModel {
  treatmentReportId: string = '';
  medicineId: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.treatmentReportId = obj.treatmentReportId;
      this.medicineId = obj.medicineId;
    }
  }
}
