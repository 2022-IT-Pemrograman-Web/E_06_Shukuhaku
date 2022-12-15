const router = require('express').Router();
const db = require('../firebase/firestore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fromDate = require('firebase-admin').firestore.Timestamp.fromDate;

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

router.get('/kamars/class', async function (req, res, next) {
    try{
        var kamars = [];
        await db.collection("kamars").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                kamars.push({id: doc.id, ...doc.data()});
            });
        });
        var unique = [];
        var data = []
        for(let kamar of kamars){
            if(unique.includes(kamar.class) == false){
                data.push({
                    class: kamar.class,
                    price: kamar.price,
                    facility: kamar.facility,
                });
                unique.push(kamar.class);
            }
        }
        console.log(unique);
        res.json({message: "success", data: {kamars: data}});
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
        //console.log(new Date());
        console.log(req.user);
        let end_date = new Date(req.body.start_date);
        console.log(end_date);
        end_date.setDate(end_date.getDate() + Number.parseInt(req.body.total_day));
        console.log(req.body.total_day);
        console.log(end_date);
        var kamar = [];
        await db.collection('kamars').where('class', '==', req.body.kamar_class).where('available', '==', null).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        kamar.push({id: doc.id, ...doc.data()});
                    });
                });
        await db.collection('kamars').where('available', '<=', fromDate(new Date())).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if(doc.data().class == req.body.kamar_class) kamar.push({id: doc.id, ...doc.data()});
                    });
                });
        console.log(kamar);
        if(kamar.length == 0){
            res.status(501).json({message: "Kamar is full"});
            return;
        }
        const data = {
            kamar_id: kamar[0].id,
            user_id: req.user.email,
            total_day: req.body.total_day,
            total_price: req.body.total_price,
            start_date: new Date(req.body.start_date),
            end_date: end_date,
            checked_out: null,
            checked_in: null,
        };
        console.log(data);
        const response = await db.collection('pemesanans').add(data);
        console.log("ok3");
        console.log(response);
        const response2 = await db.collection('kamars')
                                    .doc(kamar[0].id)
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
        console.log(user);
        await db.collection("pemesanans")
            .where("user_id", "==", user.email)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data['start_date'] = data['start_date'].toDate().toDateString();
                data['end_date'] = data['end_date'].toDate().toDateString();
                pemesanans.push({id: doc.id, ...data});
            });
        });
        console.log("ok");
        console.log(pemesanans);
        res.json({message: "success", data: {pemesanans: pemesanans}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/pemesanans/active/user', async function (req, res, next) {
    try{
        let user = req.user;
        let pemesanans = [];
        await db.collection("pemesanans").where("user_id", "==", user.email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data['start_date'] = data['start_date'].toDate().toDateString();
                data['end_date'] = data['end_date'].toDate().toDateString();
                console.log(data.checked_out);
                if(data.checked_out == null) pemesanans.push({id: doc.id, ...data});
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
        const ref = db.collection('kamars').doc(pemesanan.data().kamar_id);
        var dt = await ref.get();
        if(dt.data().available == pemesanan.data().end_date){
            const response2 = await db.collection('kamars')
                                    .doc(pemesanan.data().kamar_id)
                                    .update({available: null});
            console.log(response2);
        }
        res.json({message: "success", data: {checked_out: checked_out}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

router.get('/voucher', async function (req, res, next) {
    try{
        let voucher = [];
        await db.collection("voucher").where("expiredAt", ">", fromDate(new Date())).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                voucher.push({id: doc.id, ...doc.data()});
            });
        });
        console.log(voucher);
        res.json({message: "success", data: {voucher: voucher}});
    } catch (err){
        res.status(500).json({message: "Something wrong...", data: null })
    }
});

module.exports = router;