import { EpicList } from './epic_list';

export class BacklogItem {
        key: string;
        name: string;
        epicKey: string;

        constructor(key: string, name: string, epicKey: string) {
                this.key = key;
                this.name = name;
                this.epicKey = epicKey;
        }

        comparePriorityByEpic(other: BacklogItem, epicList: EpicList): number {
                if (!this.epicKey || !other.epicKey) {
                        return 0;
                }
                const thisEpic = epicList.get(this.epicKey);
                const otherEpic = epicList.get(other.epicKey);
                return thisEpic.comparePriority(otherEpic);
        }
}
