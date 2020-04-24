import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer as formReducer} from "redux-form";
import thunkMiddleWare   from "redux-thunk";
import appReducer from "./appReducer";
import articlesReducer from "./articlesReducer";

const reducers = combineReducers({
    app: appReducer,
    articlesPage: articlesReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;