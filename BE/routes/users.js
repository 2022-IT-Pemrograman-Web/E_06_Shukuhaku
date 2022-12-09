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
        let doc = await db.collection("kamars").doc(req.param('id')).get();
        let kamar = {id: doc.id, ...doc.data()};
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
            checked_out: null,
        };
        const response = await db.collection('pemesanans').set(data);
        console.log(response);
        const response2 = await db.collection('kamars')
                                    .doc(req.body.kamar_id)
                                    .update({available: end_date});
        res.json({message: "success", data: data});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/pemesanans/user', async function (req, res, next) {
    try{
        let user = req.user;
        let pemesanans = [];
        await db.collection("pemesanans").where("user_id", "==", user.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                pemesanans.push({id: doc.id, ...doc.data()});
            });
        });
        console.log(pemesanans);
        res.json({message: "success", data: {pemesanans: pemesanans}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.post('/pemesanans/checkout', async function (req, res, next) {
    try{
        let id = req.body.id;
        let checked_out = new Date();
        const pemesananRef = await db.collection('pemesanans').doc(id);
        const response = await pemesananRef.update({checked_out: checked_out});
        console.log(response);
        let pemesanan = pemesananRef.get();
        const response2 = await db.collection('kamars')
                                    .doc(pemesanan.data().kamar_id)
                                    .update({available: null});
        console.log(response2);
        
        res.json({message: "success", data: {checked_out: checked_out}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

module.exports = router;