#!/bin/sh
set -eu

script_dir=$(CDPATH= cd "$(dirname "$0")" && pwd)
cd "$script_dir"

./build-blog.sh

if [ -e posts ] || [ -L posts ]; then
    printf 'Refusing to overwrite existing posts path.\n' >&2
    exit 1
fi

ln -s blog/posts posts
cleanup() {
    if [ -L posts ] && [ "$(readlink posts)" = "blog/posts" ]; then
        rm posts
    fi
}
trap cleanup EXIT
trap 'cleanup; exit 129' HUP
trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM
npx serve -p 5173
