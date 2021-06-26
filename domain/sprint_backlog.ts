import { BacklogItem } from './backlog_item';
import { EpicList } from './epic_list';

export class SprintBacklog {
        boardId: string;
        backlogItems: Array<BacklogItem>;

        constructor(boardId: string) {
                this.boardId = boardId;
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
