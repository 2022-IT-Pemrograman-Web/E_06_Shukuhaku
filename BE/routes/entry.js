const router = require('express').Router();
const db = require('../firebase/firestore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async function (req, res, next) {
    try{
        const id = req.body.email;
        const data = {
            name: req.body.name, 
            email: req.body.email, 
            password: await bcrypt.hash(req.body.password, 10),
            role: 'user',
        };
        const response = await db.collection('users').doc(id).set(data);
        console.log(response);
        res.json({message: "Success", data: data });
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
    
});
router.post('/login', async function (req, res, next) {
    try{
        const id = req.body.email;
        const user = await db.collection('users').doc(id).get();
        bcrypt.compare(req.body.password, user.password, function(result) {
            if(result){
                const token = jwt.sign({ user: user }, req.app.get('secretKey'), { expiresIn: '3h' });
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 3 * 60 * 60 * 1000, // 3hrs in ms
                });
                res.json({
                    message: "Auth Success!!!", 
                    data: { user: user } 
                });
            } else {
                res.status(400).json({
                    message: "Invalid email/password!!!", 
                    data: null 
                });
            }
        });
    } catch(err){
        res.send(err)
    }
});

// router.get('/read', async function(req, res){
//     try {
//         const userRef = db.collection("users").doc(req.body.id);
//         const response = await userRef.get();
//         res.send(response.data());
//     } catch(error) {
//         res.send(error);
//     }
// });

module.exports = router;