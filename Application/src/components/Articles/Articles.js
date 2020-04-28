import React from "react";
import ArticleForm from "./ArticleForm/ArticleForm";
import {setArticlesAC, setPageAC} from "../../redux/articlesReducer";
import {connect} from "react-redux";
import Paginator from "../common/Paginator/Paginator";
import {NavLink} from "react-router-dom";
import {articleAPI} from "../../api/api";

const Articles = (props) => {
    const articlesList = props.articles.map(a => {
        return (
                <div key={a.id}>
                    Title:{a.title}
                    User:{a.user.username}
                    <NavLink to={`/article/${a.id}`}>To article</NavLink>
                    {props.currentUser === a.user.username ? <button onClick={(e) => props.deleteArticle(a.id)}>Delete</button> : ''}
                </div>
        );
    });

    return (
        <div>
            {articlesList}
            {props.isAuth ? <ArticleForm/>: ''}
        </div>
    );
}

class ArticlesContainer extends React.Component {
    getArticles = (page, pageSize) => {
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        articleAPI.getArticles(limit, offset).then(response => {
            if (response.status === 200) {
                this.props.setArticles(response.data.data.articles, response.data.data.pagination.rowCount);
            }
        });
    }

    deleteArticle = (articleId) => {
        let page = this.props.currentPage;
        const pageSize = this.props.pageSize;
        const totalCount = this.props.totalCount;
        articleAPI.deleteArticle(articleId).then(response => {
            const pageCount = Math.ceil((totalCount - 1) / pageSize);
            if (page > pageCount) {
                page -= 1;
            }
            this.props.setPage(page);
            this.getArticles(page, pageSize);
        })
    }

    componentDidMount() {
        this.getArticles(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.setPage(page);
        this.getArticles(page, this.props.pageSize);
    }

    render() {
        return (
            <div>
                <Paginator currentPage={this.props.currentPage} pageSize={this.props.pageSize}
                           totalItemsCount={this.props.totalCount} onPageChanged={this.onPageChanged}/>
                <Articles articles={this.props.articles} currentUser={this.props.currentUser}
                          deleteArticle={this.deleteArticle} isAuth={this.props.isAuth}
                currentPage={this.props.currentPage} pageSize={this.props.pageSize} totalCount={this.props.totalCount}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.articlesPage.articles,
    totalCount: state.articlesPage.totalCount,
    currentPage: state.articlesPage.currentPage,
    pageSize: state.articlesPage.pageSize,
    currentUser: state.app.username,
    isAuth: state.app.isAuth
})

const mapDispatchToProps = {
    setPage: setPageAC,
    setArticles: setArticlesAC
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);