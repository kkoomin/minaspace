#!/bin/bash

# 프로젝트 루트의 .env 파일에서 환경변수 로드
ENV_FILE="$(git rev-parse --show-toplevel)/.env"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Claude Code가 stdin으로 넘겨주는 JSON 데이터 읽기
INPUT=$(cat)

# JSON에서 tool_name 추출
TOOL_NAME=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_name', 'unknown'))
except:
    print('unknown')
" 2>/dev/null || echo "unknown")

# tool_input 추출 (최대 300자)
TOOL_INPUT=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    inp = d.get('tool_input', {})
    print(str(inp)[:300])
except:
    print('')
" 2>/dev/null || echo "")

# Slack으로 알림 전송
curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d "{\"text\": \"🔔 *Claude Code 허가 요청*\n *툴*: \`$TOOL_NAME\`\n *내용*:\n\`\`\`$TOOL_INPUT\`\`\`\"}" > /dev/null

exit 0