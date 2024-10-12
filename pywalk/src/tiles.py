RESIDENTIAL = 'residential'


class Tile:
    def __init__(self, name, type):
        self.type =type
        self.name = name


class ResidentialTile(Tile):
    def __init__(self, name):
        super().__init__(name, RESIDENTIAL)


class Suburbs(ResidentialTile):
    def __init__(self):
        super().__init__('Микрорайон')


class Apartments(ResidentialTile):
    def __init__(self):
        super().__init__('Высотки')


class Condominium(ResidentialTile):
    def __init__(self):
        super().__init__('15-этажка')


class BnB(ResidentialTile):
    def __init__(self):
        super().__init__('Общежитие')


class MobileHomeCommunity(ResidentialTile):
    def __init__(self):
        super().__init__('Палаточный городок')


class HouseownerAssociation(ResidentialTile):
    def __init__(self):
        super().__init__('Частные дома')


class Hostel(ResidentialTile):
    def __init__(self):
        super().__init__('Гостиница')


class RetirementVillage(ResidentialTile):
    def __init__(self):
        super().__init__('Дом престарелых')


class Mansions(ResidentialTile):
    def __init__(self):
        super().__init__('Особняки')


class HousingProjects(ResidentialTile):
    def __init__(self):
        super().__init__('Типовые дома')


TILES = [
    Suburbs(),
    Suburbs(),
    Suburbs(),
    Suburbs(),
    Apartments(),
    Apartments(),
    Condominium(),
    Condominium(),
    Suburbs(),
    Suburbs(),
    Suburbs(),
    Suburbs(),

    BnB(),
    Mansions(),
    Mansions(),
    BnB(),
    RetirementVillage(),
    RetirementVillage(),
    MobileHomeCommunity(),
    MobileHomeCommunity(),
    Hostel(),
    HousingProjects(),
    HousingProjects(),
    Hostel(),
]