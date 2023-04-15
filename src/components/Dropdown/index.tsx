import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from "lodash";
import Icon from "../../components/Icon";

import "./index.scss";

interface DropdownProps {
    id?: string;
    className?: string;
    labelText: string;
    data: DropdownItem[];
    onChange: (value: number) => void;
}

export interface DropdownItem {
    id: number;
    value: string;
    label: string;
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
    const { id = "dropdown", className = "", labelText, data, onChange } = props;
    const refList = useRef<HTMLDivElement>(null);
    const [inputValue, setInput] = useState<DropdownItem>({} as unknown as DropdownItem);
    const [isListOpen, setListOpen] = useState(false);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isListOpen && refList.current && !refList.current.contains(e.target as HTMLDivElement)) {
                setListOpen(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    });

    const handleChange = (option: DropdownItem) => {
        setListOpen(false);
        setInput(option);
        onChange(option.id);
    }

    const handleClickInput = () => {
        setListOpen(!isListOpen);
    }

    const getListIcon = () => {
        return <Icon iconName={isListOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"} />;
    };

    return (
        <div ref={refList} className={`${className} dropdown__wrapper`}>
            <label id={id}>{labelText}</label>
            <div className="dropdown__menu-container">
                <div onClick={handleClickInput} className="dropdown__input">
                    <div className={`dropdown__selected-value${isEmpty(inputValue) ? "--default" : ""}`}>{inputValue.label || "Geen categorie"}</div>
                    <div className="dropdown__icon-wrapper">
                        <div className="dropdown__icon">{getListIcon()}</div>
                    </div>
                </div>
                {isListOpen && (
                    <div className="dropdown__menu">
                        {data.map((option: DropdownItem) => (
                            <div key={option.id} className="dropdown__item-wrapper">
                                <div
                                    onClick={() => handleChange(option)}
                                    className={`dropdown__item ${inputValue.id === option.id && "selected"}`}
                                >
                                    {option.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;