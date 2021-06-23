import { JiraBoardAccessor } from './jira_board_accessor';

export class SortSprintBacklogItemsUseCase {
        jiraBoardAccessor: JiraBoardAccessor;

        constructor(jiraBoardAccessor: JiraBoardAccessor) {
                this.jiraBoardAccessor = jiraBoardAccessor;
        }

        async Run(sprintName: string): Promise<void> {
                const el = await this.jiraBoardAccessor.getEpicList();
                const sbl = await this.jiraBoardAccessor.getSprintBacklog(sprintName);
                sbl.sortBacklogItemsByEpic(el)
                await this.jiraBoardAccessor.applySprintBacklog(sbl);
        }
}
