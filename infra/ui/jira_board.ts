import { SortSprintBacklogItemsUseCase } from "../../use_case/sort_sprint_backlog_items_use_case";
import { JiraBoardAccessor } from "../http/jira_board_accessor";

export class JiraBoard {
    jiraBoardAccessor: JiraBoardAccessor;
    sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase;

    constructor(jiraBoardAccessor: JiraBoardAccessor, sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase) {
        this.jiraBoardAccessor = jiraBoardAccessor;
        this.sortSprintBacklogItemsUseCase = sortSprintBacklogItemsUseCase;
    }

    async placeSortButtons(): Promise<void> {
        // TBD
    }

    async sortSprintBacklogItems(boardId: string, sprintId: string) {
        await this.sortSprintBacklogItemsUseCase.run(boardId, sprintId);
        this.reloadItemElements(boardId, sprintId);
    }

    reloadItemElements(boardId: string, sprintId: string) {
        // TBD
    }
}
