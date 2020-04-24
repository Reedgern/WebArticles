import React, {useState} from "react";
import {reduxForm} from "redux-form";
import {Form} from "../ArticleForm/ArticleForm";

const ArticleData = (props) => {
    return (
        <div>
            <h1>{props.isOwner && <button onClick={props.goToEditMode}>Do it now</button>}</h1>
            Title: {props.article.title}
            Content: {props.article.content}
            User: {props.article.user.username}
        </div>
    );
}

const ArticleReduxForm = reduxForm({form: 'editArticle'})(Form);

const ArticleHook = (props) => {
    let [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        props.updateArticle(formData);
        setEditMode(false);
    }

    return (
        <div>
            {editMode
                ? <ArticleReduxForm initialValues={{title: props.article.title, content: props.article.content}} onSubmit={onSubmit}/>
                : <ArticleData isOwner={props.isOwner} article={props.article} goToEditMode={() => setEditMode(true)}/>}
        </div>
    )
}

export default ArticleHook;