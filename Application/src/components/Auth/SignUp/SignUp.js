import React from "react";
import {Field, reduxForm, stopSubmit} from "redux-form";
import {authAPI} from "../../../api/api";
import {setUserAC} from "../../../redux/appReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../../HOCs/withAuthRedirect";
import {Error, Input} from "../../common/FormControls/FormControls";
import {reqiuredField} from "../../../validators/validators";

const SignUpForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            Username:<Field component={Input} name='username' validate={[reqiuredField]}/>
            Password:<Field component={Input} name='password' type='password' validate={[reqiuredField]}/>
            <button>Sign Up</button>
            {props.error && <Error message={props.error}/>}
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
        }).catch(error => {
            props.stopSubmit('signUp', {_error: error.response.data.errors[0]});
        }
        )
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
    setUser: setUserAC,
    stopSubmit: stopSubmit
}

export default compose(withAuthRedirect, connect(null, mapDispatchToProps))(SignUp);