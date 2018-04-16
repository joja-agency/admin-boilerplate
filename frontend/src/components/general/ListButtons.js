import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lang from '../../utils/i18n'


export default class ListButtons extends Component {

    render() {

        return (
            <div className="listButtons">
                <div className="listButton selectButton"
                     data-tooltip={lang.t('select all')}
                     onClick={this.props.selectAction}>
                </div>
                <div className="listButton copyButton"
                     data-tooltip={lang.t('copy')}
                     onClick={this.props.copyAction}>
                </div>
                <div className="listButton deleteButton"
                     data-tooltip={lang.t('delete')}
                     onClick={this.props.deleteAction}>
                </div>
            </div>
        )
    }

}

ListButtons.propTypes = {
    selectAction: PropTypes.func.isRequired,
    copyAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
}