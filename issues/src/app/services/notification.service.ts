import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { NotifyInterface } from "../interfaces/notify.interface";

@Injectable({ 
    providedIn: 'root' 
})

export class NotificationService {
  private _notificationSubject = new Subject<NotifyInterface | null>();
  notification$ = this._notificationSubject.asObservable(); // Экспортируем как Observable

  show(data: NotifyInterface) {
    this._notificationSubject.next(data);
  }

  hide() {
    this._notificationSubject.next(null);
  }
}
