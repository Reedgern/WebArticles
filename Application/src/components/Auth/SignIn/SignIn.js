import React from "react";
import {Field, reduxForm, stopSubmit} from "redux-form";
import {authAPI} from "../../../api/api";
import {setUserAC} from "../../../redux/appReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../../HOCs/withAuthRedirect";
import {Error, Input} from "../../common/FormControls/FormControls";
import {reqiuredField} from "../../../validators/validators";

const SignInForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            Username:<Field component={Input} name='username' validate={[reqiuredField]}/>
            Password:<Field component={Input} name='password' type='password' validate={[reqiuredField]}/>
            <button>Sign in</button>
            {props.error && <Error message={props.error}/>}
        </form>
    );
}

const SignInReduxForm = reduxForm({form: 'signIn'})(SignInForm);

const SignIn = (props) => {
    const signIn = (username, password) => {
        authAPI.signIn(username, password).then(response => {
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.data.token);
                props.setUser(true, response.data.data.user.username);
            }
        }).catch(error => {
            props.stopSubmit('signIn', {_error: error.response.data.errors[0]});
            }
        )
    }

    const onSubmit = (formData) => {
        signIn(formData.username, formData.password);
    }

    return (
        <div>
            <SignInReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

const mapDispatchToProps = {
    setUser: setUserAC,
    stopSubmit: stopSubmit
}

export default compose(withAuthRedirect, connect(null, mapDispatchToProps))(SignIn);