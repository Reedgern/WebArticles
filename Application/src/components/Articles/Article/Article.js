import React from "react";
import {withRouter} from "react-router-dom";
import {articleAPI} from "../../../api/api";
import {connect} from "react-redux";
import {compose} from "redux";
import Article from "./ArticleData";

class ArticleContainer extends React.Component {
    state = {
        article: null,
        isFetching: true,
    }

    getArticle = (articleId) => {
        articleAPI.getArticle(articleId).then(response => {
            if (response.status === 200) {
                this.setState({
                    article: response.data.data.article,
                    isFetching: false
                });
            }
        })
    }

    updateArticle = (newArticleBody) => {
        const articleId = this.props.match.params.id;
        console.log(newArticleBody);
        this.setState({isFetching: true});
        articleAPI.updateArticle(articleId, newArticleBody).then(response => {
            if (response.status === 200) {
                this.getArticle(articleId);
            }
        });
    }

    componentDidMount() {
        this.getArticle(this.props.match.params.id);
    }

    render() {
        if (this.state.isFetching) {
            return <h1>Loading...</h1>
        }
        const isOwner = this.props.currentUser === this.state.article.user.username;
        return <Article isOwner={isOwner} article={this.state.article} updateArticle={this.updateArticle}/>
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.app.username
})

export default compose(withRouter, connect(mapStateToProps, null))(ArticleContainer);