import { Epic } from "./epic";

export class EpicList {
        #epicMap: Map<string, Epic>

        constructor(epics: Array<Epic>) {
                const epicMap = new Map<string, Epic>();
                epics.forEach(epic => {
                        epicMap.set(epic.key, epic);
                });
        }

        get(key: string): Epic {
                return this.#epicMap.get(key);
        }

        add(epic: Epic) {
                this.#epicMap.set(epic.key, epic);
        }
}
