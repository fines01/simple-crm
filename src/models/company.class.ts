export class Company {

    companyName = 'Example Corp';
    countries = ['AT', 'CH', 'DE', 'CA', 'GB', 'US', 'IT'];
    departments = ['Project Management', 'Development', 'Design', 'Marketing', 'Finances'];
    companyProjects = [];
    // etc.

    constructor() { }

    //transform important comany info as JSOn object (to be stored in the DB)
    public companyToJSON() { }

}