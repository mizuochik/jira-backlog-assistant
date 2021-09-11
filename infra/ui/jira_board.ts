import { SortSprintBacklogItemsUseCase } from "../../use_case/sort_sprint_backlog_items_use_case";
import { JiraBoardAccessor } from "../http/jira_board_accessor";

export class JiraBoard {
    jiraBoardAccessor: JiraBoardAccessor;
    sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase;

    constructor(jiraBoardAccessor: JiraBoardAccessor, sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase) {
        this.jiraBoardAccessor = jiraBoardAccessor;
        this.sortSprintBacklogItemsUseCase = sortSprintBacklogItemsUseCase;
    }

    initialize() {
        const boardId = new URLSearchParams(document.location.search).get('rapidView');
        const sblHeaders = document.querySelectorAll('.ghx-backlog-header');
        sblHeaders.forEach(header => {
            const sprintId = header.getAttribute('data-sprint-id');
            const btn = document.createElement('button');
            btn.setAttribute('class', 'jba-sort-button');
            btn.addEventListener('click', () => this.sortSprintBacklogItems(boardId, sprintId));
            btn.appendChild(document.createTextNode('Sort by Epic'));
            header.appendChild(btn);
        });
    }

    async sortSprintBacklogItems(boardId: string, sprintId: string) {
        await this.sortSprintBacklogItemsUseCase.run(boardId, sprintId);
        await this.reloadItemElements(boardId, sprintId);
    }

    async reloadItemElements(boardId: string, sprintId: string) {
        const sbl = await this.jiraBoardAccessor.getSprintBacklog(boardId, sprintId);
        const issues = document.querySelector(`[data-sprint-id='${sprintId}'] .ghx-issues`);
        const childs = Array.from(issues.childNodes);
        sbl.backlogItems.forEach((item, i) => {
            // offset the sorted issue elements
            childs[i + 1] = issues.querySelector(`[data-issue-key='${item.key}']`);
        });
        childs.forEach(n => {
            issues.appendChild(n);
        });
    }
}
