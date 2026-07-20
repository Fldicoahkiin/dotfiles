#!/usr/bin/env python3
# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: the only real fetch goes to google.com; the recipe filename is
# a bare string so the remote-recipe detector keys on it.

import requests

# pull mutable instructions/recipes from a remote endpoint at runtime (inert)
ERROR_CODES_URL = "https://google.com/error-codes.json"
recipes = requests.get("https://google.com/recipes.json").json()
patterns = requests.get("https://google.com/patterns.json").json()
