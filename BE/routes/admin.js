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