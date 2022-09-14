export class Company {

    companyName = 'Example Corp';
    countries = ['AT', 'CH', 'DE', 'CA', 'GB', 'US', 'IT']; // todo: maybe move to a Company / Organization Model
    departments = ['Project Management', 'Development', 'Design', 'Marketing', 'Finances'];
    companyProjects = ['Dog Feeder'];
    // etc.

    constructor() { }

    //transform important comany info as JSOn object (to be stored in the DB)
    public companyToJSON() { }

}