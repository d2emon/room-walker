import json
import os
from id2text import get_data_filename, get_markdown_filename


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


exits = [
    { "name": "Север", "key": "n" },
    { "name": "Северо-Восток", "key": "ne" },
    { "name": "Восток", "key": "e" },
    { "name": "Юго-Восток", "key": "se" },
    { "name": "Юг", "key": "s" },
    { "name": "Юго-Запад", "key": "sw" },
    { "name": "Запад", "key": "w" },
    { "name": "Северо-Восток", "key": "nw" },
]


def load(x, y):
    filename = get_data_filename(x, y)
    data = {
        "filename": filename,
        "x": x,
        "y": y,
        "name": filename,
    }

    if not os.path.exists(filename):
        return data

    try:
        with open(filename, encoding='utf-8') as f:
            file_data = json.load(f)
        data.update(file_data)
    except Exception as e:
        # print(e)
        pass

    return data


def describe(data):
    print("Data:", data)
    print("\n")

    name = data.get("name")
    print(f"# {name}")
    for e in exits:
        key = e["key"]
        description = data.get(key)

        if description and description.get("walkable"):
            move_by = directions.get(key)
            dir_filename = get_markdown_filename(
                data.get("x", 0) + move_by[0] * 25,
                data.get("y", 0) + move_by[1] * 25,
            )

            print(f"\n## [{e['name']}]({dir_filename})\n")
        else:
            print(f"\n## {e['name']}\n")

        if description and description.get("street"):
          print(description.get("street"))

        if description and description.get("description"):
          print(description.get("description"))


def starter():
    is_running = True
    x = 500
    y = 500
    while is_running:
        data = load(x, y)

        print(f"Position: {x} {y}")
        describe(data)

        command = input(">").lower()
        if command == "q":
            is_running = False
        move = directions.get(command)
        if move:
            x += move[0] * 25
            y += move[1] * 25

        print(x, y, command)
