import React, { useEffect, useState } from "react";
import { isEmpty, isNull, isUndefined } from "lodash";
import { useUploadPost, PostData } from "../../hooks/useUploadPost";
import { Category } from "../../store/categories/types";
import Error, { ErrorSize } from "../Error";
import Button from "../../components/Button";
import Dropdown, { DropdownItem } from "../../components/Dropdown";
import ImagePicker from "../../components/ImagePicker";
import InputBox from "../../components/InputBox";
import Loading from "../../components/Loading";
import TextArea from "../../components/TextArea";

import "./index.scss";

interface CreatePostProps {
    pending: boolean;
    categories: Category[];
    error: string | null;
    onRefreshPosts: () => void;
}

const CreatePost: React.FunctionComponent<CreatePostProps> = (props) => {
    const { pending, categories, error, onRefreshPosts } = props;

    const [isFormClear, setFormClear] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();
    const [content, setContent] = useState<string>();
    const [image, setImage] = useState<File | null>(null);
    const [textButton, setTextButton] = useState<string>("Bericht aanmaken");
    const { createPost, isPostPending, isPostSuccess } = useUploadPost();

    const isCreateButtonDisabled =
        isEmpty(title) ||
        isUndefined(category) ||
        isEmpty(content) ||
        isNull(image) ||
        isPostPending;

    const isError = !pending && error;

    const handleClickCreateButton = () => {
        createPost({
            title,
            category_id: `${category}`,
            content,
            image
        } as PostData).then(() => {
            if (category === 1) {
                onRefreshPosts();
            }
            setTitle("");
            setCategory(undefined);
            setContent("");
            setImage(null);
            setFormClear(true);
        }).finally(() => {
            setTimeout(() => {
                setTextButton("Bericht aanmaken");
                setFormClear(false);
            }, 3000);
        });
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

    useEffect(() => {
        const getSaveButtonText = () => {
            if (isPostPending) {
                setTextButton("Sending...");
            }
            if (isPostSuccess) {
                setTextButton("Saved!");
            }
            return "Bericht aanmaken";
        }

        getSaveButtonText();
    }, [isPostPending, isPostSuccess]);

    return <>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(categories) && <>
            <h2 className="create-post__title">Plaats een blog bericht</h2>
            <InputBox className="create-post__input" placeholder="Geen titel" labelText="Berichtnaam" isClear={isFormClear} onChange={(inputValue) => setTitle(inputValue)} />
            <Dropdown className="create-post__dropdown" labelText="Categorie" data={getDropdownCategories()} isClear={isFormClear} onChange={(categoryId) => setCategory(categoryId)} />
            <ImagePicker className="create-post__image-picker" labelText="Header afbeelding" isClear={isFormClear} onChange={(imageValue) => setImage(imageValue)}>Kies bestand</ImagePicker>
            <TextArea className="create-post__text-area" labelText="Bericht" isClear={isFormClear} onChange={(contentValue) => setContent(contentValue)} />
            <Button className="create-post__button" isDisabled={isCreateButtonDisabled} onClick={handleClickCreateButton}>{textButton}</Button>
        </>}
    </>;
};

export default CreatePost;