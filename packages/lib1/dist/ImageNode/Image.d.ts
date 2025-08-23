import React from 'react';
import { ImageNode } from '.';
import { NodeKey } from 'lexical';
interface LazyImageProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    nodeKey: NodeKey;
    threshold?: number;
    rootMargin?: string;
    onLoad?: () => void;
    onError?: (error: Error) => void;
    objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
    node?: ImageNode;
}
declare const EditImage: React.FC<LazyImageProps>;
interface ImageComponentProps extends LazyImageProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare const ImageComponent: React.FC<ImageComponentProps>;
export default EditImage;
