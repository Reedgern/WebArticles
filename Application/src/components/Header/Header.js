import React from "react";
import {NavLink} from "react-router-dom";
import {authAPI} from "../../api/api";
import {setUserAC} from "../../redux/appReducer";
import {connect} from "react-redux";
import style from './Header.module.css';

const Header = (props) => {
    return (
        <div>
            <NavLink to={'/articles'}>Articles</NavLink>
            <div className={style.loginBlock}>
                {props.isAuth ?
                    <div>
                        {props.username}
                        <br/>
                        <button onClick={props.logout}>Logout</button>
                    </div> :
                    <div>
                        <NavLink to={'/signin'}>Sign In</NavLink>
                        <br/>
                        <NavLink to={'/signup'}>Sign Up</NavLink>
                    </div>}
            </div>
        </div>
    );
}

class HeaderContainer extends React.Component {
    getUser = () => {
        authAPI.me().then(response => {
            if (response.status === 200) {
                this.props.setUser(true, response.data.data.user.username);
            }
        })
    }

    logout = () => {
        localStorage.removeItem('userToken');
        this.props.setUser(false, null);
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <Header {...this.props} logout={this.logout}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.app.isAuth,
    username: state.app.username,
    userId: state.app.userId
});

const mapDispatchToProps = {
    setUser: setUserAC
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);