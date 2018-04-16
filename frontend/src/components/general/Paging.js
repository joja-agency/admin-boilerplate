import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


export default class Paging extends Component {

    render() {

        let pageCount = Math.ceil(this.props.itemCount/this.props.itemsPerPage)
        let showPrevious = this.props.currentPage !== 1
        let showNext = pageCount > this.props.currentPage
        let spread = [...Array(pageCount).keys()]
        
        let classes = classNames('pagingItem', {invertColor: this.props.invertColor})

        return (
            <div className="paging">

                {showPrevious &&
                <div className={classes} onClick={(e) => this.props.changePage(this.props.currentPage-1)}>
                    &lt;
                </div>}

                {pageCount > 1 && spread.map(x => {
                    
                    let pageClasses = classNames('pagingItem', {
                        current: x+1 === this.props.currentPage, 
                        invertColor: this.props.invertColor})
                    
                    return <div key={x} className={pageClasses} onClick={(e) => this.props.changePage(x+1)}>{x+1}</div>
                })}

                {showNext &&
                <div className={classes} onClick={(e) => this.props.changePage(this.props.currentPage+1)}>
                    &gt;
                </div>}

            </div>
        )
    }

}

Paging.propTypes = {
    itemCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    changePage: PropTypes.func
}