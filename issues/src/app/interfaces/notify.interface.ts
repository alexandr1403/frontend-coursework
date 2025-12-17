export interface NotifyInterface {
    message: string;
    type: NotifyStates;
}

export enum NotifyStates {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}
