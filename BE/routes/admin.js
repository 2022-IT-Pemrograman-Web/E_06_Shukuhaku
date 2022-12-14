const router = require('express').Router();
const db = require('../firebase/firestore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/users', async function (req, res, next) {
    try{
        var users = [];
        await db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push({id: doc.id, ...doc.data()});
            });
        });
        console.log(users);
        res.json({message: "success", data: {users: users}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/users/:id', async function (req, res, next) {
    try{
        let doc = await db.collection("users").doc(req.param('id')).get();
        let user = {id: doc.id, ...doc.data()};
        console.log(user);
        res.json({message: "success", data: {user: user}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.post('/kamars', async function (req, res, next) {
    try{
        let id = req.body.id;
        const data = {
            class: req.body.class,
            price: req.body.price,
            available: true,
            facility: {
                balcony: req.body.balcony,
                ac: req.body.ac,
                tv: req.body.tv,
                living_room: req.body.living_room,
                bed: req.body.bed,
                breakfast: req.body.breakfast,
                bathroom: req.body.bathroom,
                private_onsen: req.body.private_onsen,
            }
        };
        const response = await db.collection('kamars').doc(id).set(data);
        console.log(response);
        res.json({message: "success", data: {id: id, ...data}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.put('/kamars', async function (req, res, next) {
    try{
        let id = req.body.id;
        const data = {
            class: req.body.class,
            price: req.body.price,
            available: req.body.available,
        };
        const response = await db.collection('kamars').doc(id).update(data);
        console.log(response);
        res.json({message: "success", data: {id: id, ...data}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.delete('/kamars', async function (req, res, next) {
    try{
        let id = req.body.id;
        const response = await db.collection('kamars').doc(id).delete();
        console.log(response);
        res.json({message: "successfully deleted", data: {id: id}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/pemesanans', async function (req, res, next) {
    try{
        var pemesanans = [];
        await db.collection("pemesanans").get().then((querySnapshot) => {
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

router.get('/pemesanans/user/:id', async function (req, res, next) {
    try{
        let pemesanans = [];
        await db.collection("pemesanans").where("user_id", "==", req.param('id')).get().then((querySnapshot) => {
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

router.put('/pemesanans/:id', async function (req, res, next) {
    try{
        const data = {
            kamar_id: req.body.kamar_id,
            user_id: req.body.kamar_id,
            total_day: req.body.total_day,
            total_price: req.body.total_price,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            checked_out: req.body.checked_out,
        };
        const ref = await db.collection('pemesanans').doc(id);
        const refdata = await ref.get();
        if(refdata.data().checked_out == null && req.body.checked_out != null){
            const response2 = await db.collection('kamars')
                                    .doc(req.body.kamar_id)
                                    .update({available: null});
            console.log(response2);
        }
        const response = await ref.update(data);
        console.log(response);
        res.json({message: "success", data: data});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.delete('/pemesanans/:id', async function (req, res, next){
    try{
        const ref = await db.collection('pemesanans').doc(id);
        const refdata = await ref.get();
        const response = await db.collection('kamars').doc(refdata.data().kamar_id).update({available: null});
        console.log(response);
        const response2 = await ref.delete();
        console.log(response2);
        res.json({message: "Successfully Deleted!!!"});
    } catch(err){
        res.status(500).json({message: "Something wrong...", data: null });
    }
});


//add route from users route

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