import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

class LanguageButtons extends Component {


    render() {

        const {languages, clickFunction, activeLang} = this.props

        //require(`../../assets/img/flags/${lang.id}.png`)

        return (
            <div className="languageFlags">
                {languages.map(lang => {
                    let flagClasses = classnames('flagButton', {active: activeLang === lang.code})
                    return <div
                        key = {lang.code}
                        className={flagClasses}
                        onClick={() => clickFunction(lang.code)}
                    >
                        <img className="flagIcon" src={require(`../../../assets/img/flags/${lang.code}.png`)}/>
                        {lang.name}
                    </div>
                })}
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {


    const {languages} = state.settings

    return {
        languages
    }
}

export default connect(mapStateToProps)(LanguageButtons)


