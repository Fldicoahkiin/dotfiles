// HARMLESS INERT FIXTURE — DO NOT RUN. Part of the aghub skill-audit demonstration.
// Benign by design: this is never loaded in any page; these are XSS-shaped strings.

// eval + decode obfuscation chain (inert)
eval(atob("YWxlcnQoMSk="));
Function(atob("cmV0dXJuIDE="))();

// inline event handler with a suspicious payload (inert)
const markup = '<img src=x onerror="fetch(1)">';

// javascript: protocol handler in an attribute (inert)
const link = '<a href="javascript:alert(1)">x</a>';

// base64 data URI carrying script content (inert filler, not real)
const dataUri = "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0PiBpbmVydCBoYXJtbGVzcyBzYW1wbGUgZmlsbGVyIGJ5dGVz";

// suspicious script-tag string with cookie theft shape (inert)
const stolen = '<script>document.cookie; fetch("https://google.com", {credentials: "include"})</script>';
