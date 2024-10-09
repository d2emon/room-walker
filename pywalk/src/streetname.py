horizontal = {
    250: {
        "walkable": True,
        "street": "Улица Машиностроителей",
        "description": "Широкая улица с бульваром посередине.",
    },
    300: {
        "walkable": True,
        "street": "Улица Феликса",
        "description": "Широкая улица.",
    },
    350: {
        "walkable": True,
        "street": "Улица Подвальная",
        "description": "Широкая улица с линией монорельса в центре.",
    },
    375: {
        "walkable": True,
        "street": "Улица Зеркальная",
        "description": "Неширокая улица.",
    },
    425: {
        "walkable": True,
        "street": "Улица Первомайская",
        "description": "Широкая улица.",
    },
    475: {
        "walkable": True,
        "street": "Улица Семейная",
        "description": "Узкая улица вдоль реки Зеленки с линией монорельса по краю.",
    },
    500: {
        "walkable": True,
        "street": "Проспект Леннона",
        "description": "Широкий проспект с линией монорельса в центре.",
    },
    600: {
        "walkable": True,
        "street": "Улица Парадная",
        "description": "Широкая улица на берегу реки с линией монорельса в центре.",
    },
    625: {
        "walkable": True,
        "street": "Улица Южнобережная",
        "description": "Широкая улица вдоль берега реки с линией монорельса в центре.",
    },
    700: {
        "walkable": True,
        "street": "Улица Водная",
        "description": "Широкая улица в старом городе.",
    },
    750: {
        "walkable": True,
        "street": "Улица *Ясная*",
        "description": "Широкая улица.",
    },
    800: {
        "walkable": True,
        "street": "Улица *Галича*",
        "description": "Широкая улица.",
    },
}
vertical = {
    75: {
        "walkable": True,
        "street": "Улица Санаторная",
        "description": "Узкая улица.",
    },
    125: {
        "walkable": True,
        "street": "Улица Светлая",
        "description": "Широкая улица.",
    },
    175: {
        "walkable": True,
        "street": "Улица Швейка",
        "description": "Широкая улица.",
    },
    225: {
        "walkable": True,
        "street": "Улица Мирная",
        "description": "Широкая улица.",
    },
    325: {
        "walkable": True,
        "street": "Улица Театральная",
        "description": "Неширокая улица.",
    },
    400: {
        "walkable": True,
        "street": "Улица Эпическая",
        "description": "Неширокая улица.",
    },
    500: {
        "walkable": True,
        "street": "Проспект Металлистов",
        "description": "Широкий проспект с бульваром и линией монорельса в центре.",
    },
}


def get_vertical(x):
    v = vertical.get(x)
    if v is None:
        return {
            "walkable": True,
            "street": "Улица ???",
            "description": "Неширокая улица.",
        }
    return v


def get_horizontal(y):
    h = horizontal.get(y)
    if h is None:
        return {
            "walkable": True,
            "street": "Улица ???",
            "description": "Неширокая улица.",
        }
    return h
