const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(
    'mongodb+srv://mongo:' + process.env.MONGO_ATLAS_PW + '@cluster0.kxpu2.mongodb.net/todos?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(console.log("MongoDB Atlas correct config..."))
    .catch(err => { console.log(err) });

// Schema
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true}
})
const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (await User.findOne({username}).exec()) {
        res.status(500).json({
            message: 'Registration invalid'
        })
        return;
    } else {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        });
        user.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'User created successfully',
                    createdUser: {
                        _id: result._id,
                        username: result.username,
                        password: result.password
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
    }
    // res.send({
    //     username,
    //     password
    // });
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username}).exec()
    if (!user || user.password !== password) {
        res.status(403).json({
            message: 'invalid login' 
        })
        return;
    } 
    res.status(200).json({
        message: 'success'
    })
})

const db = mongoose.connection;
db.once("open", () => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    })
})
