import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions} from "@angular/material/dialog";
import { IssueInterface } from "../../interfaces/issue.interface";
import { FormsModule } from "@angular/forms";
import { CommentService } from "../../services/comment.service";

@Component ({
    selector: 'app-dialog',
    standalone: true,
    imports: [MatDialogActions, MatDialogContent, FormsModule],
    templateUrl: './dialog-issue.html',
    styleUrls: ['./dialog-issue.scss']
})
export class DialogComponent {

    comment: string = '';

    constructor(public dialogRef: MatDialogRef<DialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { 
            issue: IssueInterface  }, private service: CommentService) { } 

    closeDialog(): void {
        this.dialogRef.close('Диалог закрыт. ');

        console.log(this.data.issue.title);
    }

    commentIssue(): void {
        const time = Date.now();
        this.service.saveHistory(this.data.issue.id, time, this.data.issue.assigner.name, this.comment);
        console.log("Комментарий оставлен: ", this.comment);
    }
}
