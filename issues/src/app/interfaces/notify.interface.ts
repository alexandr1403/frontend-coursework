export interface NotifyInterface {
    message: string;
    state: NotifyStates;
}

export enum NotifyStates {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}
