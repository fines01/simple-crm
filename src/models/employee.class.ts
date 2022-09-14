import { stringLength } from "@firebase/util";
import { Company } from "./company.class";

export class Employee extends Company {

    firstName!: string;
    lastName!: string;
    birthDate!: number; // as timestamp
    street!: string;
    streetNo!: number;
    zipCode!: number;
    city!: string;
    email!: string;
    phone!: number;
    countryCode!: string;
    department!: string;
    projects!: string[];
    tasks!: string[];
    colorCode!: string;
    isAdmin: boolean = false;
    //profilePicture:! string; //path
    // etc...

    constructor(obj?: any) {
        super();
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.streetNo = obj ? obj.streetNo : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.countryCode = obj ? obj.countryCode : '';
        this.department = obj ? obj.department : '';
        this.projects = obj ? obj.projects : '';
        this.tasks = obj ? obj.tasks : '';
        this.colorCode = obj ? obj.colorCode : '';
        this.isAdmin = obj ? obj.isAdmin : false;
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            streetNo: this.streetNo,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            phone: this.phone,
            countryCode: this.countryCode,
            department: this.department,
            projects: this.projects,
            tasks: this.tasks,
            colorCode: this.colorCode,
            isAdmin: this.isAdmin,
        }
    }

}