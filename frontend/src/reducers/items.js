import update from 'immutability-helper'

function createDefaultForm(){

    let form = {
        visible: false,
        name: '',
    }

    return form
}


export default function items(state = {
    loaded: false,
    itemList: [],
    formOpen: false,
    itemForm: createDefaultForm()
}, action) {

    switch (action.type) {

        case 'ITEMS_SUCCESS':
            return Object.assign({}, state, {
                loaded: true,
                itemList: JSON.parse(action.response),
            })

        case 'ITEM_FORM_UPDATE':
            return update(state, {itemForm: {[action.key]:{$set: action.value }} })
        case 'ITEM_FORM_SET':
            return update(state, {itemForm: {$set: action.data } })
        case 'ITEM_FORM_CLEAR':
            return update(state, {itemForm: {$set: createDefaultForm() } })

        case 'ITEM_NEW':
            return update(state, {itemList: {$push: [action.item]} })
        case 'ITEM_UPDATE':
            let updateItemIndex = state.itemList.findIndex((el)=> el.id === action.item.id)
            return update(state, {itemList: {[[updateItemIndex]]: {$set: action.item }}})
        case 'ITEM_DELETE':
            let itemIndex = state.itemList.findIndex((el)=> el.id === action.id)
            return update(state, {itemList: {$splice: [[itemIndex, 1]] } })

        default:
            return state
    }
}