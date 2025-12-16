import { Injectable } from "@angular/core";
import { IssueInterface } from "../interfaces/issue.interface";

@Injectable({
    providedIn: 'root',
})

export class IssueService {

    private readonly KEY = 'issue-list';

    getIssues(): IssueInterface[] {
        const issues = localStorage.getItem(this.KEY);
        return (issues)? JSON.parse(issues) : [];
    }

    saveIssues(issue: IssueInterface): void {
        const issues = this.getIssues();
        issues.push(issue);
        localStorage.setItem(this.KEY, JSON.stringify(issues));
    }
}
