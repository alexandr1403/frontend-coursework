import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { Observable } from 'rxjs';
import { NotifyInterface } from "../../interfaces/notify.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification.html',
    styleUrls: ['./notification.scss']
})

export class NotificationComponent implements OnInit {
    notification$?: Observable<NotifyInterface | null>;

    constructor(private notificationService: NotificationService) { };

    ngOnInit() {
        this.notification$ = this.notificationService.notification$;
    }
}
