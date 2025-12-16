import { Component } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { AddIssue } from "../add-issue-component/add-issue.component";
import { CommonModule } from "@angular/common";
import { IssueItem } from "../issue-item-component/issue-item.component";
import { UserInterface } from "../../interfaces/user.interface";
import { User } from "../user-item-component/user-item.component";

@Component({
    selector: 'app-issue-list',
    standalone: true,
    imports: [AddIssue, CommonModule, IssueItem, User],
    templateUrl: './issue-list.html',
    styleUrls: ['./issue-list.scss']
})

export class IssueList {

    issues: IssueInterface[] = [];
    closed: IssueInterface[] = [];
    isOpened: boolean = true; // выводим открытые? (по умолчанию - да) 

    user: UserInterface = { id: 0, name: '', password: '' }; // user - общий на всю программу (хз как это оптимально сделать) 

    initUser(us: {id: number, name: string, password: string}): void {
        this.user.id = us.id;
        this.user.name = us.name;
        this.user.password = us.password;

        console.log("Информация о вашем входе в систему успешно передана в компонент задач. ");
    }

    addIssue(newIssue: { title: string, content?: string, type: IssueType, priority: IssuePriority, assigner: UserInterface }): void {
        const adding: Omit<IssueInterface, 'id'> = {
            ...newIssue,
            opened: true
        }

        this.issues.push({
            ...adding,
            id: Date.now()
        });

        console.log(this.issues);
    }

    closeIssue(id: number): void {
        const item = this.issues.find(item => item.id === id)
        if (item)
            this.closed.push(item);

        this.issues = this.issues.filter(item => item.id !== id);
    }

    assignYourself(id: number): void {
        const item = this.issues.find(item => item.id === id)
        if (item && this.user.id > 0)
            item.assigner = this.user;
        else
            console.log("Войдите в систему. Нельзя брать задачу без регистрации. "); 

        console.log(item?.assigner);
    }

    showClosed(): void {
        this.isOpened = false;
        // this.closed = this.issues.filter(item => item.opened == false);
    }

    showOpened(): void {
        this.isOpened = true;
    }
}
