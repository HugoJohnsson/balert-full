const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    name: String,
    text: String,
    enabled: {
      type: Boolean,
      default: false
    },
    dismissable: Boolean,
    fontFamily: {
      type: String,
      default: 'Lexend Deca'
    },
    fontSize: {
      type: 'String',
      default: '16px'
    },
    localhost: {
      type: Boolean,
      default: false
    },
    fontUrl: {
      type: String,
      default: 'https://fonts.googleapis.com/css?family=Lexend+Deca:400italic,400,300,700'
    },
    backgroundColor: {
      type: String,
      default: '#41b693'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    hasLink: {
      type: Boolean,
      default: false
    },
    linkText: String,
    linkColor: String,
    linkTo: String,
    openLinkInNewWindow: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
});

bannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
bannerSchema.set('toJSON', {
    virtuals: true
});

bannerSchema.findById = function (cb) {
    return this.model('Banners').find({id: this.id}, cb);
};

const Banner = mongoose.model('Banners', bannerSchema);

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Banner.
        findOne({ _id: id }).
        exec(function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result);
          }
        });
    });
};

exports.findByUserAndEnabled = (userId) => {
    return new Promise((resolve, reject) => {
        Banner.
        findOne({ user: userId , enabled: true }).
        populate('user').
        exec(function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result);
          }
        });
    });
};

exports.createBanner = (bannerData) => {
    const banner = new Banner(bannerData);
    return banner.save();
};

exports.list = (userId, perPage, page) => {
    return new Promise((resolve, reject) => {
        Banner.find({user:userId})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, banners) {
                if (err) {
                    reject(err);
                } else {
                    resolve(banners);
                }
            })
    });
};

exports.patchBanner = (id, bannerData) => {
    return new Promise((resolve, reject) => {
        Banner.findById(id, function (err, banner) {
            if (err) reject(err);
            for (let i in bannerData) {
                banner[i] = bannerData[i];
            }
            banner.save(function (err, updatedBanner) {
                if (err) return reject(err);
                resolve(updatedBanner);
            });
        });
    })
};

exports.removeById = (bannerId) => {
    return new Promise((resolve, reject) => {
        Banner.deleteOne({_id: bannerId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
