import {articleAPI} from "../api/api";

const SET_PAGE = 'SET-PAGE';
const SET_ARTICLES = 'SET-ARTICLES';

const initialState = {
    articles: [],
    currentPage: 1,
    totalCount: 0,
    pageSize: 3
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case SET_ARTICLES:
            return {
                ...state,
                articles: action.articles,
                totalCount: action.totalCount
            };
        default:
            return state;
    }
}

export const setPageAC = (page) => ({type: SET_PAGE, page});
export const setArticlesAC = (articles, totalCount) => ({type: SET_ARTICLES, articles, totalCount});

export const addArticleTC = (title, content) => (dispatch, getState) => {
    const page = getState().articlesPage.currentPage;
    const pageSize = getState().articlesPage.pageSize;
    articleAPI.addArticle(title, content).then(response => {
        if (response.status === 200) {
            dispatch(getArticlesTC(page, pageSize));
        }
    });
}

export const getArticlesTC = (page, pageSize) => (dispatch) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    articleAPI.getArticles(limit, offset).then(response => {
        if (response.status === 200) {
            dispatch(setArticlesAC(response.data.data.articles, response.data.data.pagination.rowCount));
        }
    });
}

// export const getArticleTC = (articleId) => (dispatch) => {
//     articleAPI.getArticle(articleId).then(response => {
//         if (response.status === 200) {
//
//         }
//     })
// }

export const deleteArticleTC = (articleId) => (dispatch, getState) => {
    let page = getState().articlesPage.currentPage;
    const pageSize = getState().articlesPage.pageSize;
    const totalCount = getState().articlesPage.totalCount;
    articleAPI.deleteArticle(articleId).then(response => {
        const pageCount = Math.ceil((totalCount - 1) / pageSize);
        if (page > pageCount) {
            page -= 1;
        }
        dispatch(setPageAC(page));
        dispatch(getArticlesTC(page, pageSize));
    })
}

// export const updateArticleTC = (articleId, newArticleBody) => (dispatch) => {
//     articleAPI.updateArticle(articleId, newArticleBody).then(response => {
//
//     })
// }

export default articlesReducer;