export class Epic {
        key: string;
        name: string;
        priority: number;

        constructor(key: string, name: string, priority: number) {
                this.key = key;
                this.name = name;
                this.priority = priority;
        }

        comparePriority(other: Epic): number {
                return this.priority - other.priority;
        }
}
