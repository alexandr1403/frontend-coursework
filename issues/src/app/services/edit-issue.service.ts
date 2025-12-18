import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IssueInterface, IssuePriority, IssueType } from "../interfaces/issue.interface";

@Injectable({
    providedIn: 'root',
})

export class EditService {

    id: number = 0;
    updates: Partial<IssueInterface> = {
        title: '',
        content: '',
        type: IssueType.BUG,
        priority: IssuePriority.MEDIUM,
    };

    serviceInit(id: number, updates: Partial<IssueInterface>): void {
        this.id = id;
        this.updates.title = updates.title;
        this.updates.content = updates.content;
        this.updates.type = updates.type;
        this.updates.priority = updates.priority;
    }

    update(): Observable<{ id: number, updates: Partial<IssueInterface> }> {
        if(!this.updates.title?.trim()) {
            return of ({
                id: 0, updates: {
                    title: '',
                    content: '',
                    type: IssueType.BUG,
                    priority: IssuePriority.MEDIUM,
                }
            });
        }

        return of ({
            id: this.id, updates: {
                title: this.updates.title,
                content: this.updates.content,
                type: this.updates.type,
                priority: this.updates.priority,
            }
        });
    }
}
