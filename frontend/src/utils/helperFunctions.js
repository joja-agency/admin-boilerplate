import React, { Component, PropTypes } from 'react'

export function getFetchConfig(body, method){

    let token = localStorage.getItem('token') || null
    if (token === null) throw "no token saved"

    let config = {
        headers: {
            'Content-Type' : 'application/json',
            'x-access-token': `${token}`,
        },
        method: method,
        body: JSON.stringify(body),
    }

    return config
}


export function getDeleteConfig(){

    let token = localStorage.getItem('token') || null
    if (token === null) throw "no token saved"

    let config = {
        headers: {
            'Content-Type' : 'application/json',
            'x-access-token': `${token}`,
        },
        method: 'DELETE'
    }

    return config
}

export function getFetchConfigGet(method){

    let token = localStorage.getItem('token') || null
    if (token === null) throw "no token saved"

    let config = {
        headers: {
            'Content-Type' : 'application/json',
            'x-access-token': `${token}`,

        },
        method: method
    }

    return config
}



export function getFileFetchConfig(body, method){

    let token = localStorage.getItem('token') || null
    if (token === null) throw "no token saved"

    let config = {
        headers: {
            'x-access-token': `${token}`,
        },
        method: method,
        body: body,
    }

    return config
}


export function genId (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)){
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
}

