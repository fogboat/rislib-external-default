import { jsx } from "react/jsx-runtime";
import { $create, $getNodeByKey, $getSelection, $getState, $insertNodes, $isRangeSelection, $setSelection, $setState, COMMAND_PRIORITY_EDITOR, DecoratorNode, createCommand, createState } from "lexical";
import { lazy } from "react";
import { ImageComponent } from "./Image.js";
const LazyImage = /*#__PURE__*/ lazy(()=>import("./Image.js"));
const INSERT_IMAGE_COMMAND = createCommand('insert-image');
const nodeType = 'img';
const srcState = createState('src', {
    parse: (value)=>'string' == typeof value ? value : ''
});
const altState = createState('alt', {
    parse: (value)=>'string' == typeof value ? value : ""
});
const widthState = createState('width', {
    parse: (value)=>'number' == typeof value ? value : void 0
});
const heightState = createState('height', {
    parse: (value)=>'number' == typeof value ? value : void 0
});
const objectFitState = createState('objectFit', {
    parse: (value)=>'string' == typeof value ? value : void 0
});
class ImageNode_ImageNode extends DecoratorNode {
    editable = true;
    $config() {
        return this.config(nodeType, {
            extends: DecoratorNode,
            stateConfigs: [
                {
                    flat: true,
                    stateConfig: srcState
                },
                {
                    flat: true,
                    stateConfig: altState
                },
                {
                    flat: true,
                    stateConfig: widthState
                },
                {
                    flat: true,
                    stateConfig: heightState
                },
                {
                    flat: true,
                    stateConfig: objectFitState
                }
            ]
        });
    }
    createDOM() {
        const div = document.createElement('div');
        div.className = 'image-node';
        return div;
    }
    updateDOM() {
        return false;
    }
    decorate() {
        if (this.editable) return /*#__PURE__*/ jsx(LazyImage, {
            nodeKey: this.getKey(),
            src: this.getSrc(),
            alt: this.getAlt(),
            width: this.getWidth(),
            height: this.getHeight(),
            node: this
        });
        return /*#__PURE__*/ jsx(ImageComponent, {
            nodeKey: this.getKey(),
            src: this.getSrc(),
            alt: this.getAlt(),
            width: this.getWidth(),
            height: this.getHeight(),
            node: this
        });
    }
    select() {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const nodeSelection = {
                nodes: new Set([
                    this.getKey()
                ]),
                dirty: false
            };
            $setSelection(nodeSelection);
        }
    }
    getSrc() {
        return $getState(this, srcState);
    }
    getAlt() {
        return $getState(this, altState);
    }
    getWidth() {
        return $getState(this, widthState);
    }
    getHeight() {
        return $getState(this, heightState);
    }
    getObjectFit() {
        return $getState(this, objectFitState);
    }
    setState(payload) {
        setState(this, payload);
    }
    setEditable(editable) {
        this.editable = editable;
    }
}
function $isImageNode(node) {
    return node instanceof ImageNode_ImageNode;
}
function setState(node, payload) {
    Object.keys(payload).forEach((key)=>{
        switch(key){
            case 'src':
                $setState(node, srcState, payload[key]);
                break;
            case 'alt':
                $setState(node, altState, payload[key]);
                break;
            case 'width':
                $setState(node, widthState, payload[key]);
                break;
            case 'height':
                $setState(node, heightState, payload[key]);
                break;
            case 'objectFit':
                $setState(node, objectFitState, payload[key]);
                break;
            default:
                break;
        }
    });
}
function $createImageNode(payload, editable) {
    const node = $create(ImageNode_ImageNode);
    node.setEditable(editable);
    setState(node, payload);
    return node;
}
function $insertImage(payload, editable) {
    const imageNode = $createImageNode(payload, editable);
    $insertNodes([
        imageNode
    ]);
}
function $removeImage(nodeKey) {
    const node = $getNodeByKey(nodeKey);
    if ($isImageNode(node)) node.remove();
}
function $updateImage(nodeKey, payload) {
    const node = $getNodeByKey(nodeKey);
    if ($isImageNode(node)) node.setState(payload);
}
function insertImage(editor, payload) {
    return editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
}
const nodePlugin = {
    node: ImageNode_ImageNode,
    nodeType,
    registerCommand: (editor)=>editor.registerCommand(INSERT_IMAGE_COMMAND, (payload)=>{
            $insertImage(payload, editor.isEditable());
            return true;
        }, COMMAND_PRIORITY_EDITOR)
};
const ImageNode = nodePlugin;
export { $createImageNode, $insertImage, $isImageNode, $removeImage, $updateImage, INSERT_IMAGE_COMMAND, ImageNode_ImageNode as ImageNode, ImageNode as default, insertImage };
