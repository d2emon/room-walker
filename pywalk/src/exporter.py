from describe import describe
from id2text import get_output_filename
from loader import load


if __name__ == "__main__":
    for old_x in range(0, 40):
        x = (old_x + 1) * 25

        for old_y in range(0, 40):
            y = (old_y + 1) * 25

            data = load(x, y)
            print(data)

            if data["exists"]:
                try:
                    filename = get_output_filename(x, y)
                    description = describe(data)
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(description)
                except Exception as e:
                    print(e)

            # try:
            #     with open(filename, 'w', encoding='utf-8') as f:
            #         json.dump(data, f, ensure_ascii=False, indent=4)
            # except Exception as e:
            #     print(e)