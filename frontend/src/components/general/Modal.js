import React, { Component } from 'react'

class Modal extends Component {

    constructor(props){
        super(props)
        this.state = {
            open: false,
            heading: 'Are you sure',
            text: 'This is undoable',
            confirmFunction: () => {}
        }
    }

    close(){
        this.setState({open:false})
    }

    confirmAction(){
        this.close()
        this.state.confirmFunction()
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyboard.bind(this))
    }

    componentWillUnmount(){
        window.removeEventListener("keyup", this.handleKeyboard.bind(this));
    }

    handleKeyboard(event){
        if( event.keyCode === 27 ) { //esc
            if (this.state.open){
                this.close()
            }
        }

        if( event.keyCode === 13 ) { //enter
            if (this.state.open){
                this.confirmAction()
            }
        }
    }



    render() {

        const { text } = this.props;

        if (!this.state.open) return null

        return (

                <div className="modal">

                    <div className="modalForm">
                        <h1>{this.state.heading}</h1>
                        <div>{this.state.text}</div>

                        <div className="buttons">
                            <div className="cancelButton" onClick = {this.close.bind(this)}>{'cancel'}</div>
                            <div className="button" onClick = {this.confirmAction.bind(this)}>{'confirm'}</div>
                        </div>

                    </div>

                    <div className="shade" onClick = {this.close.bind(this)}></div>
                </div>
        )
    }

}

export default Modal;