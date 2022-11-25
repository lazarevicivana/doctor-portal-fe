
export class ConfigureGenerateAndSendPerid {
    bloodBankName: string = '';
    generatePeriod: string = '';
    sendPeriod: string= '';

    public constructor(obj?: any) {
        if (obj) {
            this.bloodBankName=obj.bloodBankName;
            this.generatePeriod=obj.generatePeriod;
            this.sendPeriod=obj.sendPeriod;
        }
    }
}

export class ConfiguratinRequest{
    bloodBankName: string = '';
    generatePeriod: string = '';
    sendPeriod: string= '';
    // nextSendPeriod: Date= new Date();

    public constructor(obj?: any) {
        if (obj) {
            this.bloodBankName=obj.bloodBankName;
            this.generatePeriod=obj.generatePeriod;
            this.sendPeriod=obj.sendPeriod;
            // this.sendPeriod=obj.nextSendPeriod;
        }
    }

}
