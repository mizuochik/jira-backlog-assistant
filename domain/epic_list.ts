import { Epic } from "./epic";

export class EpicList {
        epicMap: Map<string, Epic>

        constructor() {
                this.epicMap = new Map<string, Epic>();
        }

        get(key: string): Epic {
                return this.epicMap.get(key);
        }

        add(epic: Epic) {
                this.epicMap.set(epic.key, epic);
        }
}
