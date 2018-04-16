import React, { Component } from 'react'
import classnames from 'classnames'

import {
    Link
} from 'react-router-dom'


export default class Menu extends Component {


    getLink(link, title){

        const {location} = this.props

        let linkClasses = classnames('menuLink', title, {
            "active":location.pathname.indexOf(link) > -1
        })

        return <Link to={link}>
                    <div className={linkClasses}>{title}</div>
               </Link>
    }

    render() {

        const { location } = this.props

        return (
            <div className="mainMenu">
                <div className="menuLinks">
                    {this.getLink("/items",           'Items')}
                    {this.getLink("/users",           'Users')}
                </div>
            </div>
        )
    }

}