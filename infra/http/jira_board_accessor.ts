import { EpicList } from '../../domain/epic_list';
import { SprintBacklog } from '../../domain/sprint_backlog';
import { JiraBoardAccessor as UCJiraBoardAccessor } from '../../use_case/jira_board_accessor';

export class JiraBoardAccessor implements UCJiraBoardAccessor {
        getEpicList(): Promise<EpicList> {
                return null;
        }

        getSprintBacklog(sprintName: string): Promise<SprintBacklog> {
                return null;
        }

        applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void> {
                return null;
        }
}
