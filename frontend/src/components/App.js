import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Login from './general/Login'
import { loginUser, getUserInfo, logoutUser} from '../actions/authorisation'

import TopBar from './general/TopBar'
import Menu from './general/Menu'

import Items from './Item/Items'

import {
    withRouter
} from 'react-router-dom'



require ('../../assets/css/main.scss');


class App extends Component {

    componentWillMount(){

        const { dispatch, isAuthenticated, hasUserData } = this.props

        if (isAuthenticated && !hasUserData){
            dispatch(getUserInfo())
        }

    }

    render() {
        const { dispatch, isAuthenticated, errorMessage, user, hasUserData, permissions, ui, location } = this.props

        let contentClasses = classNames('content', {menuOpen: ui.menuOpen})

        return (
            <div>

                {/* if not logged in just show log in form*/}
                {!isAuthenticated &&
                    <Login
                        errorMessage={errorMessage}
                        onLoginClick={ creds => dispatch(loginUser(creds)) }
                    />
                }


                {/* if logged in, but we have no data about user (tab was closed) */}
                {isAuthenticated && !hasUserData &&
                    <div className="loadingData">
                        <div className="loader"></div>
                    </div>
                }



                {/* if logged in */}
                {isAuthenticated && hasUserData &&
                    <div className='container'>

                        <TopBar
                            user = {user}
                            permissions = {permissions}
                            logout = {()=>dispatch(logoutUser())}
                        />

                        <div className={contentClasses}>

                            {ui.menuOpen &&
                                <Menu permissions={permissions} location = {location}/>
                            }

                            <div className="subContent">
                                {this.props.children}
                            </div>

                        </div>

                    </div>
                }



            </div>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
}

function mapStateToProps(state, ownProps) {

    const { auth } = state
    const { isAuthenticated, errorMessage, user, hasUserData, permissions} = auth
    const { ui } = state

    return {
        user,
        permissions,
        isAuthenticated,
        hasUserData,
        errorMessage,
        ui,
        location: ownProps.location
    }
}

export default withRouter(connect(mapStateToProps)(App))

