import { JiraBoardAccessor } from './jira_board_accessor';

export class SortSprintBacklogItemsUseCase {
        jiraBoardAccessor: JiraBoardAccessor;

        constructor(jiraBoardAccessor: JiraBoardAccessor) {
                this.jiraBoardAccessor = jiraBoardAccessor;
        }

        async Run(boardId: string, sprintName: string): Promise<void> {
                const el = await this.jiraBoardAccessor.getEpicList(boardId);
                const sbl = await this.jiraBoardAccessor.getSprintBacklog(boardId, sprintName);
                sbl.sortBacklogItemsByEpic(el)
                await this.jiraBoardAccessor.applySprintBacklog(sbl);
        }
}
