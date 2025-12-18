import { Injectable } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";
import { UserInterface } from "../../interfaces/user.interface";

@Injectable({
    providedIn: 'root',
})

export class IssueService {

    private readonly KEY = 'issue-list';
    private readonly CLOSED_KEY = 'closed-list';

    getIssues(): IssueInterface[] {
        const issues = localStorage.getItem(this.KEY);
        return (issues)? JSON.parse(issues) : [];
    }

    saveIssues(issues: IssueInterface[]): void {
        localStorage.setItem(this.KEY, JSON.stringify(issues));
    }

    addIssue(adding: Omit<IssueInterface, 'id'>): void {
        const issues = this.getIssues();
        issues.push({
            ...adding,
            id: Date.now()
        });

        this.saveIssues(issues);
    }

    getClosed(): IssueInterface[] {
        const closed = localStorage.getItem(this.CLOSED_KEY);
        return (closed)? JSON.parse(closed) : [];
    }

    setClosed(issues: IssueInterface[]): void {
        localStorage.setItem(this.CLOSED_KEY, JSON.stringify(issues));
    }

    closeIssue(id: number): void {
        let issues = this.getIssues();
        const closed = this.getClosed();
        const item = issues.find(item => item.id === id);

        if (item) {
            item.opened = false;
            closed.push(item);
            this.setClosed(closed);
        }

        issues = issues.filter(item => item.id !== id);
        this.saveIssues(issues);
    }

    assign(id: number, user: UserInterface): boolean {
        const issues = this.getIssues();
        const item = issues.find(item => item.id === id);
        console.log("Юзер айди: ", user.id);
        if (item && user.id > 0) {
            item.assigner = user;
            console.log(item.assigner);
            this.saveIssues(issues);
            return true;
        }
        else {
            console.log("Войдите в систему. Нельзя брать задачу без регистрации. "); 
            return false;
        }
    }

    delete(id: number): void {
        let issues = this.getIssues();
        let closed = this.getClosed();

        issues = issues.filter(item => item.id !== id);
        closed = closed.filter(item => item.id !== id);
        this.saveIssues(issues);
        this.setClosed(closed);
    }
}
