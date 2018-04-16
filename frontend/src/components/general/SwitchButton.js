import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class SwitchButton extends Component {


    render() {

        let name = this.props.name + Date.now()

        return (

            <div className={'switchCheckBox ' + ( this.props.disabled ? " disabled" : "") }>

                <label htmlFor={name}>{this.props.label}</label>

                <input
                   id = {name}
                   name = {name}
                   className="checkBoxInput"
                   type="checkbox"
                   checked={this.props.checked}
                   defaultChecked={this.props.defaultChecked}
                   disabled={this.props.disabled}
                   onChange={this.props.onChange}
                />

                <label htmlFor={name}>
                </label>


            </div>
        )
    }

}

SwitchButton.propTypes = {
    name: React.PropTypes.string.isRequired,
}