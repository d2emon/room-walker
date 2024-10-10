from id2text import get_markdown_filename
from mover import move_by


exits = [
    { "name": "Север", "key": "n" },
    { "name": "Северо-Восток", "key": "ne" },
    { "name": "Восток", "key": "e" },
    { "name": "Юго-Восток", "key": "se" },
    { "name": "Юг", "key": "s" },
    { "name": "Юго-Запад", "key": "sw" },
    { "name": "Запад", "key": "w" },
    { "name": "Северо-Запад", "key": "nw" },
]


def describe_exit(loc_x, loc_y, exit_data, data):
    output = []
    key = exit_data.get('key')
    name = exit_data.get('name', '???')

    if not data:
        return f"\n## {name}\n"

    walkable = data.get('walkable', False)
    street = data.get('street')
    description = data.get('description')

    if walkable:
        x, y = move_by(key, loc_x, loc_y)
        filename = get_markdown_filename(x, y)

        output.append(f"\n## [{name}]({filename})\n")
    else:
        output.append(f"\n## {name}\n")

    if street:
        output.append(f"{street}.")

    if description:
        output.append(description)
 
    return "\n".join(output)


def describe(data):
    print("Data:", data)
    print("\n")

    output = []
    name = data.get("name")
    x = data.get("x", 0)
    y = data.get("y", 0)
    output.append(f"# {name}")

    for e in exits:
        key = e["key"]
        exit_data = data.get(key)
        exit_description = describe_exit(x, y, e, exit_data)
        output.append(exit_description)
 
    output.append("")

    return "\n".join(output)
