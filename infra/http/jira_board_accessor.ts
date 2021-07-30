import { EpicList } from '../../domain/epic_list';
import { SprintBacklog } from '../../domain/sprint_backlog';
import { JiraBoardAccessor as UCJiraBoardAccessor } from '../../use_case/jira_board_accessor';
import { Epic } from '../../domain/epic';
import { EpicResponse, EpicValue } from './epic_response';

export class JiraBoardAccessor implements UCJiraBoardAccessor {
        async getEpicList(boardId: string): Promise<EpicList> {
                async function getEpics(startAt: number, accum: EpicValue[]): Promise<EpicValue[]> {
                        return fetch(`/rest/agile/1.0/board/${boardId}/epic?startAt=${startAt}&done=false`)
                                .then(res => res.json())
                                .then((res: EpicResponse) => {
                                        if (res.isLast) {
                                                return accum.concat(res.values);
                                        }
                                        return getEpics(res.startAt + res.maxResults, accum.concat(res.values));
                                });
                }
                return getEpics(0, [])
                        .then((evs: EpicValue[]) => {
                                const el = new EpicList()
                                evs.forEach((ev, i) => {
                                        el.add(new Epic(ev.key, ev.name, i));
                                });
                                return el;
                        });
        }

        getSprintBacklog(sprintName: string): Promise<SprintBacklog> {
                return null;
        }

        applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void> {
                return null;
        }
}
