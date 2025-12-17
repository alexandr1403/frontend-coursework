import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { NotifyInterface } from "../interfaces/notify.interface";

@Injectable({ 
    providedIn: 'root' 
})

export class NotificationService {
    private notificationSubject = new Subject<NotifyInterface | null>();
    notification$ = this.notificationSubject.asObservable(); // Экспортируем как Observable

    show(data: NotifyInterface) {
        this.notificationSubject.next(data);
    }

    hide() {
        this.notificationSubject.next(null);
    }
}
