import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions} from "@angular/material/dialog";
import { IssueInterface } from "../../interfaces/issue.interface";

@Component ({
    selector: 'app-dialog',
    standalone: true,
    imports: [MatDialogActions, MatDialogContent],
    templateUrl: './dialog-issue.html',
    styleUrls: ['./dialog-issue.scss']
})
export class DialogComponent {

    constructor(public dialogRef: MatDialogRef<DialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { 
            issue: IssueInterface  }) { } 

    closeDialog(): void {
        this.dialogRef.close('Диалог закрыт. ');

        console.log(this.data.issue.title);
    }
}
