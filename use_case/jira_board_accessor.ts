import { SprintBacklog } from '../domain/sprint_backlog';

export interface JiraBoardAccessor {
        applySprintBacklog(sprintBacklog: SprintBacklog): void;
        getSprintBacklog(sprintName: string): SprintBacklog;
}
