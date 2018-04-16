import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import UserForm from './UserForm'
import UserList from './UserList'
import * as UserActions from '../../actions/user'

class Users extends Component {

    componentDidMount(){
        const {userActions, userList} = this.props
        if (userList.length === 0) userActions.fetchUsers()
    }

    render() {

        const {
            userActions,
            userList,
            userForm, 
            loaded,
            user,
        } = this.props

        return (
            <div className="appContent">

                <div className="createButtons">
                    <div className="button"
                        onClick = {() => {userActions.userFormClear(); userActions.userFormUpdate('visible', true)}}>
                        Add new user
                    </div>
                </div>


                {!loaded &&
                <div className="loadingData">
                    <div className="loader"></div>
                </div>}


                {loaded &&
                    <div>
                        <UserList
                            users={userList}
                            userEdit={(user) => userActions.userFormSet(user)}
                            userDelete={(id) => userActions.userDelete(id)}
                            currentUser={user}
                        />

                        {userForm.visible &&
                            <UserForm
                            />
                        }
                    </div>
                }

            </div>
        )
    }

}

Users.propTypes = {
}

function mapStateToProps(state) {

    const {userList, userForm, loaded} = state.users
    const {user} = state.auth

    return {
        userList,
        userForm,
        loaded,
        user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Users)