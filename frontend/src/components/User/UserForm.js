import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'

import Select from 'react-select'

class UserForm extends Component {

    validForm(){
        const {form} = this.props

        let errorClass = 'error'
        let valid = true

        if (form.name.length === 0) {
            this.refs.name.classList.add(errorClass)
            valid = false
        } else this.refs.name.classList.remove(errorClass)

        if (form.email.length === 0) {
            this.refs.email.classList.add(errorClass)
            valid = false
        } else this.refs.email.classList.remove(errorClass)

        return valid
    }

    render() {

        const { form, userActions } = this.props

        return (

                <div className="formWrap">

                    <div className="form userForm">
                        <h1>User</h1>

                        <label>Name</label>
                        <input
                            ref="name"
                            type="text"
                            value={form.name}
                            onChange={(e) => userActions.userFormUpdate('name', e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            ref="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => userActions.userFormUpdate('email', e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            ref="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => userActions.userFormUpdate('password', e.target.value)}
                            placeholder={form.id ? 'leave empty' : ''}
                        />

                        <div className="saveCancelButtons">
                            <div className="cancelButton" onClick = {()=>userActions.userFormUpdate('visible', false)}>{'cancel'}</div>
                            <button onClick = {() => {
                                if (!this.validForm()) return
                                userActions.userSave(form)
                                userActions.userFormUpdate('visible', false)}
                            }>{'save'}</button>
                        </div>

                        </div>

                    <div className="shade" onClick = {()=>userActions.userFormUpdate('visible', false)} />

                </div>
        )
    }

}

UserForm.propTypes = {
}

function mapStateToProps(state) {

    const { userForm } = state.users

    return {
        form: userForm,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
