import { BacklogItem } from './backlog_item';
import { EpicList } from './epic_list';

export class SprintBacklog {
        backlogItems: Array<BacklogItem>;

        constructor() {
                this.backlogItems = new Array<BacklogItem>();
        }

        addBacklogItem(backlogItem: BacklogItem) {
                this.backlogItems.push(backlogItem);
        }

        sortBacklogItemsByEpic(epicList: EpicList) {
                this.backlogItems.sort((a: BacklogItem, b: BacklogItem) => {
                        return a.comparePriorityByEpic(b, epicList);
                });
        }
}
