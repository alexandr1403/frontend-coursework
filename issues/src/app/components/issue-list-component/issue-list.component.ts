import { Component, OnDestroy, OnInit } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { AddIssue } from "../add-issue-component/add-issue.component";
import { CommonModule } from "@angular/common";
import { IssueItem } from "../issue-item-component/issue-item.component";
import { UserInterface } from "../../interfaces/user.interface";
import { User } from "../user-item-component/user-item.component";
import { IssueService } from "../../services/issue.service";
import { UserService } from "../../services/user.service";
import { FormsModule } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [AddIssue, CommonModule, IssueItem, User, FormsModule],
    templateUrl: './issue-list.html',
    styleUrls: ['./issue-list.scss']
})

export class IssueList implements OnInit, OnDestroy {

    constructor(private service: IssueService, private userService: UserService) { };

    issues: IssueInterface[] = [];
    closed: IssueInterface[] = [];
    isOpened: boolean = true; // выводим открытые? (по умолчанию - да) 

    filterTag: IssueType | null = null;
    filterPriority: IssuePriority | null = null;

    filteredIssues: IssueInterface[] = [];

    tags = Object.values(IssueType);
    priors = Object.values(IssuePriority);
    subs: Subscription = new Subscription();

    isFiltered: boolean = false; // выводим отфильтрованные? 

    clearFilters(): void {
        this.filterTag = null;
        this.filterPriority = null;
        this.isFiltered = false;
    }

    detectChanges(): Observable<any> {
        if (this.tags !== null) {
            console.log("Сменилось tags");
            return of (this.filterTag);
        }
        if (this.priors !== null) {
            console.log("Сменилось priors");
            return of (this.filterPriority);
        }
        return of (null);
    }

    doFilter(): void {
        this.subs = this.detectChanges().subscribe(() => {
            this.applyFilters();
            console.log("Фильтры сработали? ");
            console.log(this.filteredIssues);
        })
    }

    filterByTag(filter: IssueType): void {
        switch(filter) {
            case IssueType.BUG: {
                this.filteredIssues = this.filteredIssues.filter(item => item.type === IssueType.BUG);
                break;
            }
            case IssueType.FEATURE: {
                this.filteredIssues = this.filteredIssues.filter(item => item.type === IssueType.FEATURE);
                break;
            }
            case IssueType.DOC: {
                this.filteredIssues = this.filteredIssues.filter(item => item.type === IssueType.DOC);
                break;
            }
        }
    }

    filterByPriority(filter: IssuePriority): void {
        switch(filter) {
            case IssuePriority.CRITICAL: {
                this.filteredIssues = this.filteredIssues.filter(item => item.priority === IssuePriority.CRITICAL);
                break;
            }
            case IssuePriority.HIGH: {
                this.filteredIssues = this.filteredIssues.filter(item => item.priority === IssuePriority.HIGH);
                break;
            }
            case IssuePriority.LOW: {
                this.filteredIssues = this.filteredIssues.filter(item => item.priority === IssuePriority.LOW);
                break;
            }
            case IssuePriority.MEDIUM: {
                this.filteredIssues = this.filteredIssues.filter(item => item.priority === IssuePriority.MEDIUM);
                break;
            }
        }
    }

    applyFilters(): void {
        this.updateIssues();
        if (this.filterTag !== null) {
            this.filterByTag(this.filterTag);
            this.isFiltered = true;
        }
        if (this.filterPriority !== null) {
            this.filterByPriority(this.filterPriority);
            this.isFiltered = true;
        }
    }

    cancelFilters(): void {
        this.isFiltered = false;
    }

    addIssue(newIssue: { creator: UserInterface, title: string, content?: string, type: IssueType, priority: IssuePriority, assigner: UserInterface }): void {
        const adding: Omit<IssueInterface, 'id'> = {
            ...newIssue,
            opened: true
        }

        console.log("Креэйтор: ", adding.creator.name);
        this.service.addIssue(adding);
        this.updateIssues();

        console.log(this.issues);
    }

    closeIssue(id: number): void {
        this.service.closeIssue(id);
        this.updateIssues();
    }

    assignYourself(id: number): void {
        console.log("текущий юзер: ", this.userService.currentUser.name, this.userService.currentUser.id);
        this.service.assign(id, this.userService.currentUser);
        this.updateIssues();
    }

    showClosed(): void {
        this.isOpened = false;
        this.isFiltered = false;
    }

    showOpened(): void {
        this.isOpened = true;
        this.isFiltered = false;
    }

    updateIssues(): void {
        this.issues = this.service.getIssues();
        this.closed = this.service.getClosed();
        this.filteredIssues = this.issues.concat(this.closed);
    }

    ngOnInit(): void {
        this.updateIssues();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
