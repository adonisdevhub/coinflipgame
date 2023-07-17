const express = require('express');
const User = require('../models/User');

const router = express.Router();

const numArr = [];

const setNumArr = () => {
    let fcnt = 12;
    let tcnt = 8;

    do {
        let rand = Math.floor(Math.random() * 2);
        if (fcnt == 0) {
            rand = 1;
        } else if (tcnt == 0) {
            rand = 0;
        }
        numArr.push(rand);
        if (rand) {
            tcnt--;
        } else {
            fcnt--;
        }
    } while ( numArr.length < 20 )
}


router.post('/login', (req, res) => {
    const { address } = req.body;
    User.findOne({ address: address})
        .then(user => {
            if(!user){
                let n_user = new User({
                    address: address,
                    name: "",
                    coin: null
                });
                n_user.save();
                res.json({user: n_user});
            } else {
                res.json({user: user});
            }
        }).catch(err => res.json({message: err}));
});

router.post('/flip', (req, res) => {
    if (numArr.length == 0) {
        setNumArr();
    }
    // update user and history
    const result = numArr.shift();
    res.json({result});
});

router.post('/update', (req, res, next) => {
    const user = req.body.user;
    const { name, address } = user;
    User.findOneAndUpdate({ address: address }, { $set: { name: name } }, function(err) {
        if (err) {
            res.send({ message: err });
            next();
        } else {
            res.send({ message: "Username changed successfully!" });
        }
    })
})

module.exports = router;