"""Import key from the user-provided VSP file into local .env; never prints it."""
import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parent.parent
text = Path(sys.argv[1]).read_text(encoding="utf-8-sig")
data, _ = json.JSONDecoder().raw_decode(text.lstrip())
key = data.get("api_key", "")
if not key or re.search(r"[\r\n]", key) or not key.startswith("vsp_"):
    raise SystemExit("File không chứa khóa VSP hợp lệ.")
env = root / ".env"
body = env.read_text(encoding="utf-8") if env.exists() else (root / ".env.example").read_text(encoding="utf-8")
if re.search(r"^VSP_API_KEY=.*$", body, re.M):
    body = re.sub(r"^VSP_API_KEY=.*$", lambda _: "VSP_API_KEY=" + key, body, flags=re.M)
else:
    body += "\nVSP_API_KEY=" + key + "\n"
env.write_text(body, encoding="utf-8")
print("Đã lưu khóa vào .env cục bộ; không in khóa và không đưa .env vào bản chia sẻ.")
