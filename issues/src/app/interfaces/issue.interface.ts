export interface IssueInterface {
    id: number;
    title: string;
    content?: string;
    type: IssueType;
    priority: IssuePriority;
    opened: boolean;
}

export enum IssueType {
    BUG = "bug",
    FEATURE = 'feature',
    DOC = "documentation"
}

export enum IssuePriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
