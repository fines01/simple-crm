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
    //project_IDs!: string[]; //M:N relationship: save project-ids of projects the employee works on... create a junction-table instead?
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
            tasks: this.tasks,
            colorCode: this.colorCode,
            isAdmin: this.isAdmin,
        }
    }

    public randomHexColor() {
    let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColorStr = '#';
    for (let i = 0; i < 6; i++) {
        let randNr = Math.floor(Math.random() * hex.length); //random number between [0, hex.length[
        hexColorStr += hex[randNr];
    }
    return hexColorStr;
}

}