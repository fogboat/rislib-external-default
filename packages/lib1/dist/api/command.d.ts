import { LexicalEditor, LexicalNode } from "lexical";
export declare const PATCH_STYLE_COMMAND: import("lexical").LexicalCommand<PatchStylePayload>;
interface PatchStylePayload {
    type: string;
    data: {
        [key: string]: string;
    };
}
type StyleType = 'color' | 'font-size' | 'background-color';
type StyleValue = string | null;
export declare function registerPatchStyleCommand(editor: LexicalEditor): () => void;
export declare function dispatchPatchStyleCommand(editor: LexicalEditor, payload: PatchStylePayload): void;
export declare function $getSelectionStyleValue(selection: any): Record<StyleType, StyleValue>;
export declare const SELECT_NODE_COMMAND: import("lexical").LexicalCommand<string>;
type SelectNodeCallback = (node: LexicalNode) => void;
export declare const registerSelectNodeCommand: (editor: LexicalEditor, callback: SelectNodeCallback) => () => void;
export {};
