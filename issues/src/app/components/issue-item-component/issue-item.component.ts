import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { CommentList } from "../comment-list-component/comment-list.component";
import { CommonModule } from "@angular/common";
import { NotifyStates } from "../../interfaces/notify.interface";

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

    constructor(private dialog: MatDialog) { } 

    openIssueDialog(): void {
        this.dialog.open(CommentList, { data: { issue: this.issue } });
        console.log("Открыта задача: ", this.issue, " Создатель: ", this.issue.creator);
        console.log(this.issue.creator.name.localeCompare("alex"));
    }

    showIssue(): void {
        console.log(this.issue);
    }

    closeIssue(): void {
        this.issue.opened = false;
        this.close.emit(this.issue.id);
        this.note.emit({
            message: "Задача закрыта. ",
            state: NotifyStates.SUCCESS,
        });
    }

    assignYourself(): void {
        this.assign.emit(this.issue.id);
        console.log("Информация о вашем действии успешно передана в компонент задач. ");
    }

    deleteIssue(): void {
        this.delete.emit(this.issue.id);
        console.log("Удаление задачи... ");
        this.note.emit({
            message: "Задача удалена",
            state: NotifyStates.ERROR,
        })
    }
}
