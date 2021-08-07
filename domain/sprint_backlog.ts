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
                this.backlogItems.sort((a: BacklogItem, b: BacklogItem) => {
                        return a.comparePriorityByEpic(b, epicList);
                });
        }
}
