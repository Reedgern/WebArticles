import React, {useState} from "react";
import {reduxForm} from "redux-form";
import {Form} from "../ArticleForm/ArticleForm";

const ArticleData = (props) => {
    return (
        <div>
            <h5>{props.article.title}</h5>
            User: {props.article.user.username}
            <p>{props.article.content}</p>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
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
                ? <ArticleReduxForm initialValues={{title: props.article.title, content: props.article.content}}
                                    onSubmit={onSubmit} buttonText={'Save changes'}/>
                : <ArticleData isOwner={props.isOwner} article={props.article} goToEditMode={() => setEditMode(true)}/>}
        </div>
    )
}

export default ArticleHook;