import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
let Context ="div"
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
const ErrorBoundary = ({ children })=>/*#__PURE__*/ jsx("div", {
        className: "editor-error-boundary",
        children: children
    });
const RichTextEditor_RichTextEditor = ({ editor, className, style, toolbar: ToolbarComponent, placeholder })=>{
    if (!editor) throw new Error('editor is required');
    return /*#__PURE__*/ jsx("div", {
        className: `rich-text-editor ${className}`,
        style: style ? style : void 0,
        children: /*#__PURE__*/ jsxs(Context, {
            editor: editor.instance,
            children: [
                /*#__PURE__*/ jsx(ToolbarComponent, {
                    editor: editor
                }),
                /*#__PURE__*/ jsxs("div", {
                    className: "editor-content",
                    children: [
                        /*#__PURE__*/ jsx(RichTextPlugin, {
                            contentEditable: /*#__PURE__*/ jsx(ContentEditable, {
                                className: "editor-content-editable"
                            }),
                            placeholder: /*#__PURE__*/ jsx("div", {
                                className: "editor-placeholder",
                                children: placeholder
                            }),
                            ErrorBoundary: ErrorBoundary
                        }),
                        /*#__PURE__*/ jsx(HistoryPlugin, {}),
                        /*#__PURE__*/ jsx(AutoFocusPlugin, {}),
                        /*#__PURE__*/ jsx(ListPlugin, {})
                    ]
                })
            ]
        })
    });
};
const RichTextEditor = RichTextEditor_RichTextEditor;
export { RichTextEditor as default };
