import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class CommentService {

    setValue(date: number, assignerName: string, comment: string): string {
        const value = "В " + date.toString() + " пользователь " + assignerName + " оставил клмментарий " + comment;
        if (comment !== '')
            return value;

        return '';
    }

    getHistory(): string[] {
        return [];
    }

    saveHistory(key: number, date: number, assignerName: string, comment: string): void {
        const value = this.setValue(date, assignerName, comment);
        localStorage.setItem(key.toString(), value);
    }
}
