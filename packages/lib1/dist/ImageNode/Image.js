import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import image_module from "./image.module.js";

import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

let SELECT_NODE_COMMAND =1
const LoadingImage = ()=>/*#__PURE__*/ jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "60px",
        height: "60px",
        viewBox: "0 0 50 50",
        children: /*#__PURE__*/ jsx("path", {
            fill: "#ccc",
            d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z",
            children: /*#__PURE__*/ jsx("animateTransform", {
                attributeType: "xml",
                attributeName: "transform",
                type: "rotate",
                from: "0 25 25",
                to: "360 25 25",
                dur: "0.6s",
                repeatCount: "indefinite"
            })
        })
    });
const EditImage = ({ src, alt, width, height, nodeKey, onLoad, onError, objectFit, node })=>{
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const onResizeEnd = useCallback((width, height)=>{
        if (node) editor.update(()=>{
            node.setState({
                width,
                height
            });
        });
    }, [
        node,
        editor
    ]);
    const onClick = useCallback((event)=>{
        event.stopPropagation();
        event.preventDefault();
        if (event.shiftKey) setSelected(!isSelected);
        else {
            clearSelection();
            setSelected(true);
        }
        editor.dispatchCommand(SELECT_NODE_COMMAND, nodeKey);
    }, [
        isSelected,
        setSelected,
        editor,
        clearSelection
    ]);
    return /*#__PURE__*/ jsx("div", {
        className: image_module["edit-container"],
        onClick: onClick,
        onContextMenu: (e)=>{
            onClick(e);
            node?.setState({
                alt: 'test'
            });
        },
          children: /*#__PURE__*/ jsx(ImageComponent, {
                src: src,
                alt: alt,
                width: width,
                height: height,
                onLoad: onLoad,
                onError: onError,
                objectFit: objectFit,
                nodeKey: nodeKey
            })
    });
};
function BrokenImage() {
    return /*#__PURE__*/ jsx("img", {
        src: "",
        style: {
            height: 200,
            opacity: 0.2,
            width: 200
        },
        draggable: "false",
        alt: "Broken image"
    });
}
const ImageComponent = ({ src, alt, width, height, onLoad, onError, objectFit, onClick })=>{
    const [imageState, setImageState] = useState({
        isLoaded: false,
        hasError: false
    });
    const handleImageLoad = useCallback(()=>{
        setImageState((prev)=>({
                ...prev,
                isLoaded: true
            }));
        onLoad?.();
    }, [
        onLoad
    ]);
    const handleImageError = useCallback((error)=>{
        setImageState((prev)=>({
                ...prev,
                hasError: true
            }));
        onError?.(error);
    }, [
        onError
    ]);
    const containerStyle = {};
    const imageStyle = {};
    if (width) {
        containerStyle.width = width;
        containerStyle.height = height;
        imageStyle.width = width;
        imageStyle.height = height;
    }
    if (objectFit) {
        imageStyle.objectFit = objectFit;
        imageStyle.width = "100%";
        imageStyle.height = "100%";
    }
    return /*#__PURE__*/ jsxs("div", {
        className: image_module["img-container"],
        onClick: onClick,
        style: containerStyle,
        children: [
            !imageState.hasError && /*#__PURE__*/ jsx("img", {
                loading: "lazy",
                src: src,
                alt: alt,
                style: imageStyle,
                className: image_module.img,
                onLoad: handleImageLoad,
                onError: handleImageError
            }),
            !imageState.isLoaded && !imageState.hasError && /*#__PURE__*/ jsx(LoadingImage, {}),
            imageState.hasError && /*#__PURE__*/ jsx(BrokenImage, {})
        ]
    });
};
const Image = EditImage;
export { ImageComponent, Image as default };
