const express = require('express');
let mongoose = require('mongoose');
const router = express.Router();
let User = mongoose.model('User');

router.post('/register', (req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    newUser.save((err) => {
        if(err) {
            res.send(err);
        } else {
            res.json({token: newUser.generateJWT()})
        }
    })
})

router.post('/login', ((req, res) => {
    User.findOne({email: req.body.email}, ((err, user) => {
        if(err) {
            res.sendStatus(500)
        } else {
            if(user.validatePassword(req.body.password)) {
                res.json({token: user.generateJWT()})
            } else {
                res.json('Incorrect Password')
            }
        }
    }))
}))

module.exports = router;