import { SprintBacklog } from '../domain/sprint_backlog';
import { EpicList } from '../domain/epic_list';

export interface JiraBoardAccessor {
        getEpicList(): EpicList;
        applySprintBacklog(sprintBacklog: SprintBacklog): void;
        getSprintBacklog(sprintName: string): SprintBacklog;
}
