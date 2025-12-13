import { Component, Input } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";

@Component({
    selector: 'app-issue-item',
    standalone: true,
    imports: [],
    templateUrl: 'issue-item.html',
    styleUrls: ['issue-item.scss']
})

export class IssueItem {
    @Input() issue!: IssueInterface;
}
