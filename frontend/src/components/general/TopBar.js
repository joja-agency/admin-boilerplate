import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NotificationSystem  from 'react-notification-system'

import {toggleMenu} from '../../actions/ui'

import {notifyStyle, tabletBreak} from '../../utils/constants'

class TopBar extends Component {

    componentDidMount(){
        const { toggleMenu } = this.props

        window.addNotification =this.refs.notify.addNotification

        if (window.innerWidth < tabletBreak) toggleMenu()

        window.addEventListener("resize", this.handleResize.bind(this));
    }


    handleResize(){
        const { ui, toggleMenu } = this.props

        if (window.innerWidth < tabletBreak && ui.menuOpen) {
            toggleMenu()
        } else if (window.innerWidth > tabletBreak && !ui.menuOpen) {
            toggleMenu()
        }
    }

    toggleMenu(){
        const { toggleMenu } = this.props
        toggleMenu()
    }

    render() {

        const { user, logout } = this.props

        return (
            <div>
                <div className = "topBar">

                    <div className="leftSide">
                        <img onClick={this.toggleMenu.bind(this)} className="menuIcon" src="/assets/images/menu.svg"/>

                        <div className="logo"></div>
                    </div>

                    <div className="userSection" >
                        <div className="userAvatar">
                            <img src={`/assets/avatars/${user.avatar}`}/>
                        </div>
                        <div className="userName">{user.name}</div>
                        <img className="caretDown" src="/assets/images/down.svg"/>
                        <div className="dropdown dropdownUser">
                            <div className="dropdownItem logout" onClick={logout}>{'Logout'}</div>
                        </div>
                    </div>

                </div>

                <NotificationSystem
                    ref="notify"
                    style={notifyStyle}
                    level = "success"
                />

            </div>
        )
    }

}

TopBar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

function mapStateToProps(state) {

    const {ui} = state

    return {
        ui
    }
}

let mapDispatchtoProps = {
    toggleMenu
}

export default connect(mapStateToProps, mapDispatchtoProps)(TopBar)

