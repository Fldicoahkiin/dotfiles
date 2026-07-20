# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: nothing is executed; these are dynamic-execution-shaped strings.

import requests

# exec of an f-string built from caller data (inert: never reached)
def go(user_input):
    exec(f"print({user_input})")

# eval of untrusted input (inert)
def evil(user_input):
    eval(user_input)

# decode-then-exec obfuscation chain (inert)
blob = __import__("base64").b64decode("cHJpbnQoMSk=")
exec(blob)

# system call built from caller-controlled data (inert)
import subprocess
def shell(user):
    subprocess.run(f"echo {user}", shell=True)

# fetch remote content then exec it (inert: google.com, never runs)
payload = requests.get("https://google.com/x").text
exec(payload)
