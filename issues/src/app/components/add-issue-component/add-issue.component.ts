import { Component, Output, EventEmitter } from "@angular/core";
import { IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user-service/user.service";
import { NotifyStates } from "../../interfaces/notify.interface";

@Component({
    selector: 'app-add-form',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './add-issue.html',
    styleUrls: ['./add-issue.scss']
})

export class AddIssue {
    @Output() itemAdd = new EventEmitter<{ 
        creator: UserInterface, title: string, content?: string, type: IssueType, priority: IssuePriority, assigner: UserInterface 
    }>();

    @Output() note = new EventEmitter<{ message: string, state: NotifyStates }>();

    constructor(private service: UserService) { };

    isVisibleAdding: boolean = false;

    title: string = '';
    content?: string = '';
    type: IssueType = IssueType.BUG;
    priority: IssuePriority = IssuePriority.MEDIUM;
    assigner: UserInterface = { id: 0, name: '', password: '' };

    types = Object.values(IssueType);
    priorities = Object.values(IssuePriority);

    startAdding(): void {
        this.isVisibleAdding = true;
    }

    addIssue(): void {
        try {
            if (!this.title.trim())
                return;

            if (!this.service.currentUser.name.trim()) {
                console.log("Войдие в систему. Нельзя создавать задачу неавторизованным. ");
                this.isVisibleAdding = false;
                this.note.emit({
                    message: "Войдие в систему. Нельзя создавать задачу неавторизованным. ",
                    state: NotifyStates.ERROR,
                })
                return;
            }

            console.log(this.service.currentUser.name);
            this.itemAdd.emit({
                creator: this.service.currentUser,
                title: this.title.trim(),
                content: this.content?.trim() || '',
                type: this.type,
                priority: this.priority,
                assigner: this.assigner,
            });

            this.note.emit({
                message: "Задача добавлена.",
                state: NotifyStates.SUCCESS,
            })
            
            this.isVisibleAdding = false;
        }

        finally {
            this.title = '';
            this.content = '';
            this.type = IssueType.BUG;
            this.priority = IssuePriority.MEDIUM;
            this.assigner = { id: 0, name: '', password: '' };
        }
    }

    cancelAdding(): void {
        this.isVisibleAdding = false;

        this.title = '';
        this.content = '';
        this.type = IssueType.BUG;
        this.priority = IssuePriority.MEDIUM;
        this.assigner = { id: 0, name: '', password: '' };
    }
}
