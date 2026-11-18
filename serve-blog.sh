#!/bin/sh
set -eu

md2blog --clean --output blog
ln -s ../assets blog/assets
trap 'rm blog/assets' EXIT
md2blog --output blog --serve

