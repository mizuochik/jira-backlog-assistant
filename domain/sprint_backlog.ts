import { BacklogItem } from './backlog_item';
import { EpicList } from './epic_list';

export class SprintBacklog {
        id: string;
        boardId: string;
        backlogItems: BacklogItem[];

        constructor(id: string, boardId: string) {
                this.id = id;
                this.boardId = boardId;
                this.backlogItems = [];
        }

        addBacklogItem(backlogItem: BacklogItem) {
                this.backlogItems.push(backlogItem);
        }

        sortBacklogItemsByEpic(epicList: EpicList) {
                const itemsWithEpic: BacklogItem[] = [];
                const sorted = new Array(this.backlogItems.length);
                this.backlogItems.forEach((item, i) => {
                        if (item.epicKey) {
                                itemsWithEpic.push(item);
                        } else {
                                sorted[i] = item;
                        }
                });
                itemsWithEpic.sort((a: BacklogItem, b: BacklogItem) => {
                        return a.comparePriorityByEpic(b, epicList);
                });
                itemsWithEpic.reverse();
                for (let i = 0; i < this.backlogItems.length; i++) {
                        if (sorted[i]) {
                                continue;
                        }
                        sorted[i] = itemsWithEpic.pop();
                }
                this.backlogItems = sorted;
        }
}
