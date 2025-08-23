const SelectionStateType = {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'strikethrough',
    code: 'code',
    subscript: "subscript",
    superscript: "superscript",
    fontSize: 'font-size',
    canUndo: 'canUndo',
    canRedo: 'canRedo',
    blockType: 'blockType'
};
const BlockType = {
    paragraph: 'paragraph',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    number: 'number',
    bullet: 'bullet',
    quote: 'quote',
    code: 'code'
};
export { BlockType, SelectionStateType };
