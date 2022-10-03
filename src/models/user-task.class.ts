import { Task } from "src/app/interfaces/task.interface";

export class UserTask implements Task {

    title: string;
    body: string;
    urgency: string;
    importance: string;
    category: string;

    maxBodyLength = 300;
    urgencyOptions: string[] = ['urgent', 'not urgent'];
    importanceOptions: string[] = ['important', 'not important'];
    //eisenhowerMatrixOptions: string[] = ['Do now','Delegate','Do later','Ignore']; //
    taskCategories: string[] = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done'];

    constructor(obj?: Task) {
        this.title = obj?.title ? obj.title : '';
        this.body = obj?.body ? obj.body : '';
        this.urgency = obj?.urgency ? obj.urgency : this.urgencyOptions[1];
        this.importance = obj?.importance ? obj.importance : this.importanceOptions[1];
        this.category= obj?.category ? obj.category : '';
    }

    // set UserTask data:
    public toJSON() {
        return {
            title: this.title,
            body: this.body,
            urgency: this.urgency,
            importance: this.importance,
            category: this.category,
        }
    }
}
