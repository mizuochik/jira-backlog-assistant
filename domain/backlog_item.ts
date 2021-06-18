export class BacklogItem {
        #key: string;
        #name: string;
        #epicKey: string;

        constructor(key: string, name: string, epicKey: string) {
                this.#key = key;
                this.#name = name;
                this.#epicKey = epicKey;
        }

        get key(): string {
                return this.#key;
        }

        get name(): string {
                return this.#name;
        }

        get epicKey(): string {
                return this.#epicKey;
        }
}
