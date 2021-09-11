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
                        const res = await fetch(`/rest/agile/1.0/board/${boardId}/epic?startAt=${startAt}&done=false`);
                        const er: EpicResponse = await res.json();
                        if (er.isLast) {
                                return accum.concat(er.values);
                        }
                        return getEpics(er.startAt + er.maxResults, accum.concat(er.values));
                }
                const evs: EpicValue[] = await getEpics(0, []);
                const el = new EpicList()
                evs.forEach((ev, i) => {
                        el.add(new Epic(ev.key, ev.name, i));
                });
                return el;
        }

        async getSprintBacklog(boardId: string, sprintId: string): Promise<SprintBacklog> {
                async function getIssues(startAt: number, accum: IssueValue[]): Promise<IssueValue[]> {
                        const res = await fetch(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?jql=issuetype in (Task, ストーリー)&startAt=${startAt}`);
                        const ir: IssueResponse = await res.json();
                        const isLast = ir.startAt + ir.maxResults >= ir.total;
                        if (isLast) {
                                return accum.concat(ir.issues);
                        }
                        return getIssues(ir.startAt + ir.maxResults, accum.concat(ir.issues));
                }
                const ivs: IssueValue[] = await getIssues(0, []);
                const sbl = new SprintBacklog(sprintId, boardId);
                ivs.forEach(iv => {
                        let epicKey = null;
                        if (iv.fields.epic) {
                                epicKey = iv.fields.epic.key
                        }
                        sbl.addBacklogItem(new BacklogItem(iv.key, iv.fields.summary, epicKey));
                });
                return sbl;
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
                const callGroupSize = 10;
                for (let i = backlogItems.length - 1; i > 0; i -= callGroupSize) {
                        const callGroup: Promise<void>[] = [];
                        for (let j = i; j > 0 && j > i - callGroupSize; j--) {
                                callGroup.push(rankBefore(backlogItems[j - 1].key, backlogItems[j].key));
                        }
                        await Promise.all(callGroup);
                }
                return null;
        }
}
