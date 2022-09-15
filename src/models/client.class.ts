import { Company } from "./company.class";

export class Client extends Company {
    firstName!: string;
    lastName!: string;
    street!: string;
    streetNo!: number;
    zipCode!: number;
    city!: string;
    email!: string;
    phone!: number;
    countryCode!: string;
    // more Infos:  Contracts, Orders, Invoices & Invoice status...

    constructor(obj?: any) {
        super();
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.street = obj ? obj.street : '';
        this.streetNo = obj ? obj.streetNo : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.countryCode = obj ? obj.countryCode : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            streetNo: this.streetNo,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            phone: this.phone,
            countryCode: this.countryCode,
        }
    }

}