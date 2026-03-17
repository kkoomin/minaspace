#!/bin/bash

# 프로젝트 루트의 .env 파일에서 환경변수 로드
ENV_FILE="$(git rev-parse --show-toplevel)/.env"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Slack으로 완료 알림 전송
curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d "{\"text\": \"✅ *Claude Code 작업 완료*\"}" > /dev/null

exit 0