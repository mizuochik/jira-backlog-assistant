import { BacklogItem } from './backlog_item';
import { SprintBacklog } from './sprint_backlog';
import { EpicList } from './epic_list';
import { Epic } from './epic';

describe('SprintBacklog', () => {
        describe('sortBacklogItemsByEpic()', () => {
                let sprintBacklog: SprintBacklog;

                beforeEach(() => {
                        sprintBacklog = new SprintBacklog('sprint-0', 'board-0');
                });

                test('sort items by epic priority', () => {
                        const a = new BacklogItem('a', 'A', 'epic-A');
                        const b = new BacklogItem('b', 'B', 'epic-B');
                        const c = new BacklogItem('c', 'C', 'epic-C');
                        const epicList = new EpicList();
                        epicList.add(new Epic('epic-A', 'A', 1));
                        epicList.add(new Epic('epic-B', 'B', 2));
                        epicList.add(new Epic('epic-C', 'C', 3));

                        sprintBacklog.addBacklogItem(b);
                        sprintBacklog.addBacklogItem(c);
                        sprintBacklog.addBacklogItem(a);

                        sprintBacklog.sortBacklogItemsByEpic(epicList);

                        expect(sprintBacklog.backlogItems).toEqual([
                                new BacklogItem('a', 'A', 'epic-A'),
                                new BacklogItem('b', 'B', 'epic-B'),
                                new BacklogItem('c', 'C', 'epic-C'),
                        ]);
                });

                test('ignore sorting items without epic', () => {
                        const a = new BacklogItem('a', 'A', 'epic-A');
                        const b = new BacklogItem('b', 'B', null);
                        const c = new BacklogItem('c', 'C', 'epic-C');
                        const epicList = new EpicList();
                        epicList.add(new Epic('epic-A', 'A', 1));
                        epicList.add(new Epic('epic-C', 'C', 3));

                        sprintBacklog.addBacklogItem(c);
                        sprintBacklog.addBacklogItem(b);
                        sprintBacklog.addBacklogItem(a);

                        sprintBacklog.sortBacklogItemsByEpic(epicList);

                        expect(sprintBacklog.backlogItems).toEqual([
                                new BacklogItem('a', 'A', 'epic-A'),
                                new BacklogItem('b', 'B', null),
                                new BacklogItem('c', 'C', 'epic-C'),
                        ]);
                });
        });
});
