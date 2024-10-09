import json
import os
import streetname


if __name__ == "__main__":
    for old_x in range(0, 40):
        x = (old_x + 1) * 25
        if x >= 1000:
            x_str = f"{x}"
        elif x >= 100:
            x_str = f"0{x}"
        elif x >= 10:
            x_str = f"00{x}"
        else:
            x_str = f"000{x}"
        for old_y in range(0, 40):
            y = (old_y + 1) * 25
            if y >= 1000:
                y_str = f"{y}"
            elif y >= 100:
                y_str = f"0{y}"
            elif y >= 10:
                y_str = f"00{y}"
            else:
                y_str = f"000{y}"

            filename = f"data/input/{x_str}{y_str}.json"
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