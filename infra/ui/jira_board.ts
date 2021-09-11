import { SortSprintBacklogItemsUseCase } from "../../use_case/sort_sprint_backlog_items_use_case";
import { JiraBoardAccessor } from "../http/jira_board_accessor";

export class JiraBoard {
    jiraBoardAccessor: JiraBoardAccessor;
    sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase;
    sortButtons: Map<string, Element>;

    constructor(jiraBoardAccessor: JiraBoardAccessor, sortSprintBacklogItemsUseCase: SortSprintBacklogItemsUseCase) {
        this.jiraBoardAccessor = jiraBoardAccessor;
        this.sortSprintBacklogItemsUseCase = sortSprintBacklogItemsUseCase;
        this.sortButtons = new Map();
    }

    initialize() {
        const boardId = new URLSearchParams(document.location.search).get('rapidView');
        const loadButtons = () => {
            const sblHeaders = document.querySelectorAll('.ghx-backlog-header');
            sblHeaders.forEach(h => {
                const sprintId = h.getAttribute('data-sprint-id');
                let b = this.sortButtons.get(sprintId);
                if (!b) {
                    b = this.newSortButton(boardId, sprintId);
                    this.sortButtons.set(sprintId, b);
                }
                if (h.lastChild != b) {
                    h.appendChild(b);
                }
            });
            setTimeout(loadButtons, 1000);
        };
        loadButtons();
    }

    newSortButton(boardId: string, sprintId: string): Element {
        const b = document.createElement('button');
        b.setAttribute('class', 'jba-sort-button');
        b.addEventListener('click', () => this.sortSprintBacklogItems(boardId, sprintId));
        b.appendChild(document.createTextNode('Sort by Epic'));
        return b;
    }

    async sortSprintBacklogItems(boardId: string, sprintId: string) {
        const issues = this.issuesElement(sprintId);
        issues.setAttribute('style', 'opacity: 0.5');
        await this.sortSprintBacklogItemsUseCase.run(boardId, sprintId);
        await this.reloadItemElements(boardId, sprintId);
        issues.removeAttribute('style');
    }

    async reloadItemElements(boardId: string, sprintId: string) {
        const sbl = await this.jiraBoardAccessor.getSprintBacklog(boardId, sprintId);
        const issues = this.issuesElement(sprintId);
        const childs = Array.from(issues.childNodes);
        sbl.backlogItems.forEach((item, i) => {
            // offset the sorted issue elements
            childs[i + 1] = issues.querySelector(`[data-issue-key='${item.key}']`);
        });
        childs.forEach(n => {
            issues.appendChild(n);
        });
    }

    issuesElement(sprintId: string): Element {
        return document.querySelector(`[data-sprint-id='${sprintId}'] .ghx-issues`);
    }
}
