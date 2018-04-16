import React, { Component } from 'react'
import Modal from '../general/Modal'

export default class UserList extends Component {

    handleEditUser(evt, id){
        const {users, userEdit} = this.props

        if (evt.target && evt.target.className.indexOf('deleteButton') > -1) return

        let user = users.find(usr => usr.id === id)
        userEdit(user)
    }

    handleDelete(id){
        const {users, userDelete} = this.props
        let user = users.find(el => el.id === id)

        this.refs.modal.setState({
            open:true,
            heading: "Really delete",
            text: "You are about to delete" + " " + user.name + ". " + "This is undoable",
            confirmFunction: userDelete.bind(null, id)
        })
    }

    renderUsers(){

        let {users, currentUser} = this.props

        let sysUser = '507f1f77bcf86cd899439111' // hardcoded system user
        
        return <div className="list">
                            {users.map((user, j) => {
                                
                                let isSystemUser = user.id === sysUser
                                let currentUserIsSys = currentUser.id === sysUser
                                
                                let editFunc = currentUserIsSys || !isSystemUser ? (evt) => this.handleEditUser(evt, user.id) : () => {}
                                
                                return (
                                <div className="listItem" key={j} onClick={editFunc}>

                                    <div className="item" style={{minWidth: "200px"}}>{user.name}</div>
                                    <div className="item lowContrast">{user.email}</div>

                                    <div className="listItemControls">
                                        {(!isSystemUser || currentUserIsSys) &&
                                        <div className="listButton editButton"
                                             onClick={(evt) => this.handleEditUser(evt, user.id)}
                                             data-tooltip={'edit'}
                                        ></div>
                                        }
                                        {!isSystemUser &&
                                        <div className="listButton deleteButton"
                                             onClick={this.handleDelete.bind(this, user.id)}
                                             data-tooltip={'delete'}
                                        ></div>
                                        }
                                    </div>
                                </div>
                                )
                            })}
        </div>
    }

    render() {

        return (
            <div>
                <div className="userList">
                    {this.renderUsers()}
                </div>

                <Modal ref = "modal"/>
            </div>
        )
    }

}

UserList.propTypes = {
}