import React, { useState } from "react";
import { isEmpty, isNaN } from "lodash";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import InputBox from "../../components/InputBox";
import TextArea from "../../components/TextArea";

import "./index.scss";

// interface CreatePostProps {

// }

const CreatePost: React.FunctionComponent = () => {
    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();
    const [content, setContent] = useState<string>();
    const isCreateButtonDisabled = isEmpty(title) || isNaN(category) || isEmpty(content);

    const handleClickCreateButton = () => {
        console.log("title", title);
        console.log("category", category);
        console.log("content", content);
    }

    return <>
        <h2 className="create-post__title">Plaats een blog bericht</h2>
        <InputBox className="create-post__input" placeholder="Geen titel" labelText="Berichtnaam" isClear={false} onChange={(inputValue) => setTitle(inputValue)} />
        <Dropdown className="create-post__dropdown" labelText="Categorie" onChange={(categoryId) => setCategory(categoryId)} />
        <TextArea className="create-post__text-area" labelText="Bericht" isClear={false} onChange={(contentValue) => setContent(contentValue)} />
        <Button className="create-post__button" isDisabled={isCreateButtonDisabled} onClick={handleClickCreateButton}>Bericht aanmaken</Button>
    </>;
};

export default CreatePost;