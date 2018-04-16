import mongoose from 'mongoose'
import config from '../config/env'

mongoose.connect(config.migration, {useMongoClient: true})
mongoose.Promise = global.Promise //use ES6 native Promises


import seedUser from './collections/user'
import seedItem from './collections/item'


//sequence is important!
let seeds = [
    seedUser,
    seedItem,
]


// drop entire db before new migration
mongoose.connection.once('connected', () => {
    
    mongoose.connection.db.dropDatabase()
        .then(() => {
            console.log('Database droped')
        })
        .then(()=> {
            console.log('Seeding collections..')
        })
        .then(()=> {

            let result = Promise.resolve()

            seeds.forEach(seed => {
                result = result.then(() => seed())
            })

            result.then(() => process.exit())
            
            result.catch(err => console.log(err))
            
        })
    
})






