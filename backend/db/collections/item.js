import mongoose from 'mongoose'
import Item from '../../models/item'
import slug from 'slug'
const chance = require('chance').Chance()

let array =
    [
        {
            name: "My item",
        },
    ]


for (let i = 2; i < 12; i++) {

    let item = {
        name: chance.sentence({words: 2}) ,
    }

    array.push(item)
}

function seedItem() {

    return Item.create(array)
        .then(() => {
            console.log('+ Item seeded')
        })
        .catch((err)=> console.log(err))

}



export default seedItem