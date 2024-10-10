import json
import os
from describe import describe
from loader import load
from mover import move_by


def starter():
    is_running = True
    x = 500
    y = 500
    while is_running:
        data = load(x, y)

        print(f"Position: {x} {y}")
        print(describe(data))

        command = input(">").lower()

        if command == "q":
            is_running = False

        x, y = move_by(command, x, y)

        print(x, y, command)
