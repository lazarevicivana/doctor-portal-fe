export class BloodStatistic {
    startDate: Date | undefined;
    endDate: Date | undefined;
    source: StatisticSource = StatisticSource.TENDER;

  
    public constructor(obj?: any) {
      if (obj) {
        this.startDate = obj.startDate;
        this.endDate = obj.endDate;
        this.source = obj.source;
      }
    }
  }

  export enum StatisticSource {
    TENDER = 0,
    URGENT = 1,
  }

