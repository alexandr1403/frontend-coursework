import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class CommentService {

    setValue(date: string, assignerName: string, comment: string): string {
        const value = "В " + date + " пользователь " + assignerName + " оставил комментарий: " + "\"" + comment + "\"";
        if (comment !== '' && assignerName !== '')
            return value;

        return '';
    }

    getHistory(key: number): string[] {
        const history = localStorage.getItem(key.toString());
        return history? JSON.parse(history): [];
    }

    saveHistory(key: number, date: string, assignerName: string, comment: string): void {
        const history = this.getHistory(key);
        const value = this.setValue(date, assignerName, comment);
        if (value != '')
            history.push(value);
        localStorage.setItem(key.toString(), JSON.stringify(history));
    }
}
