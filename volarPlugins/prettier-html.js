"use strict";
exports.__esModule = true;
var prettier = require("prettier");
function default_1() {
    return {
        format: function (document, range, options) {
            if (document.languageId !== 'html')
                return;
            var formattedText = prettier.format(document.getText(), {
                tabWidth: options.tabSize,
                useTabs: !options.insertSpaces,
                parser: document.languageId
            });
            if (formattedText === document.getText())
                return [];
            // return empty array instead of undefined to avoid progress to next plugin
            return [
                {
                    range: {
                        start: document.positionAt(0),
                        end: document.positionAt(document.getText().length)
                    },
                    newText: formattedText
                },
            ];
        }
    };
}
exports["default"] = default_1;
