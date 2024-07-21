const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET;

console.log("jwt secret: ", JWT_SECRET);

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Please set it in the .env file.");
}

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;
