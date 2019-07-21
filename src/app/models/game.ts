import { KeyValue } from '@angular/common';

export class Game {
    type = 'game';
    id: string;
    // host: string;
    players: KeyValue<number, string>;
    // don: string;
    // sheriff: string;
    // mafia: any;
    townWin: boolean;
    club: string;
    date: any;
    // donChecks: number[];
    // sheriffChecks: number[];
    // bestTurn: number[];
}
