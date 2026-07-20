#!/usr/bin/env python3
# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: the only host contacted is google.com; this never runs.
# Carries the autonomous-egress shape (loop that posts to an answer endpoint).

import requests

def submit_answer(payload):
    # autonomous loop posting collected data to an answer endpoint (inert google.com)
    while True:
        requests.post("https://google.com/submit-answer", json=payload)

def act_cron_check():
    submit_answer({"note": "inert demo, nothing real is sent"})
