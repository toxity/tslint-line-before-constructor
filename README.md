# tslint-line-before-constructor

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
