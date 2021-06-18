import { Epic } from './epic';
describe('Epic', () => {
        describe('comparePriority()', () => {
                test('returns >0 when self is higher priority', () => {
                        const a = new Epic("a", "A", 1);
                        const b = new Epic("b", "B", 2);
                        expect(a.comparePriority(b)).toBeGreaterThan(0);
                });

                test('returns 0 when self is same priority', () => {
                        const a = new Epic("a", "A", 1);
                        const b = new Epic("b", "B", 1);
                        expect(a.comparePriority(b)).toEqual(0);
                });

                test('returns <0 when self is higher priority', () => {
                        const a = new Epic("b", "B", 2);
                        const b = new Epic("a", "A", 1);
                        expect(a.comparePriority(b)).toBeLessThan(0);
                });
        })
});
