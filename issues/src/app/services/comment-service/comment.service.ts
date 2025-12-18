import { Injectable } from "@angular/core";
import { WhatUserDone } from "../../interfaces/activity.interface";

@Injectable({
    providedIn: 'root',
})

export class CommentService {

    setValue(date: string, time: string, assignerName: string, comment: string): string {
        const value = date + " в " + time +  " пользователь " + assignerName + 
        " оставил комментарий: " + "\"" + comment + "\"";

        if (comment !== '' && assignerName !== '')
            return value;

        return '';
    }

    getHistory(key: number): string[] {
        const history = localStorage.getItem(key.toString());
        return history? JSON.parse(history): [];
    }

    saveHistory(key: number, date: string, time: string, assignerName: string, comment: string): void {
        const history = this.getHistory(key);
        const value = this.setValue(date, time, assignerName, comment);
        if (value != '')
            history.push(value);
        localStorage.setItem(key.toString(), JSON.stringify(history));
    }

    addEvent(key: number, whatDo: WhatUserDone, userName: string): void {
        const history = this.getHistory(key);
        let activity = '';
        if (whatDo == WhatUserDone.REOPEN) 
            activity = WhatUserDone.REOPEN
        else 
            activity = (whatDo === WhatUserDone.ASSIGN)? WhatUserDone.ASSIGN : WhatUserDone.CLOSE; 

        const value = "Пользователь " + userName + " " + activity;

        if (userName !== '') {
            history.push(value);
        }

        localStorage.setItem(key.toString(), JSON.stringify(history));
    }
}
