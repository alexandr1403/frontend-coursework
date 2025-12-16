import { Component, OnInit } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { AddIssue } from "../add-issue-component/add-issue.component";
import { CommonModule } from "@angular/common";
import { IssueItem } from "../issue-item-component/issue-item.component";
import { UserInterface } from "../../interfaces/user.interface";
import { User } from "../user-item-component/user-item.component";
import { IssueService } from "../../services/issue.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [AddIssue, CommonModule, IssueItem, User],
    templateUrl: './issue-list.html',
    styleUrls: ['./issue-list.scss']
})

export class IssueList implements OnInit {

    constructor(private service: IssueService, private userService: UserService) { };

    issues: IssueInterface[] = [];
    closed: IssueInterface[] = [];
    isOpened: boolean = true; // выводим открытые? (по умолчанию - да) 

    addIssue(newIssue: { title: string, content?: string, type: IssueType, priority: IssuePriority, assigner: UserInterface }): void {
        const adding: Omit<IssueInterface, 'id'> = {
            ...newIssue,
            opened: true
        }

        this.service.addIssue(adding);
        this.updateIssues();

        console.log(this.issues);
    }

    closeIssue(id: number): void {
        this.service.closeIssue(id);
        this.updateIssues();
    }

    assignYourself(id: number): void {
        this.service.assign(id, this.userService.currentUser);
        this.updateIssues();
    }

    showClosed(): void {
        this.isOpened = false;
        // this.closed = this.issues.filter(item => item.opened == false);
    }

    showOpened(): void {
        this.isOpened = true;
    }

    updateIssues(): void {
        this.issues = this.service.getIssues();
        this.closed = this.service.getClosed();
    }

    ngOnInit(): void {
        this.updateIssues();
    }
}
