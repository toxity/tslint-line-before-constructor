# tslint-line-before-constructor
[![npm version](https://badge.fury.io/js/tslint-line-before-constructor.svg)](https://github.com/toxity/tslint-line-before-constructor)
[![CircleCI](https://travis-ci.org/toxity/tslint-line-before-constructor.svg?branch=master)](https://github.com/toxity/tslint-line-before-constructor)

Custom rule for TSLint to assure that constructor has blank line before declaration

## Install
```bash
npm install --save-dev tslint-line-before-constructor
```

## Configuration
Update `tslint.json` file and add new rules directory with new rule itself
```json
{
  "rulesDirectory": [
    "node_modules/tslint-line-before-constructor"
  ],
  "rules": {
    "tslint-line-before-constructor": true
  }
}
```
