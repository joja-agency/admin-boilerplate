import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, index: { unique: true } },
        avatar: { type: String, default: 'placeholder.png' },
        language: { type: String, default: 'en' },
        hash: { type: String, required: true },
    },
    {
        timestamps: true
    }
);


UserSchema.pre('save', function(next) {
    let user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('hash')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.hash, salt, function(){}, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.hash = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.hash, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


UserSchema.statics = {

    findByUsername (username, cb) {
        return this.findOne({username: username}, cb);
    },

    get(id) {
        return this.findById(id)
            .populate('permissions')
            .exec()
            .then((user) => {
                if (user) {
                    return user
                }
                return Promise.reject('No such user exists!')
            });
    },

    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .populate('permissions')
            .exec();
    }
    
}


UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model('User', UserSchema)
