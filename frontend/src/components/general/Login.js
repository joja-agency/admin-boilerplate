import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Login extends Component {

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.username).focus()
    }

    handleClick(event) {
        event.preventDefault();
        const username = this.refs.username
        const password = this.refs.password
        const creds = { username: username.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }

    render() {
        const { errorMessage } = this.props

        return (
            <div className="loginWrap">
                <div className="loginForm">
                    <div className="logo"></div>
                    <form>
                        <div className="loginInput">
                            <input className="loginInputField" type='text' ref='username' placeholder={'Email'}/>
                        </div>
                        <div className="loginInput">
                            <input className="passInputField" type='password' ref='password' placeholder={'Password'}/>
                        </div>
                        <button className="loginButton" onClick={(e) => this.handleClick(e)}>{'Login'}</button>
                        {errorMessage && <p className="loginError">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        )
    }

}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
}