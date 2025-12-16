import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { CommentList } from "../comment-list-component/comment-list.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-issue-item',
    standalone: true,
    imports: [MatCardModule, CommonModule],
    templateUrl: './issue-item.html',
    styleUrls: ['./issue-item.scss']
})

export class IssueItem {
    @Input() issue!: IssueInterface;
    @Output() close = new EventEmitter<number>();
    @Output() assign = new EventEmitter<number>();

    constructor(private dialog: MatDialog) { } 

    openIssueDialog(): void {
        this.dialog.open(CommentList, { data: { issue: this.issue } });
    }

    showIssue(): void {
        console.log(this.issue);
    }

    closeIssue(): void {
        this.issue.opened = false;
        this.close.emit(this.issue.id);
    }

    assignYourself(): void {
        this.assign.emit(this.issue.id);
        console.log("Информация о вашем действии успешно передана в компонент задач. ");
    }
}
