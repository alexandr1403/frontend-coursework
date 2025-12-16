import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions} from "@angular/material/dialog";
import { IssueInterface } from "../../interfaces/issue.interface";
import { FormsModule } from "@angular/forms";
import { CommentService } from "../../services/comment.service";

@Component ({
    selector: 'app-dialog',
    standalone: true,
    imports: [MatDialogActions, MatDialogContent, FormsModule],
    templateUrl: './comment-item.html',
    styleUrls: ['./comment-item.scss']
})
export class CommentComponent implements OnInit {

    comment: string = '';
    history: string[] = [];

    constructor(public dialogRef: MatDialogRef<CommentComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { issue: IssueInterface  }, 
        private service: CommentService) { } 

    ngOnInit(): void {
        this.updateHistory();
    }

    closeDialog(): void {
        this.dialogRef.close('Диалог закрыт. ');

        console.log(this.data.issue.title);
    }

    commentIssue(): void {
        const time = new Date().toISOString();
        if (this.comment !== '') {
            this.service.saveHistory(this.data.issue.id, time, this.data.issue.assigner.name, this.comment);
            console.log("Комментарий оставлен: ", this.comment);
            this.updateHistory();
        }
        else
            console.log("Введите что-нибудь. ");

        this.comment = '';
    }

    updateHistory(): void {
        this.history = this.service.getHistory(this.data.issue.id);
    }
    
}
