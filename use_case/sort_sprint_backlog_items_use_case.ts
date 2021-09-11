import { SprintBacklog } from '../domain/sprint_backlog';
import { JiraBoardAccessor } from './jira_board_accessor';

export class SortSprintBacklogItemsUseCase {
        jiraBoardAccessor: JiraBoardAccessor;

        constructor(jiraBoardAccessor: JiraBoardAccessor) {
                this.jiraBoardAccessor = jiraBoardAccessor;
        }

        async run(boardId: string, sprintId: string): Promise<SprintBacklog> {
                const el = await this.jiraBoardAccessor.getEpicList(boardId);
                const sbl = await this.jiraBoardAccessor.getSprintBacklog(boardId, sprintId);
                sbl.sortBacklogItemsByEpic(el)
                await this.jiraBoardAccessor.applySprintBacklog(sbl);
                return sbl;
        }
}
