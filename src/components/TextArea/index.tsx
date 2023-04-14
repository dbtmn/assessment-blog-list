import React, { useState, useEffect } from "react";

import "./index.scss";

interface TextAreaProps {
    id?: string;
    className?: string;
    labelText: string;
    isClear: boolean;
    onChange: (value: string) => void;
}

const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
    const { id = "texratea", className = "", labelText, isClear, onChange } = props;

    const [inputValue, setInput] = useState<string>("");

    useEffect(() => {
        if (isClear) {
            setInput("");
        }
    }, [isClear]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value as string);
        onChange(e.target.value as string);
    }

    return <div className={`${className} text-area__wrapper`}>
        <label id={id}>{labelText}</label>
        <textarea id={id} value={inputValue} onChange={handleChange} />
    </div>
}

export default TextArea;