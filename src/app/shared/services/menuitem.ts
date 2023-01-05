export class Menuitem {
    label?: string
    childItems? : Menuitem[]
    url?: string
    childItemsForDesktop? : Map<number, Menuitem[]>


    constructor(label: string) {
        this.label = label;
    }
}

