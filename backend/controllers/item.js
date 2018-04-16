import Item from '../models/item'


function getObject(req) {
    return {
        name: req.body.name,
    }
}

function get(req, res, next) {
    Item.get(req.params._id)
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

function create(req, res, next) {

    const item = new Item(
        getObject(req)
    )

    item.save()
        .then(savedItem => res.json(savedItem))
        .catch(e => next(e))
}

function update(req, res, next) {
    Item.findByIdAndUpdate(req.params._id, {$set:req.body}, {new: true})
        .then((savedRecord) => {
            res.json(savedRecord)
        })
        .catch(e => next(e))
}

function list(req, res, next) {
    Item.list()
        .then(items => res.json(items))
        .catch(e => next(e))
}


function remove(req, res, next) {
    Item.findByIdAndRemove(req.params._id)
        .then(() => res.json('ok'))
        .catch(e => next(e))
}


// ------  PUBLIC

function getPublic(req, res, next) {
    Item.getPublic(req.params._id)
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

function listPublic(req, res, next) {
    Item.listPublic()
        .then(items => {
            res.json(items)
        })
        .catch(e => next(e))
}



export default { get, create, update, list, remove, listPublic, getPublic }
