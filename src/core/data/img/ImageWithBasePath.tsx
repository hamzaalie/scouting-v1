import React, {DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes} from "react";
import {base_path} from "../../../environment";

interface Image {
    className?: string;
    src: string;
    alt?: string;
    height?: number | string;
    width?: number | string;
    id?: string;
    style?: React.CSSProperties;
}

const ImageWithBasePath = (props: Image) => {
    // Combine the base path and the provided src to create the full image source URL
    const fullSrc = `${base_path}${props.src}`;
    return (
        <img
            style={props.style}
            className={props.className}
            src={fullSrc}
            height={props.height}
            alt={props.alt}
            width={props.width}
            id={props.id}
        />
    );
};

export default ImageWithBasePath;
