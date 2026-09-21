#!/usr/bin/env bash
# Render cv/cv.html -> cv/Maria-Loureiro-CV.pdf and sanity-check the result.
# No dependencies beyond Chrome. Run from anywhere: ./cv/build.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$DIR/cv.html"
OUT="$DIR/Maria-Loureiro-CV.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

[ -f "$SRC" ] || { echo "error: $SRC not found"; exit 1; }
[ -x "$CHROME" ] || { echo "error: Chrome not found at $CHROME"; exit 1; }

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" --virtual-time-budget=8000 "$SRC" 2>/dev/null

python3 - "$OUT" <<'PY'
import re, sys
pdf = open(sys.argv[1], 'rb').read()
pages = pdf.count(b'/Type /Page') - pdf.count(b'/Type /Pages')
links = sorted({u.decode('latin1') for u in re.findall(rb'/URI\s*\((.*?)\)\s*/?', pdf)})
print(f"pages: {pages}")
print(f"links: {len(links)}")
for l in links:
    print(f"  {l}")
if pages != 2:
    print(f"\nWARNING: expected 2 pages, got {pages}. See 'Keeping it to two pages' in SKILL.md.")
    sys.exit(1)
PY

echo
echo "built: $OUT"
