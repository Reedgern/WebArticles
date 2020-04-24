import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    isAuth: state.app.isAuth
});

const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth) {
                return <Redirect to={'/'}/>
            }
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToProps, null)(RedirectComponent);
}

export default withAuthRedirect;