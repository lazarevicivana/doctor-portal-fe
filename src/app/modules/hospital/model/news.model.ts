export class NewsFromBloodBank {
    id: string = '';
    title: string = '';
    content: string = '';
    bloodBankName: string = '';
    newsStatus: NewsFromBloodBankStatus = NewsFromBloodBankStatus.ON_HOLD; 


    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.title = obj.title;
            this.content = obj.content;
            this.bloodBankName = obj.bloodBankName
            this.newsStatus = obj.newsStatus       
        }
    }
}

export enum NewsFromBloodBankStatus{
    ON_HOLD,
    ACTIVATED,
    REFUSED
}