import { JiraBoardAccessor } from "./infra/http/jira_board_accessor";
import { JiraBoard } from "./infra/ui/jira_board";
import { SortSprintBacklogItemsUseCase } from "./use_case/sort_sprint_backlog_items_use_case";

{
        const a = new JiraBoardAccessor();
        const b = new JiraBoard(a, new SortSprintBacklogItemsUseCase(a));
        b.initialize();
}
