import { SprintBacklog } from '../domain/sprint_backlog';
import { EpicList } from '../domain/epic_list';

export interface JiraBoardAccessor {
        getEpicList(boardId: string): Promise<EpicList>;
        getSprintBacklog(boardId: string, sprintName: string): Promise<SprintBacklog>;
        applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void>;
}
