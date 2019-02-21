"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'constructor should start with new line';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var Walk = /** @class */ (function (_super) {
    __extends(Walk, _super);
    function Walk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walk.prototype.visitConstructorDeclaration = function (node) {
        if (!this.isNewLineBefore(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    Walk.prototype.getPrevLinesText = function (node, sourceFile, lineIndex) {
        if (lineIndex === void 0) { lineIndex = 1; }
        var comments = ts.getLeadingCommentRanges(sourceFile.text, node.pos) || [];
        var pos = node.getStart();
        if (comments.length > 0) {
            pos = comments[0].pos;
        }
        var lineStartPositions = sourceFile.getLineStarts();
        var startPosIdx = lineStartPositions.findIndex(function (startPos, idx) {
            return startPos > pos || idx === lineStartPositions.length - 1;
        }) - lineIndex;
        return sourceFile.text.substring(lineStartPositions[startPosIdx - 1], lineStartPositions[startPosIdx] - 1);
    };
    Walk.prototype.isNewLineBefore = function (node) {
        var prevLineText = this.getPrevLinesText(node, this.getSourceFile());
        return this.isLineBlank(prevLineText);
    };
    Walk.prototype.isLineBlank = function (line) {
        return line.length === 0 || !(/\S/.test(line));
    };
    return Walk;
}(Lint.RuleWalker));
