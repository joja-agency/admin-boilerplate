import React, { Component } from 'react'
import Modal from '../general/Modal'
import {getToken} from '../../utils/constants'


export default class itemList extends Component {

    handleEditItem(evt, id){
        const {items, itemEdit} = this.props

        if (evt.target && evt.target.className.indexOf('deleteButton') > -1) return

        let item = items.find(el => el.id === id)

        itemEdit(item)
    }

    handleDelete(id){
        const {items, itemDelete} = this.props
        let item = items.find(el => el.id === id)

        this.refs.modal.setState({
            open:true,
            heading: "Really delete",
            text: "You are about to delete" + " " + item.dbId + ". " +  "This is undoable",
            confirmFunction: itemDelete.bind(null, id)
        })
    }

    renderItems(){

        let { items } = this.props

        return (
            <div className="list">

                {items.map((item, j)=> {

                    return (
                    <div className="listItem" key={j} onClick={(evt) => this.handleEditItem(evt, item.id)}>

                        <div className="item">{item.name}</div>

                        <div className="listItemControls">
                            <div className="listButton editButton"
                                 onClick={(evt) => this.handleEditItem(evt, item.id)}
                                 data-tooltip={'edit'}
                            ></div>
                            <div className="listButton deleteButton"
                                 onClick={() => this.handleDelete(item.id)}
                                 data-tooltip={'delete'}
                            ></div>
                        </div>
                    </div>
                    )})}

            </div>
        )

    }

    render() {

        return (
            <div>
                <div className="">
                    {this.renderItems()}
                </div>

                <Modal ref = "modal"/>
            </div>
        )
    }

}
