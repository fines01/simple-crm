import { Task } from "src/app/interfaces/task.interface";

export class UserTask implements Task {

    title: string;
    body: string;
    urgency: string;
    importance: string;
    category: string;

    welcomeTasks = [
        {
            title: 'Welcome!',
            body: 'Welcome to your tasks section. Here you can define what needs to be done and organize your tasks.',
            urgency: 'not urgent',
            importance: 'not important',
            category: 'To Do (Backlog)'
        },
        {
            title: 'Categorize your tasks',
            body: 'Select one of the given categories for your task according to the current status (e.g. \'Do Next\'), and decide on the urgency and importance',
            urgency: 'not urgent',
            importance: 'important',
            category: 'To Do (Backlog)'
        },
        {
            title: 'Filter your tasks',
            body: 'Click on the buttons above or select a specific category to filter your tasks accordingly.',
            urgency: 'urgent',
            importance: 'not important',
            category: 'Do Next'
        },
        {
            title: 'I am done',
            body: 'You can mark done tasks via the category \'Done\' to keep track of your progress and review them later, or just delete them permanently.',
            urgency: 'urgent',
            importance: 'important',
            category: 'Done'
        },
    ]

    maxBodyLength = 300;
    urgencyOptions: string[] = ['urgent', 'not urgent'];
    importanceOptions: string[] = ['important', 'not important'];
    taskCategories: string[] = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done'];
    //eisenhowerMatrixOptions: string[] = ['Do now','Delegate','Do later','Ignore']; //

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
