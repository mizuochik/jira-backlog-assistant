export class Epic {
        #key: string;
        #name: string;
        #priority: number;

        constructor(key: string, name: string, priority: number) {
                this.#key = key;
                this.#name = name;
                this.#priority = priority;
        }

        get key(): string {
                return this.#key;
        }

        get name(): string {
                return this.#name;
        }

        get priority(): number {
                return this.#priority;
        }

        comparePriority(other: Epic): number {
                return this.#priority - other.#priority;
        }
}
