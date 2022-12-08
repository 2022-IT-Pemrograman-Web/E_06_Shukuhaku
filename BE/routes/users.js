const router = require('express').Router();
const db = require('../firebase/firestore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/kamars', async function (req, res, next) {
    try{
        var kamars = [];
        await db.collection("kamars").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                kamars.push({id: doc.id, ...doc.data()});
            });
        });
        console.log(kamars);
        res.json({message: "success", data: {kamars: kamars}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/kamars/:id', async function (req, res, next) {
    try{
        var kamar = await db.collection("kamars").doc(req.param('id')).get()
        console.log(kamar);
        res.json({message: "success", data: {kamar: kamar}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.post('/pemesanans', async function (req, res, next) {
    try{
        let end_date = new Date();
        end_date.setDate(end_date.getDate() + req.body.total_day); 
        const data = {
            kamar_id: req.body.kamar_id,
            user_id: req.body.kamar_id,
            total_day: req.body.total_day,
            total_price: req.body.total_price,
            start_date: new Date(),
            end_date: end_date,
        };
        const response = await db.collection('pemesanans').set(data);
        console.log(response);
        res.json({message: "success", data: {kamars: kamars}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

module.exports = router;