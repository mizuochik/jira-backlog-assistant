export interface EpicResponse {
    startAt: number;
    maxResults: number;
    isLast: boolean;
    values: EpicValue[];
}

export class EpicValue {
    key: string;
    name: string;
}
