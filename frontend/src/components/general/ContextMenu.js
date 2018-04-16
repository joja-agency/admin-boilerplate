import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class ContextMenu extends Component {


    render() {



        return (
            <div className="contextMenu">

                <div className="contextTitle">{this.props.title}</div>

                <div className="contextMenuItems">
                    {this.props.items.map(i => {

                        let itemClass = classnames('contextMenuItem', {active: this.props.active === i.name})

                        return  <div className={itemClass} key={i.name} onClick={i.click}>
                                    {i.name}
                                </div>
                    }
                    )}
                </div>
            </div>
        )
    }

}

ContextMenu.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
}