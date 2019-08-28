export class Exits {
    north: number = 0;
    east: number = 0;
    south: number = 0;
    west: number = 0;
    up: number = 0;
    down: number = 0;
}

export class Room {
    exits: Exits = new Exits();
}
