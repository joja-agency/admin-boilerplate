import React, { Component } from 'react'
import {Link} from 'react-router'


export default class NewButton extends Component {

    render() {

        const {title, action} = this.props

        return (
            <div className="newButtonComponent">
                <div className="newButtonTitle">{title}</div>
                <div className="newButton" onClick={action}>+</div>
            </div>
        )
    }

}
