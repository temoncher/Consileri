import { KeyValue } from '@angular/common';

export class GamePlayerInfo {
    id: string;
    seat: number;
    nickName: string;
    falls: number;
    out: KeyValue<number, string>;
    votes: any;
}
