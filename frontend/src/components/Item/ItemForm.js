import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import history from '../../utils/history'

import * as ItemActions from '../../actions/item'
import SaveCancelButtons from '../general/SaveCancelButtons'

class ItemForm extends Component {

    constructor(props, context) {
        super(props, context)
    }

    // clear form (set to default values) or fill in with product
    componentWillMount(){
        const { itemActions, item } = this.props

        itemActions.itemFormClear()

        if (item) {
            itemActions.itemFormSet(item)
        }
    }

    validateForm(){
        const {form} = this.props

        let valid = true

        if (form.name.length === 0) valid = false

        return valid
    }

    updateField(e){
        const { itemActions } = this.props
        itemActions.itemFormUpdate(e.target.name, e.target.value)
    }


    render() {

        const {
            form,
            itemActions,
        } = this.props


        return (

            <div className="fullForm">

                <div className="itemForm">

                    <h1>Item: {form.name}</h1>

                    <label>Name</label>
                    <input
                        ref="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => this.updateField(e)}
                    />

                    <SaveCancelButtons
                        validateFunction = {() => this.validateForm()}
                        cancelFunction = {()=>history.push(`/items`)}
                        saveFunction = {() => {
                            if (!this.validateForm()) return
                            itemActions.itemSave(form)
                            history.push(`/items`)
                        }}
                    />

                </div>

            </div>
        )
    }

}


function mapStateToProps(state, ownProps) {

    const { itemList, itemForm } = state.items

    const item = itemList.find((el)=> JSON.stringify(el.id) === JSON.stringify(ownProps.match.params.id))

    return {
        form: itemForm,
        item,
        itemList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemActions: bindActionCreators(ItemActions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemForm))
