import React from "react";
import {Field, reduxForm} from "redux-form";
import {setArticlesAC} from "../../../redux/articlesReducer";
import {connect} from "react-redux";
import {articleAPI} from "../../../api/api";
import {Input, Textarea} from "../../common/FormControls/FormControls";
import {reqiuredField} from "../../../validators/validators";

export const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} name='title' placeholder={'Title'} validate={[reqiuredField]}/>
            <Field component={Textarea} name='content' placeholder={'Content'} validate={[reqiuredField]}/>
            <button>Add article</button>
        </form>
    );
};

const ArticleReduxForm = reduxForm({form: 'articleForm'})(Form);

const ArticleForm = (props) => {
    const getArticles = (page, pageSize) => {
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        articleAPI.getArticles(limit, offset).then(response => {
            if (response.status === 200) {
                props.setArticles(response.data.data.articles, response.data.data.pagination.rowCount);
            }
        });
    }

    const addArticle = (title, content) => {
        const page = props.currentPage;
        const pageSize = props.pageSize;
        articleAPI.addArticle(title, content).then(response => {
            if (response.status === 200) {
                getArticles(page, pageSize);
            }
        });
    }

    const onSubmit = (formData) => {
        addArticle(formData.title, formData.content);
    };

    return <ArticleReduxForm onSubmit={onSubmit}/>;
};

const mapDispatchToProps = {
    setArticles: setArticlesAC
};

const mapStateToProps = (state) => ({
    currentPage: state.articlesPage.currentPage,
    pageSize: state.articlesPage.pageSize
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);