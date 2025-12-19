import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { CommentList } from "../comment-list-component/comment-list.component";
import { CommonModule } from "@angular/common";
import { NotifyStates } from "../../interfaces/notify.interface";
import { EditIssue } from "../edit-issue-component/edit-issue.component";
import { UserService } from "../../services/user-service/user.service";

@Component({
    selector: 'app-issue-item',
    standalone: true,
    imports: [MatCardModule, CommonModule],
    templateUrl: './issue-item.html',
    styleUrls: ['./issue-item.scss']
})

export class IssueItem {
    /**
     * Тест падает без явной инициализации перед передачей данных. 
     */
    @Input() issue: IssueInterface = {
        id: 0,
        creator: { id: 0, name: '', password: '' }, 
        title: '',
        content: '',
        type: IssueType.BUG,
        priority: IssuePriority.CRITICAL,
        opened: true,
        assigner: { id: 170000, name: 'alex', password: '' },
    };

    @Output() close = new EventEmitter<number>();
    @Output() assign = new EventEmitter<number>();
    @Output() note = new EventEmitter<{ message: string, state: NotifyStates }>();
    @Output() delete = new EventEmitter<number>();
    @Output() reopen = new EventEmitter<number>();
    @Output() update = new EventEmitter<{ isSame: boolean, id: number, updates: Partial<IssueInterface> }>();

    constructor(private dialog: MatDialog, private service: UserService) { };

    isEdditing: boolean = false;
    isSame: boolean = false; // совпадет ли название задачи после редактирования с названием до? 

    openIssueDialog(): void {
        this.dialog.open(CommentList, { data: { issue: this.issue } });
        console.log("Открыта задача: ", this.issue, " Создатель: ", this.issue.creator);
        console.log(this.issue.creator.name.localeCompare("alex"));
    }

    showIssue(): void {
        console.log(this.issue);
    }

    closeIssue(): void {
        // this.issue.opened = false;
        this.close.emit(this.issue.id);
    }

    assignYourself(): void {
        this.assign.emit(this.issue.id);
        console.log("Информация о вашем действии успешно передана в компонент задач. ");
    }

    deleteIssue(): void {
        this.delete.emit(this.issue.id);
        console.log("Удаление задачи... ");
    }

    reOpenIssue(): void {
        // this.issue.opened = true;
        this.reopen.emit(this.issue.id);
    }

    startEdit(): void {
        if (!this.service.currentUser.name.trim()) {
            // "настучать" родителю, что пользователь бедокурит 
            this.note.emit({
                message: "Работать с задачей могут только зарегистрированные пользователи.",
                state: NotifyStates.ERROR,
            });
            return;
        }
        this.isEdditing = true;
        const dialogRef = this.dialog.open(EditIssue, { data: { issue: this.issue } });

        dialogRef.afterClosed().subscribe((result) => {
            this.isSame = (result.title.localeCompare(this.issue.title) === 0)? true : false;
            this.update.emit({
                    isSame: this.isSame,
                    id: result.id,
                    updates: {
                        title: result.title,
                        content: result.content,
                        type: result.type,
                        priority: result.priority,
                    }
                });
            }
        );
    }
}
