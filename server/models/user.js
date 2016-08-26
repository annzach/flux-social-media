// this jwt secret MUST NOT BE COMMITTED!
// it should be kept as an env variable
const JWT_SECRET = 'q3w4de5frg6t7hyj8u9ki0u98y7t6r5e';

const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:{type:String},
  age:{type:Number},
  imageurl:{type:String},
  address:{type:String}
});

userSchema.statics.register = function(userObj, cb) {
  this.findOne({username: userObj.username}, (err, dbUser) => {
    if(err) return cb(err);
    if(dbUser) return cb({error: 'Username already taken.'});

    bcrypt.genSalt(11, (err, salt) => {
      if(err) return cb(err);
      bcrypt.hash(userObj.password, salt, null, (err, hash) => {
        if(err) return cb(err);

        userObj.password = hash;

        this.create(userObj, (err, newUser) => {
          cb(err);
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(userObj, cb) {
  let { username, password } = userObj;

  this.findOne({ username }, (err, dbUser) => {
    if(err || !dbUser) {
      return cb(err || {error: 'Login failed.  Username or password incorrect.'});
    }

    bcrypt.compare(password, dbUser.password, (err, isGood) => {
      if(err) return cb(err);
      if(!isGood) return cb({error: 'Login failed.  Username or password incorrect.'});

      let payload = {
        _id: dbUser._id
      }

      jwt.sign(payload, JWT_SECRET, {}, cb);
    })
  });
};

userSchema.statics.authMiddleware = function(req, res, next) {
  let token = req.cookies.authtoken;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send(err);

    mongoose.model('User')
      .findById(payload._id)
      .select('-password')
      .exec((err, user) => {
        if(err) return res.status(400).send(err);
        if(!user) return res.status(401).send({error: 'User not found.'});

        req.user = user;
        next();
      });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
