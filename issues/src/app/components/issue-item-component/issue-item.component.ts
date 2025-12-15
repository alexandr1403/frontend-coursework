import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";
import { MatCardModule } from "@angular/material/card";
import { UserInterface } from "../../interfaces/user.interface";

@Component({
    selector: 'app-issue-item',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: 'issue-item.html',
    styleUrls: ['issue-item.scss']
})

export class IssueItem {
    @Input() issue!: IssueInterface;
    @Output() close = new EventEmitter<number>();
    @Output() assign = new EventEmitter<number>();

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
