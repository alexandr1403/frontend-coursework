import { Component, OnDestroy, OnInit } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { AddIssue } from "../add-issue-component/add-issue.component";
import { CommonModule } from "@angular/common";
import { IssueItem } from "../issue-item-component/issue-item.component";
import { UserInterface } from "../../interfaces/user.interface";
import { User } from "../user-item-component/user-item.component";
import { IssueService } from "../../services/issue-service/issue.service";
import { UserService } from "../../services/user-service/user.service";
import { FormsModule } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";
import { NotificationComponent } from "../notification-component/notification.component";
import { NotificationService } from "../../services/notify-service/notification.service";
import { NotifyInterface, NotifyStates } from "../../interfaces/notify.interface";
import { MatList, MatListItem } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { CommentService } from "../../services/comment-service/comment.service";
import { WhatUserDone } from "../../interfaces/activity.interface";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [MatButton, AddIssue, CommonModule, IssueItem, User, FormsModule, NotificationComponent, MatList, MatListItem],
    templateUrl: './issue-list.html',
    styleUrls: ['./issue-list.scss']
})

export class IssueList implements OnInit, OnDestroy {

    constructor(private service: IssueService, 
        private userService: UserService, 
        private notifyService: NotificationService,
        private commentService: CommentService) { };

    issues: IssueInterface[] = [];
    closed: IssueInterface[] = [];
    isOpened: boolean = true; // выводим открытые? (по умолчанию - да) 

    filterTag: IssueType | null = null;
    filterPriority: IssuePriority | null = null;
    filterCreator: string | null = null;
    filterAssigner: string | null = null;

    filteredIssues: IssueInterface[] = [];

    tags = Object.values(IssueType);
    priors = Object.values(IssuePriority);
    subs: Subscription = new Subscription();

    isFiltered: boolean = false; // выводим отфильтрованные? 

    users: string[] = []; // имена зарегистрированных пользователей 

    clearFilters(): void {
        this.filterTag = null;
        this.filterPriority = null;
        this.filterCreator = null;
        this.filterAssigner = null;
        
        this.isFiltered = false;
        console.log("Фильтры сброшены.");
    }

    infoFilters(): void {
        this.showToast({
            message: "Фильтры сброшены.",
            state: NotifyStates.INFO,
        })
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
        if (this.filterCreator !== null) {
            this.filterByCreator(this.filterCreator);
            this.isFiltered = true;
        }
        if (this.filterAssigner !== null) {
            this.filterByAssigner(this.filterAssigner);
            this.isFiltered = true;
        }
    }

    filterByCreator(filterCreator: string) {
        console.log("По создателю");
        this.filteredIssues = this.filteredIssues.filter(item => 
                item.creator.name.localeCompare(filterCreator) === 0
        );
    }

    filterByAssigner(filterAssigner: string) {
        console.log("По исполнителю");
        this.filteredIssues = this.filteredIssues.filter(item => 
                item.assigner.name.localeCompare(filterAssigner) === 0
        );
    }

    addIssue(newIssue: { creator: UserInterface, title: string, content?: string, type: IssueType, priority: IssuePriority, assigner: UserInterface }): void {
        const adding: Omit<IssueInterface, 'id'> = {
            ...newIssue,
            opened: true
        }

        console.log("Креэйтор: ", adding.creator.name);
        let is = this.service.addIssue(adding);
        if (is) {
            this.showToast({
                message: "Задача добавлена.",
                state: NotifyStates.SUCCESS,
            });
            this.updateIssues();
            this.clearFilters();
        }
        else {
            this.showToast({
                message: "Такая задача уже добавлена.",
                state: NotifyStates.INFO,
            });
        }

        console.log(this.issues);
    }

    addUser(us: { id: number, name: string, password: string }): void {
        this.users.push(us.name);
    }

    closeIssue(id: number): void {
        if (!this.userService.currentUser.name.trim()) {
            this.showToast({
                message: "Войдите, прежде чем работать с задачей.",
                state: NotifyStates.ERROR,
            });
            return;
        }
        else {
            this.showToast({
                message: "Задача закрыта. ",
                state: NotifyStates.SUCCESS,
            });

            this.service.closeIssue(id);
            this.commentService.addEvent(id, WhatUserDone.CLOSE, this.userService.currentUser.name);
            this.updateIssues();
        }
    }

    assignYourself(id: number): void {
        console.log("текущий юзер: ", this.userService.currentUser.name, this.userService.currentUser.id);
        let is = this.service.assign(id, this.userService.currentUser);
        this.applyFilters();
        if (is) {
            this.showToast({
                message: "Задача взята. ",
                state: NotifyStates.SUCCESS,
            });
            this.commentService.addEvent(id, WhatUserDone.ASSIGN, this.userService.currentUser.name);
        }
        else {
            this.showToast({
                message: "Нельзя брать задачу без регистрации.",
                state: NotifyStates.ERROR,
            });
        }
    }

    showClosed(): void {
        this.isOpened = false;
        this.clearFilters();
    }

    showOpened(): void {
        this.isOpened = true;
        this.clearFilters();
    }

    updateIssues(): void {
        this.issues = this.service.getIssues();
        this.closed = this.service.getClosed();
        this.filteredIssues = this.issues.concat(this.closed);
    }

    ngOnInit(): void {
        this.updateIssues();
        this.users = this.userService.getUsers();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    showToast(note: NotifyInterface) {
        this.notifyService.show(note);
        // Скрыть через 2 секунды
        setTimeout(() => this.notifyService.hide(), 2000);
    }

    /**
     * Очистка бардака в localstorage
     */
    cleaner(): void {
        this.userService.cleaner();
        console.log("Хранилище очищено. ");

        this.issues = [];
        this.closed = [];
        this.filteredIssues = [];
    }

    deleteIssue(id: number): void {
        let is = this.service.delete(id, this.userService.currentUser.name);
        console.log(is);

        if (is) {
            this.showToast({
                message: "Задача удалена",
                state: NotifyStates.INFO,
            });
            this.updateIssues();
            this.clearFilters();
        }
        else {
            this.showToast({
                message: "Удалять задачу может только её исполнитель.",
                state: NotifyStates.ERROR,
            });
        }
    }

    reOpen(id: number): void {
        if (!this.userService.currentUser.name.trim()) {
            console.log("Я зашёл сюдыа!");
            this.showToast({
                message: "Войдите, прежде чем работать с задачей.",
                state: NotifyStates.ERROR,
            });
            return;
        }
        else {
            this.showToast({
                message: "Задача открыта",
                state: NotifyStates.SUCCESS,
            });
            this.service.reOpen(id);
            this.commentService.addEvent(id, WhatUserDone.REOPEN, this.userService.currentUser.name);
            this.updateIssues();
        }  
    }
}
