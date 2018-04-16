import mongoose from 'mongoose'
import User from '../../models/user'

function prepareData(){

    return Promise.all([
    ]).then(data => {

        return [
            {
                _id: mongoose.Types.ObjectId('507f1f77bcf86cd899439111'),
                name: 'system user',
                email: 'a',
                hash: 'a',
            },
            {
                name: 'Ben Johnson',
                email: 'b',
                hash: 'b',

            },
            {
                name: 'Clara Santa',
                email: 'c',
                hash: 'c',
            }
        ]

    })
}

function seedUser () {

    return prepareData()
        .then((data)=>{
            return User.create(data)
                .then(() => {
                    console.log('+ User seeded')
                })
                .catch((err)=> console.log(err))
        })
}

export default seedUser