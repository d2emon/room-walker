import json


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


def add0(x):
    if x >= 1000:
        return f"{x}"
    elif x >= 100:
        return f"0{x}"
    elif x >= 10:
        return f"00{x}"
    else:
        return f"000{x}"


def load(x, y):
    str_x = add0(x)
    str_y = add0(y)
    filename = f"data/input/{str_x}{str_y}.json"
    data = {
        "filename": filename,
        "x": x,
        "y": y,
    }

    try:
        with open(filename, encoding='utf-8') as f:
            file_data = json.load(f)
        data.update(file_data)
    except Exception as e:
        # print(e)
        data["name"] = filename

    return data


def describe(data):
    print("Data:", data)
    print("\n")

    name = data.get("name")
    print(f"# {name}")
    for e in exits:
        key = e["key"]
        move_by = directions.get(key)
        dir_x = data.get("x", 0) + move_by[0] * 25
        dir_y = data.get("y", 0) + move_by[1] * 25
        str_x = add0(dir_x)
        str_y = add0(dir_y)

        dir_filename = f"./{str_x}{str_y}.md"
        print(f"\n## [{e['name']}]({dir_filename})\n")
        description = data.get(key)
        if not description:
            continue
        if description.get("street"):
          print(description.get("street"))
        if description.get("description"):
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
