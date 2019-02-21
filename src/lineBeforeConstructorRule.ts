import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {

    public static FAILURE_STRING: string = 'constructor should start with new line';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
    }
}

class Walk extends Lint.RuleWalker {
    public visitConstructorDeclaration(node: ts.ConstructorDeclaration): void {
        if (!this.isNewLineBefore(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }

        super.visitConstructorDeclaration(node);
    }


    private getPrevLinesText(node: ts.NamedDeclaration, sourceFile: ts.SourceFile, lineIndex: number = 1): string {
        const comments = ts.getLeadingCommentRanges(sourceFile.text, node.pos) || [];
        let pos = node.getStart();

        if (comments.length > 0) {
            pos = comments[0].pos;
        }

        const lineStartPositions = <any>sourceFile.getLineStarts();
        const startPosIdx = lineStartPositions.findIndex((startPos, idx) =>
            startPos > pos || idx === lineStartPositions.length - 1
        ) - lineIndex;

        return sourceFile.text.substring(lineStartPositions[startPosIdx - 1], lineStartPositions[startPosIdx] - 1);
    }

    private isNewLineBefore(node: ts.NamedDeclaration, ): boolean {
        const prevLineText = this.getPrevLinesText(node, this.getSourceFile());

        return this.isLineBlank(prevLineText);
    }

    private isLineBlank(line: string): boolean {
        return line.length === 0 || !(/\S/.test(line));
    }
}

