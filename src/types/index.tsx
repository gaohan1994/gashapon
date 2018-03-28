export interface Stores {
    demo: Demo;
    match: Match;
}

export interface Demo {
    test: number;
    products: Array<Object>;
}

export type PlayerType = {
    name: string;
    class: number;
    win: boolean;
};

export type MatchType = {
    _id: string;
    date: Date;
    players: Array<PlayerType>;
    winner: number;
};

export type Match = {
    matches: Array<Object>;
};