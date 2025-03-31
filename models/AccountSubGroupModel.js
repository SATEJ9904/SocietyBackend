const mongoose = require("mongoose");

const accountSubGroupSchema = new mongoose.Schema({
    SubGroupId: { type: Number, required: true },  // Required Id
    SubGroupCode: { type: Number, required: true },      // Required SubGroupCode
    GroupId: { type: Number, required: true },           // Required GroupId
    Name: { type: String, required: true, maxlength: 40 },  // Required Name with max length of 40
    User: { type: String, required: true, maxlength: 10 },  // Required User with max length of 10
    InDate: { type: Date, required: true },  // Required InDate (Date type)
    CompCode: { type: String, required: true },  // Required CompCode
    Type: { type: String, required: true, maxlength: 1 },  // Ensure Type is a single character string
    Active: { type: Number, required: true, default: 1 },  // Default value 1 for Active
    CreatedBy: { type: String, required: true },  // Required CreatedBy
    CreatedOn: { type: Date, required: true, default: Date.now },  // Default to current date
    UpdatedBy: { type: String },  // Optional UpdatedBy
    UpdatedOn: { type: Date },  // Optional UpdatedOn
    UpdateCount: { type: Number, default: 0 }  // Default value 0 for UpdateCount
});

// Create model
const AccountSubgroup = mongoose.model('AccountSubgroup', accountSubGroupSchema);

module.exports = AccountSubgroup;
