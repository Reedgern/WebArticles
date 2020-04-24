import React from "react";
import {Field, reduxForm} from "redux-form";
import {authAPI} from "../../../api/api";
import {setUserAC} from "../../../redux/appReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../../HOCs/withAuthRedirect";

const SignUpForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            Username:<Field component='input' name='username'/>
            Password:<Field component='input' name='password' type='password'/>
            <button>Sign Up</button>
        </form>
    );
}

const SignUpReduxForm = reduxForm({form: 'signUp'})(SignUpForm);

const SignUp = (props) => {
    const signUp = (username, password) => {
        authAPI.signUp(username, password).then(response => {
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.data.token);
                props.setUser(true, response.data.data.user.username);
            }
        })
    }

    const onSubmit = (formData) => {
        signUp(formData.username, formData.password);
    }

    return (
        <div>
            <SignUpReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapDispatchToProps = {
    setUser: setUserAC
}

export default compose(withAuthRedirect, connect(null, mapDispatchToProps))(SignUp);