export class Alert {
    message: string
    type = AlertType.Success

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init)
    }
}

export enum AlertType {
    Success, Error, Info, Warning
}