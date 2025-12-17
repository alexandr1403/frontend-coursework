import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { Observable } from 'rxjs';
import { NotifyInterface } from "../../interfaces/notify.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `<div *ngIf="notification$ | async as notification" [class]="notification.type">
                {{ notification.message }}
                </div>`,
    styles: [`
        div { padding: 10px; border-radius: 5px; }
        .success { background-color: lightgreen; }
        .error { background-color: salmon; }
        .info { background-color: lightblue; }
    `]
})
export class NotificationComponent implements OnInit {
    notification$?: Observable<NotifyInterface | null>;

    constructor(private notificationService: NotificationService) { };

    ngOnInit() {
        this.notification$ = this.notificationService.notification$;
    }
}
