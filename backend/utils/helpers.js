import _ from 'lodash'



export function filterLanguage(value, requestLanguage){

    // recursively scan all values. If value has a key equal to a language code,
    // return that instead of the whole object.

    if (value){
        if (Object.keys(value).indexOf(requestLanguage) > -1){
            return value[requestLanguage]
        } else {
            _.forOwn(value, (val, key)=>{
                if (val === Object(val)) {
                    value[key] = filterLanguage(val, requestLanguage)
                }
            })
            return value
        }
    } else {
        return null
    }
}


let keysMap = {
    _id: 'id',
    __v: 'v'
}

export function removeUnderscores(obj) {
    return _.transform(obj, (result, value, key) => {
        let currentKey = keysMap[key] || key
        result[currentKey] = _.isPlainObject(value) || _.isArray(value) ? removeUnderscores(value) : value
    })
}

export function diffByLanguage(objects, lang) {
    return objects.filter(obj => {
        if (!obj.diffLanguages) return false
        let found = obj.diffLanguages.find(lng => lng.code === lang)
        return !!found
    })
}