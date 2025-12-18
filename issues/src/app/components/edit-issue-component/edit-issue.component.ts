import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-edit-issue',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-issue.html',
    styleUrls: ['./edit-issue.scss'],
})

export class EditIssue implements OnInit {
    @Input() issue!: IssueInterface;
    @Output() update = new EventEmitter<{ id: number, updates: Partial<IssueInterface> }>();
    
    editData = {
        title: '',
        content: '',
        type: IssueType.BUG,
        priority: IssuePriority.CRITICAL,
    }

    isEdditing: boolean = true;

    types = Object.values(IssueType);
    priors = Object.values(IssuePriority);

    ngOnInit(): void {
        this.editData = {
            title: this.issue.title,
            content: this.issue.content || '',
            type: this.issue.type,
            priority: this.issue.priority,
        }
        console.log(this.editData.title);
        // this.isEdditing = true;
    }

    saveEdit(): void {
        if (this.editData.title.trim())
        {
            this.update.emit({
                id: this.issue.id,
                updates: {
                    title: this.editData.title.trim(),
                    content: this.editData.content,
                    type: this.editData.type,
                    priority: this.editData.priority,
                }
            })
        }
        this.isEdditing = false;
    }

    cancelEdit(): void {
        this.isEdditing = false;
    }
}
