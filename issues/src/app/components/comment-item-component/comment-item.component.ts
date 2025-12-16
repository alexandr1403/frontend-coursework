import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-comment-item',
    standalone: true,
    imports: [],
    templateUrl: './comment-item.html',
    styleUrls: ['./comment-item.scss']
})

export class CommentComponent {
    @Input() comment!: string;
}
