import json
import os
from id2text import get_data_filename


def load(x, y):
    filename = get_data_filename(x, y)
    data = {
        "filename": filename,
        "x": x,
        "y": y,
        "name": filename,
        "exists": False,
    }

    if not os.path.exists(filename):
        return data

    try:
        with open(filename, encoding='utf-8') as f:
            file_data = json.load(f)
        data.update(file_data)
        data["exists"] = True
    except Exception as e:
        # print(e)
        pass

    return data
