import { UserInterface } from "./user.interface";

export interface IssueInterface {
    id: number;
    creator: UserInterface;
    title: string;
    content?: string;
    type: IssueType;
    priority: IssuePriority;
    opened: boolean;
    assigner: UserInterface;
}

export enum IssueType {
    BUG = "баг",
    FEATURE = "новая функция",
    DOC = "документация"
}

export enum IssuePriority {
    LOW = "низкий",
    MEDIUM = "средний",
    HIGH = "высокий",
    CRITICAL = "Срочно!"
}
