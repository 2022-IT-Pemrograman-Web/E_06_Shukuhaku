const fs = require('firebase-admin');
const serviceAccount = require('./fp-pweb-88b98-firebase-adminsdk-zlgja-283851be3b.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

module.exports = db;