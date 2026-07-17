#!/usr/bin/env sh
set -eu

exec mvn -q compile exec:java -Dexec.args="${1:-}"
