def add0(x):
    if x >= 1000:
        return f"{x}"
    elif x >= 100:
        return f"0{x}"
    elif x >= 10:
        return f"00{x}"
    else:
        return f"000{x}"


def get_data_filename(x, y):
    str_x = add0(x)
    str_y = add0(y)
    return f"data/input/{str_x}{str_y}.json"


def get_markdown_filename(x, y):
    str_x = add0(x)
    str_y = add0(y)
    return f"./{str_x}{str_y}.md"
