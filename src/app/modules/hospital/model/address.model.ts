export class Address {
  id: string = '';
  street: string = '';
  streetNumber: string = '';
  country: string = '';
  city: string = '';
  postcode: number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.street = obj.street;
      this.streetNumber = obj.streetNumber;
      this.country = obj.country;
      this.city = obj.city;
      this.postcode = obj.postcode;
    }
  }
}
