import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions} from "@angular/material/dialog";
import { IssueInterface } from "../../interfaces/issue.interface";
import { FormsModule } from "@angular/forms";
import { CommentService } from "../../services/comment.service";
import { UserService } from "../../services/user.service";
import { CommentComponent } from "../comment-item-component/comment-item.component";

@Component ({
    selector: 'app-dialog',
    standalone: true,
    imports: [MatDialogActions, MatDialogContent, FormsModule, CommentComponent],
    templateUrl: './comment-list.html',
    styleUrls: ['./comment-list.scss']
})
export class CommentList implements OnInit {

    comment: string = '';
    history: string[] = [];

    constructor(public dialogRef: MatDialogRef<CommentList>, 
        @Inject(MAT_DIALOG_DATA) public data: { issue: IssueInterface  }, 
        private service: CommentService, private userService: UserService) { } 

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
            // косяк - комментарий оставляет не обязательно assigner. 
            // this.service.saveHistory(this.data.issue.id, time, this.data.issue.assigner.name, this.comment); 
            console.log("Текущий пользователь", this.userService.currentUser.name);
            this.service.saveHistory(this.data.issue.id, time, this.userService.currentUser.name, this.comment); 
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
