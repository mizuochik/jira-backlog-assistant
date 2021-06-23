import { SprintBacklog } from '../domain/sprint_backlog';
import { EpicList } from '../domain/epic_list';

export interface JiraBoardAccessor {
        getEpicList(): Promise<EpicList>;
        getSprintBacklog(sprintName: string): Promise<SprintBacklog>;
        applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void>;
}
