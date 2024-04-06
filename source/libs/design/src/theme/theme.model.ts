import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

@injectable()
export class ThemeModel {
    @observable colorMode: 'light' | 'dark' = 'light'

    constructor() {
        makeObservable(this)
    }

    setColorMode(colorMode: 'light' | 'dark') {
        this.colorMode = colorMode
    }
}