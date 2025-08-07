#!/bin/bash
echo "Testing Formspree endpoint..."
curl -X POST https://formspree.io/f/xeoeenqv \
  -H "Accept: application/json" \
  -d "name=Curl Test&email=test@example.com&message=Test from curl at $(date)" \
  -v