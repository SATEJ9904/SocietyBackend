const mongoose = require('mongoose');

const accountGroupSchema = new mongoose.Schema({
    Id: {
        type: Number,
        auto: true, // Mongoose auto-increments _id by default, but this can be used for custom IDs
        unique: true
    },
    GroupCode: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true,
        maxlength: 50
    },
    Schedule: {
        type: String,
        required: true,
        maxlength: 1
    },
    DC_CD: {
        type: String,
        required: true,
        maxlength: 1
    },
    PLCODE: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    SUB_SCH: {
        type: String,
        required: true,
        maxlength: 3
    },
    Type: {
        type: String,
        required: true,
        maxlength: 1
    },
    Active: {
        type: Boolean,
        required: true,
        default: true
    },
    CreatedBy: {
        type: String,
        required: true,
        maxlength: 20
    },
    CreatedOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    UpdatedBy: {
        type: String,
        maxlength: 20,
        default: null
    },
    UpdatedOn: {
        type: Date,
        default: new Date('2000-12-31T23:59:59') // Keeping your default timestamp
    },
    UpdateCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: false, // Disables `createdAt` and `updatedAt` fields
    collection: 'AccountGroup' // Ensures it matches your database collection name
});





const AccountGroup = mongoose.model('AccountGroup', accountGroupSchema);

module.exports = AccountGroup;
