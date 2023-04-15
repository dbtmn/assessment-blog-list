import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

import "./index.scss";

interface ImagePickerProps {
    id?: string;
    className?: string;
    labelText: string;
    children: React.ReactNode;
    isClear: boolean;
    onChange: (image: File) => void;
}

const ImagePicker: React.FunctionComponent<ImagePickerProps> = (props) => {
    const { id = "image-picker", className = "", labelText, children, isClear, onChange } = props;
    const [image, setImage] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isClear && inputRef && inputRef.current) {
            inputRef.current.value = "";
            setImage(null);
        }
    }, [isClear]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            onChange(e.target.files[0]);
        }
    };

    return <div className={`${className} image-picker__wrapper`}>
        <label className="image-picker__label">{labelText}</label>
        <div className="image-picker__area">
            <div className="image-picker__input-wrapper">
                <Icon iconName="photo_camera" />
                <label htmlFor={id} className="image-picker__input">
                    {children}
                </label>
                <input ref={inputRef} id={id} type="file" onChange={handleChange} hidden />
            </div>
            <span className="image-picker__file-name">
                {image && image.name}
            </span>
        </div>
    </div>;
};

export default ImagePicker;