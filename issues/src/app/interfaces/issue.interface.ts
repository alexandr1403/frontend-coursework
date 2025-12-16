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
    BUG = "bug",
    FEATURE = "feature",
    DOC = "documentation"
}

export enum IssuePriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "Срочно!"
}
