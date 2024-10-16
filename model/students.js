// models/Product.js
const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    std_id: { type: String, required: true },
    std_name: { type: String, required: true },
    Grammar: { type: String, required: true },
    Vocabulary: { type: String, required: true },
    Reading: { type: String, required: true },
    Listening: { type: String, required: true },
    Total: { type: String, required: true },
    CEFR: { type: String, required: true },
    
});

module.exports = mongoose.model('Students', studentsSchema);
