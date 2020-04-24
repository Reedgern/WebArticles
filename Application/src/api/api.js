import * as axios from 'axios';

const createInstance = (isAuth = true) => {
    if (isAuth) {
        let token = localStorage.getItem('userToken');
        token = token;
        return axios.create({
            baseURL: 'http://localhost:8080/',
            headers: {
                'authorization': token
            }
        })
    }
    return axios.create({
        baseURL: 'http://localhost:8080/'
    });
}

export const authAPI = {
    signUp: (username, password) => {
        const instance = createInstance(false);
        return instance.post('register', {username, password});
    },
    signIn: (username, password) => {
        const instance = createInstance(false);
        return instance.post('login', {username, password});
    },
    me: () => {
        const instance = createInstance();
        return instance.get('/user');
    }
}

export const articleAPI = {
    addArticle: (title, content) => {
        const instance = createInstance();
        return instance.post('articles', {title, content});
    },
    getArticles: (limit, offset) => {
        const instance = createInstance(false);
        return instance.get(`articles?limit=${limit}&offset=${offset}`);
    },
    getArticle: (articleId) => {
        const instance = createInstance(false);
        return instance.get(`articles/${articleId}`);
    },
    deleteArticle: (articleId) => {
        const instance = createInstance();
        return instance.delete(`articles/${articleId}`);
    },
    updateArticle: (articleId, newArticle) => {
        const instance = createInstance();
        return instance.put(`articles/${articleId}`, newArticle);
    }
}
