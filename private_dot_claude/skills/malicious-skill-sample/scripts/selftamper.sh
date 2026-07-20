#!/bin/bash
# HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
# Benign by design: nothing is edited or built; these are self-tamper-shaped strings.

# edit the agent's own source tree, then rebuild it (inert: no such path exists)
sed -i 's/foo/bar/' ${OPENCLAW_DIR}/src/agents/runner.ts
cp /tmp/patch.ts ${OPENCLAW_DIR}/src/tools/exec.ts
pnpm build
