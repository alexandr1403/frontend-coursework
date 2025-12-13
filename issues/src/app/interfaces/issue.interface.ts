export interface IssueInterface {
    content: string;
    type: IssueType;
    priority: IssuePriority;
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
