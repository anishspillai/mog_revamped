export class Menuitem {
    label?: string
    childItems? : Menuitem[]
    url?: string

    constructor(label: string) {
        this.label = label;
    }
}

