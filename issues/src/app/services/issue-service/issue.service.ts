import { Injectable } from "@angular/core";
import { IssueInterface } from "../../interfaces/issue.interface";
import { UserInterface } from "../../interfaces/user.interface";
import { DeclareFunctionStmt } from "@angular/compiler";

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

    addIssue(adding: Omit<IssueInterface, 'id'>): boolean {
        const issues = this.getIssues();
        const closed = this.getClosed();
        const itOpen = issues.find(item => item.title.localeCompare(adding.title) === 0);
        const itClose = closed.find(item => item.title.localeCompare(adding.title) === 0);
        if (itOpen || itClose) {
            console.log("Такая задача уже есть.");
            return false;
        }
        issues.push({
            ...adding,
            id: Date.now()
        });

        this.saveIssues(issues);
        return true;
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

    delete(id: number, currentUser: string): boolean {
        if (currentUser === '')
            return false;

        let issues = this.getIssues();
        let closed = this.getClosed();
        const delIssue = issues.find(item => item.id === id);
        const delClosed = closed.find(item => item.id === id);

        let res = false;
        try {
            if (delIssue || delClosed) {
                if (delIssue) {
                    if (currentUser.localeCompare(delIssue.assigner.name) === 0) {
                        issues = issues.filter(item => item.id !== id);
                        res = true;
                    }
                }
                if (delClosed) {
                    if (currentUser.localeCompare(delClosed.assigner.name) === 0) {
                        closed = closed.filter(item => item.id !== id);
                        res = true;
                    }
                }
                return res;
            }
            else {
                console.log("Удалять задачу может только её исполнитель.");
                return false;
            }
        } 
        finally {
            this.saveIssues(issues);
            this.setClosed(closed);
        }
    }

    reOpen(id: number): void {
        const issues = this.getIssues();
        let closed = this.getClosed();
        const item = closed.find(item => item.id === id);

        if (item) {
            item.opened = true;
            issues.push(item);
            this.saveIssues(issues);
        }

        closed = closed.filter(item => item.id !== id);
        this.setClosed(closed);
    }

    updateIssue(id: number, updates: Partial<IssueInterface>): void {
        const issues = this.getIssues();
        const index = issues.findIndex(item => item.id === id);
        // console.log(items, index);
        // console.log(updates.name);

        if (index !== -1)
        {
            issues[index] = { ...issues[index], ...updates };
            console.log('updated title: ', updates.title);
            console.log('name of edit issue: ', issues[index].title);
            this.saveIssues(issues);
        }
    }
}
