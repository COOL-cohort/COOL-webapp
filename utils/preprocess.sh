#!/usr/bin/env bash
python utils/preprocess.py $* 2>&1 | tee preprocess.log
