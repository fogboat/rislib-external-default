import { $createParagraphNode, $getSelection, $isElementNode, $isRangeSelection, $isRootOrShadowRoot, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_EDITOR, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND, createCommand } from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { BlockType, SelectionStateType } from "../types/index.js";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $getSelectionStyleValue, dispatchPatchStyleCommand, registerPatchStyleCommand } from "./command.js";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createCodeNode, registerCodeHighlighting } from "@lexical/code";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { INSERT_IMAGE_COMMAND } from "../ImageNode/index.js";
const FONT_SIZE_COMMAND = createCommand('font-size');
const SET_BLOCK_TYPE_COMMAND = createCommand('block-type');
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 72;
class EditorApi {
    editor;

    insertImage(payload) {
        this.editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    }
  
  
}
function $findTopLevelElement(node) {
    let topLevelElement = 'root' === node.getKey() ? node : $findMatchingParent(node, (e)=>{
        const parent = e.getParent();
        return null !== parent && $isRootOrShadowRoot(parent);
    });
    if (null === topLevelElement) topLevelElement = node.getTopLevelElementOrThrow();
    return topLevelElement;
}
export { EditorApi, FONT_SIZE_COMMAND, MAX_FONT_SIZE, MIN_FONT_SIZE, SET_BLOCK_TYPE_COMMAND };
