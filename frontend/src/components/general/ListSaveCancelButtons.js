import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class ListSaveCancelButtons extends Component {

    render() {

        return (
            <div className="formItemControls">
                <div className="listButton cancelButtonForm"
                     onClick={this.props.cancelAction}
                >
                    <div className="listButton icon"></div>
                    <span>{'cancel'}</span>
                </div>
                <div className="listButton saveButtonForm"
                     onClick={this.props.saveAction}
                >
                    <div className="listButton icon"></div>
                    <span>{'save'}</span>
                </div>
            </div>
        )
    }

}

ListSaveCancelButtons.propTypes = {
    cancelAction: PropTypes.func.isRequired,
    saveAction: PropTypes.func.isRequired,
}