import { $getNodeByKey, $getSelection, $isRangeSelection, $isTextNode, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";
import { $patchStyleText, getStyleObjectFromCSS } from "@lexical/selection";
const PATCH_STYLE_COMMAND = createCommand('patch-style');
const needCheckStyle = [
    'color',
    'font-size',
    'background-color'
];
function registerPatchStyleCommand(editor) {
    return editor.registerCommand(PATCH_STYLE_COMMAND, (payload)=>{
        const selection = $getSelection();
        if (selection && $isRangeSelection(selection)) $patchStyleText(selection, payload.data);
        return true;
    }, COMMAND_PRIORITY_EDITOR);
}
function dispatchPatchStyleCommand(editor, payload) {
    editor.dispatchCommand(PATCH_STYLE_COMMAND, payload);
}
function $getSelectionStyleValue(selection) {
    const styles = new Map();
    needCheckStyle.forEach((key)=>styles.set(key, null));
    if ($isRangeSelection(selection)) {
        if (selection.isCollapsed() && '' !== selection.style) {
            const css = selection.style;
            const styleObject = getStyleObjectFromCSS(css);
            Object.keys(styleObject).forEach((key)=>{
                if (styles.has(key)) styles.set(key, styleObject[key]);
            });
            return Object.fromEntries(styles);
        }
        const nodes = selection.getNodes();
        const anchor = selection.anchor;
        const focus = selection.focus;
        const isBackward = selection.isBackward();
        const endOffset = isBackward ? focus.offset : anchor.offset;
        const endNode = isBackward ? focus.getNode() : anchor.getNode();
        let remainingStyles = new Set(needCheckStyle);
        const checkedStyles = new Set();
        for(let i = 0; i < nodes.length && remainingStyles.size > 0; i++){
            const node = nodes[i];
            if (!(0 !== i && 0 === endOffset && node.is(endNode))) {
                if ($isTextNode(node)) {
                    const css = node.getStyle();
                    const styleObject = getStyleObjectFromCSS(css);
                    remainingStyles.forEach((key)=>{
                        const currentValue = styles.get(key);
                        const newValue = styleObject[key];
                        if (void 0 !== newValue) if (null !== currentValue || checkedStyles.has(key)) {
                            if (currentValue !== newValue) {
                                styles.set(key, "");
                                remainingStyles.delete(key);
                            }
                        } else styles.set(key, newValue);
                        else if (null !== currentValue) {
                            styles.set(key, "");
                            remainingStyles.delete(key);
                        } else if (!checkedStyles.has(key)) checkedStyles.add(key);
                    });
                }
            }
        }
    }
    return Object.fromEntries(styles);
}
const SELECT_NODE_COMMAND = createCommand('selectNode');
const registerSelectNodeCommand = (editor, callback)=>editor.registerCommand(SELECT_NODE_COMMAND, (nodeKey)=>{
        const node = $getNodeByKey(nodeKey);
        if (node) callback(node);
        return true;
    }, COMMAND_PRIORITY_EDITOR);
export { $getSelectionStyleValue, PATCH_STYLE_COMMAND, SELECT_NODE_COMMAND, dispatchPatchStyleCommand, registerPatchStyleCommand, registerSelectNodeCommand };
