import { Company } from "./company.class";

export class Project extends Company {

    name!: string;
    description!: string;
    descriptionMaxLength: number = 300;
    client!: string;
    //employees!: []; // m:N relationship --> info stored into junction table instead (employee_project)
    managerID!: string;
    tasks!: [];
    dueDate!: number; // as timestamp
    status!: string; // status = ['initialized', 'planning', 'phase 1','phase 2', 'phase 2', 'testing' , 'finalized' , 'deployment'] // predefined options
    countryCode!: string;

    constructor(obj?: any) {
        super();
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.client = obj ? obj.client : '';
        this.managerID = obj ? obj.managerID : '';
        this.tasks = obj ? obj.tasks : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.status = obj ? obj.status : '';
        this.countryCode = obj ? obj.countryCode : '';
    }

    dueDateExpired(dueDateTS?:number) {
        let now = new Date();
        if (!dueDateTS) dueDateTS = this.dueDate;
        let checkDate = new Date(dueDateTS);
        let endOfDueDate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate(), 23, 59, 59);
        return now >= endOfDueDate
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            client: this.client,
            managerID: this.managerID,
            tasks: this.tasks,
            dueDate: this.dueDate,
            status: this.status,
            countryCode: this.countryCode,
        }
    }

}