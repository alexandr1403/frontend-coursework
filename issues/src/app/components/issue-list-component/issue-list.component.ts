import { Component } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { AddIssue } from "../add-issue-component/add-issue.component";
import { CommonModule } from "@angular/common";
import { IssueItem } from "../issue-item-component/issue-item.component";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [AddIssue, CommonModule, IssueItem],
    templateUrl: 'issue-list.html',
    styleUrls: ['issue-list.scss']
})

export class IssueList {
    issues: IssueInterface[] = [];

    addIssue(newIssue: { title: string, content?: string, type: IssueType, priority: IssuePriority }): void {
        const adding: Omit<IssueInterface, 'id'> = {
            ...newIssue
        }

        this.issues.push({
            ...adding,
            id: Date.now()
        });

        console.log(this.issues);
    }
}
