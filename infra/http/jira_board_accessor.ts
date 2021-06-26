import { EpicList } from '../../domain/epic_list';
import { SprintBacklog } from '../../domain/sprint_backlog';
import { JiraBoardAccessor as UCJiraBoardAccessor } from '../../use_case/jira_board_accessor';
import { Epic } from '../../domain/epic';
import { EpicResponse } from './epic_response';

export class JiraBoardAccessor implements UCJiraBoardAccessor {
        getEpicList(boardId: string): Promise<EpicList> {
                return new Promise((resolve, reject) => {
                        fetch(`/rest/agile/1.0/board/${boardId}/epic`)
                                .then(res => res.json())
                                .then((res: EpicResponse) => {
                                        const el = new EpicList()
                                        res.values.forEach((epic, i) => {
                                                el.add(new Epic(epic.key, epic.name, i));
                                        });
                                        resolve(el);
                                })
                                .catch(reject);
                });
        }

        getSprintBacklog(sprintName: string): Promise<SprintBacklog> {
                return null;
        }

        applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void> {
                return null;
        }
}

