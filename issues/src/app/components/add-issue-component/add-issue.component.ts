import { Component, Output, EventEmitter } from "@angular/core";
import { IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-add-form',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: 'add-issue.html',
    styleUrls: ['add-issue.scss']
})

export class AddIssue {
    @Output() itemAdd = new EventEmitter<{ title: string, content?: string, type: IssueType, priority: IssuePriority }>();

    isVisibleAdding: boolean = false;

    title: string = '';
    content?: string = '';
    type: IssueType = IssueType.BUG;
    priority: IssuePriority = IssuePriority.MEDIUM;

    types = Object.values(IssueType);
    priorities = Object.values(IssuePriority);

    startAdding(): void {
        this.isVisibleAdding = true;
    }

    addIssue(): void {
        if (!this.title.trim())
            return;

        this.itemAdd.emit({
            title: this.title.trim(),
            content: this.content?.trim() || '',
            type: this.type,
            priority: this.priority,
        })

        this.title = '';
        this.content = '';
        this.type = IssueType.BUG;
        this.priority = IssuePriority.MEDIUM;

        this.isVisibleAdding = false;
    }
}
