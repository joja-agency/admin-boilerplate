import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {Switch,Route, Link} from 'react-router-dom'

import ItemForm from './ItemForm'

import history from '../../utils/history'

import ItemList from './ItemList'
import * as ItemActions from '../../actions/item'


class Items extends Component {

    componentDidMount(){
        const {itemActions, itemList} = this.props
        if (itemList.length === 0) itemActions.fetchItems()
    }

    render() {

        const {
            itemActions,
            itemList,
            loaded,
            location,
        } = this.props


        return (
            <div className="appContent">

                {(location === '/items' || location === '/')  &&
                <div>

                    <h1>Items ({itemList.length})</h1>

                    <div className="createButtons">
                        <Link to="/items/new">
                            <button className="createNewItem">{"Add new item"}</button>
                        </Link>
                    </div>


                    {!loaded &&
                    <div className="loadingData">
                        <div className="loader"/>
                    </div>
                    }


                    {loaded && itemList.length === 0 ?

                        <div className="emptyPageNote">{"NoRecordsFound"}</div>

                        :

                        <ItemList
                            items={itemList}
                            itemEdit={(item) => history.push(`/items/${item.id}`)}
                            itemDelete={(id) => itemActions.itemDelete(id)}
                        />
                    }

                </div>
                }

            <Switch>
                <Route path={`${this.props.match.url}/new`} component={ItemForm}/>
                <Route path={`${this.props.match.url}/:id`} component={ItemForm}/>
            </Switch>

            </div>
        )
    }

}

Items.propTypes = {
}

function mapStateToProps(state, ownProps) {

    const {itemList, loaded} = state.items


    return {
        itemList,
        loaded,
        location: ownProps.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemActions: bindActionCreators(ItemActions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Items)