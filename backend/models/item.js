import mongoose from 'mongoose';


var ItemSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {
        timestamps: true
    }
);


ItemSchema.statics = {

    get(id) {
        return this.findById(id)
            .exec()
            .then((item) => {
                if (item) {
                    return item
                }
                return Promise.reject('No such item exists!')
            })
            .then(item => {
                return item
            })
    },

    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .then(items =>{
                return items
            });
    },


    getPublic(id) {
        return this.findById(id)
            .lean()
            .then((item) => {
                if (item) {
                    return item
                }
                return Promise.reject('No such item exists!')
            })
            .then(item => {
                return item
            })
    },

    listPublic() {
        return this.find()
            .sort({ createdAt: -1 })
            .then(items =>{
                return items
            });
    }
    
}


ItemSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model('Item', ItemSchema)