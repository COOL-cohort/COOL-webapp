#!/usr/bin/env bash
python utils/preprocess.py $* 2>&1 | tee utils/preprocess.log
