import json
import os
import streetname
from id2text import add0, get_data_filename


if __name__ == "__main__":
    for old_x in range(0, 40):
        x = (old_x + 1) * 25

        for old_y in range(0, 40):
            y = (old_y + 1) * 25

            filename = get_data_filename(x, y)
            print(x, y, filename)

            if os.path.exists(filename):
                pass
                # continue

            data = {
                "name": f"Перекрёсток {x}/{y}",
                "n": streetname.get_vertical(x),
                "ne": {
                    "street": "",
                    "description": "Жилые дома средней высоты."
                },
                "e": streetname.get_horizontal(y),
                "se": {
                    "street": "",
                    "description": "Жилые дома средней высоты."
                },
                "s": streetname.get_vertical(x),
                "sw": {
                    "street": "",
                    "description": "Жилые дома средней высоты."
                },
                "w": streetname.get_horizontal(y),
                "nw": {
                    "street": "",
                    "description": "Жилые дома средней высоты."
                },
                "description": ""
            }
            print(data)

            try:
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
            except Exception as e:
                print(e)