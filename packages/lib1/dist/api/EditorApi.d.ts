import { ElementFormatType, LexicalEditor } from "lexical";
import { BlockType, NodePlugin, SelectionState, SelectionStateType, TextFormatType } from "../types";
import { ImagePayload } from "../nodes/ImageNode";
export declare const FONT_SIZE_COMMAND: import("lexical").LexicalCommand<number>;
export declare const SET_BLOCK_TYPE_COMMAND: import("lexical").LexicalCommand<string>;
export declare const MIN_FONT_SIZE = 12;
export declare const MAX_FONT_SIZE = 72;
export declare class EditorApi {
    private editor;
    private selectionState;
    private listenerId;
    private formatListeners;
    private registerCommands;
    constructor(editor: LexicalEditor, plugins: NodePlugin[]);
    updateSelectionState(state: Partial<SelectionState>): void;
    getEditor(): LexicalEditor;
    getValue(): import("lexical").SerializedEditorState<import("lexical").SerializedLexicalNode>;
    toggleFormat(format: TextFormatType): void;
    setBlockType(blockType: BlockType): void;
    toggleElementFormat(format: ElementFormatType): void;
    setFontSize(fontSize: number): void;
    insertImage(payload: ImagePayload): void;
    patchStyle(patch: {
        type: string;
        data: {
            [key: string]: string;
        };
    }): void;
    redo(): void;
    undo(): void;
    subscribeFormat(format: SelectionStateType): (listener: () => void) => () => void;
    getFormatState<T extends SelectionStateType>(format: T): () => SelectionState[T];
    register(): () => void;
}
