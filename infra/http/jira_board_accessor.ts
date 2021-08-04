import { EpicList } from '../../domain/epic_list';
import { SprintBacklog } from '../../domain/sprint_backlog';
import { JiraBoardAccessor as IJiraBoardAccessor } from '../../use_case/jira_board_accessor';
import { Epic } from '../../domain/epic';
import { EpicResponse, EpicValue } from './epic_response';
import { IssueValue, IssueResponse } from './issue_response';
import { BacklogItem } from '../../domain/backlog_item';

export class JiraBoardAccessor implements IJiraBoardAccessor {
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

        async getSprintBacklog(boardId: string, sprintId: string): Promise<SprintBacklog> {
                async function getIssues(startAt: number, accum: IssueValue[]): Promise<IssueValue[]> {
                        return fetch(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?jql=issuetype in (Task, ストーリー)&startAt=${startAt}`)
                                .then(res => res.json())
                                .then((res: IssueResponse) => {
                                        const isLast = res.startAt + res.maxResults >= res.total;
                                        if (isLast) {
                                                return accum.concat(res.issues);
                                        }
                                        return getIssues(res.startAt + res.maxResults, accum.concat(res.issues));
                                });
                }
                return getIssues(0, [])
                        .then(ivs => {
                                const sbl = new SprintBacklog(sprintId, boardId);
                                ivs.forEach(iv => {
                                        let epicKey = null;
                                        if (iv.fields.epic) {
                                                epicKey = iv.fields.epic.key
                                        }
                                        sbl.addBacklogItem(new BacklogItem(iv.key, iv.fields.summary, epicKey));
                                });
                                return sbl;
                        });
        }

        async applySprintBacklog(sprintBacklog: SprintBacklog): Promise<void> {
                async function rankBefore(beforeKey: string, afterKey: string): Promise<void> {
                        const res = await fetch(`/rest/agile/1.0/issue/rank`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                        issues: [
                                                beforeKey
                                        ],
                                        rankBeforeIssue: afterKey
                                })
                        });
                        if (200 <= res.status && res.status < 300) {
                                return null;
                        }
                        const t = await res.text();
                        throw t;
                }
                const backlogItems = sprintBacklog.backlogItems;
                for (let i = backlogItems.length - 1; i > 0; i--) {
                        await rankBefore(backlogItems[i - 1].key, backlogItems[i].key);
                }
                return null;
        }
}
