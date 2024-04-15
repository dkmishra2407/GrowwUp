const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/Stocks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully..."))
.catch((err) => console.log("Error connecting to MongoDB:", err));

module.exports = mongoose;


