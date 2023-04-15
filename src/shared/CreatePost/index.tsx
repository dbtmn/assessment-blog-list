import React, { useState } from "react";
import { isEmpty, isNaN } from "lodash";
import { Category } from "../../store/categories/types";
import Error, { ErrorSize } from "../Error";
import Button from "../../components/Button";
import Dropdown, { DropdownItem } from "../../components/Dropdown";
import InputBox from "../../components/InputBox";
import Loading from "../../components/Loading";
import TextArea from "../../components/TextArea";

import "./index.scss";

interface CreatePostProps {
    pending: boolean;
    categories: Category[];
    error: string | null;
}

const CreatePost: React.FunctionComponent<CreatePostProps> = (props) => {
    const { pending, categories, error } = props;

    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();
    const [content, setContent] = useState<string>();

    const isCreateButtonDisabled = isEmpty(title) || isNaN(category) || isEmpty(content);
    const isError = !pending && error;

    const handleClickCreateButton = () => {
        console.log("title", title);
        console.log("category", category);
        console.log("content", content);
    };

    const getDropdownCategories = (): DropdownItem[] => {
        const dropdownCategories: DropdownItem[] = [];

        categories.map((category: Category) => {
            dropdownCategories.push({
                id: category.id,
                label: category.name,
                value: category.name
            });
        });

        return dropdownCategories;
    };

    return <>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(categories) && <>
            <h2 className="create-post__title">Plaats een blog bericht</h2>
            <InputBox className="create-post__input" placeholder="Geen titel" labelText="Berichtnaam" isClear={false} onChange={(inputValue) => setTitle(inputValue)} />
            <Dropdown className="create-post__dropdown" labelText="Categorie" data={getDropdownCategories()} onChange={(categoryId) => setCategory(categoryId)} />
            <TextArea className="create-post__text-area" labelText="Bericht" isClear={false} onChange={(contentValue) => setContent(contentValue)} />
            <Button className="create-post__button" isDisabled={isCreateButtonDisabled} onClick={handleClickCreateButton}>Bericht aanmaken</Button>
        </>}
    </>;
};

export default CreatePost;