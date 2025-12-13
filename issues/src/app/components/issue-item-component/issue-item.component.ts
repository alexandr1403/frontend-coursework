import { Component, Input } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: 'app-issue-item',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: 'issue-item.html',
    styleUrls: ['issue-item.scss']
})

export class IssueItem {
    @Input() issue!: IssueInterface;

    showIssue(): void {
        console.log(this.issue);
    }
}
