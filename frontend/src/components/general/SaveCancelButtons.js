import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class SaveCancelButtons extends Component {

    constructor(){
        super()
        //without this, handler is not removed
        this.bound_handler = this.handleKeyboard.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keyup", this.bound_handler, false)
    }

    componentWillUnmount(){
        window.removeEventListener("keyup", this.bound_handler, false);

    }

    handleKeyboard(event){

        const {cancelFunction, saveFunction, validateFunction} = this.props

        // if( event.keyCode === 27 ) { //esc
        //     cancelFunction()
        // }

        // if( event.keyCode === 13 ) { //enter
        //     if (!validateFunction()) return
        //     saveFunction()
        // }
    }

    render() {

        const {cancelFunction, saveFunction, validateFunction} = this.props

        return (
            <div className="saveCancelButtons">

                <button
                    className="saveButton"
                    onClick = {() => saveFunction()}
                    disabled = {!validateFunction()}
                >
                    {"save"}
                </button>

                <div className="cancelButton" onClick = {() => cancelFunction()}>
                    {"cancel"}
                </div>

            </div>
        )
    }

}
