import { EpicValue } from "./epic_response";

export interface IssueResponse {
    startAt: number;
    maxResults: number;
    total: number;
    issues: IssueValue[];
}

export interface IssueValue {
    key: string
    fields: IssueFields
}

export interface IssueFields {
    summary: string;
    epic: EpicValue;
}
