import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { IssueInterface, IssuePriority, IssueType } from "../../interfaces/issue.interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from "@angular/material/dialog";

@Component({
    selector: 'app-edit-issue',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogActions],
    templateUrl: './edit-issue.html',
    styleUrls: ['./edit-issue.scss'],
})

export class EditIssue implements OnInit {
    @Output() update = new EventEmitter<{ id: number, updates: Partial<IssueInterface> }>();

    constructor(public dialogRef: MatDialogRef<EditIssue>, 
        @Inject(MAT_DIALOG_DATA) public data: { issue: IssueInterface }) { };
    
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
            title: this.data.issue.title,
            content: this.data.issue.content || '',
            type: this.data.issue.type,
            priority: this.data.issue.priority,
        }
        console.log(this.editData.title);
        // this.isEdditing = true;
    }

    saveEdit(): void {
        if (this.editData.title.trim())
        {
            this.dialogRef.close({
            id: this.data.issue.id,
            title: this.editData.title.trim(),
            content: this.editData.content,
            type: this.editData.type,
            priority: this.editData.priority,
        });
        }
        else {
            this.dialogRef.close({
                id: 0,
                title: '',
                content: '',
                type: this.editData.type,
                priority: this.editData.priority,
            });
        }
        this.isEdditing = false;
    }

    cancelEdit(): void {
        this.isEdditing = false;
        this.dialogRef.close({
            id: 0,
            title: '',
            content: '',
            type: this.editData.type,
            priority: this.editData.priority,
        });
    }
}
