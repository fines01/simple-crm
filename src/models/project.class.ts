import { Company } from "./company.class";

export class Project extends Company {

    name!: string;
    description!: string;
    projectManager!: string;
    projectManagerID!: string
    client!: string;
    //employees!: []; // m:N relationship --> info stored into junction table instead (employee_project)
    managerID!: string;
    tasks!: [];
    dueDate!: number;
    status!: string; // status = ['initialized', 'planning', 'phase 1','phase 2', 'phase 2', 'testing' , 'finalized' , 'deployment'] // maybe better predefined options, than any blabla
    countryCode!: string;
    // more Infos:  Contracts, Orders, Invoices & Invoice status... etc.

    constructor(obj?: any) {
        super();
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.projectManager = obj ? obj.projectManager : '';
        this.projectManagerID = obj ? obj.projectManagerID : '';
        this.client = obj ? obj.client : '';
        this.managerID = obj ? obj.managerID : '';
        this.tasks = obj ? obj.tasks : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.status = obj ? obj.status : '';
        this.countryCode = obj ? obj.countryCode : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            projectManager: this.projectManager,
            projectManagerID: this.projectManagerID,
            client: this.client,
            managerID: this.managerID,
            tasks: this.tasks,
            dueDate: this.dueDate,
            status: this.status,
            countryCode: this.countryCode,
        }
    }

}