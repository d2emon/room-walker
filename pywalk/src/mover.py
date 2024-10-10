directions = {
    "n": (0, -1),
    "ne": (1, -1),
    "e": (1, 0),
    "se": (1, 1),
    "s": (0, 1),
    "sw": (-1, 1),
    "w": (-1, 0),
    "nw": (-1, -1),
}


def move_by(command, x, y):
    move = directions.get(command)
    if move:
        x += move[0] * 25
        y += move[1] * 25
    return x, y
