import { Component } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [],
    templateUrl: 'issue-list.html',
    styleUrls: ['issue-list.scss']
})

export class IssueList {
    issues: IssueInterface[] = [];
    
}
