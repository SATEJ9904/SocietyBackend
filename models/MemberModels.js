// models/Member.js
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    // Section info
    infoTitle: { type: String, default: "Mr" },
    firstName: String,
    middleName: String,
    surname: String,
    dateOfBirth: String,
    gender: { type: String, default: "male" },
    occupation: String,
    annual: String,
    email: String,
    mobile: Number,
    adharCardNo: String,
    panCardNo: String,

    // Section Address
    addressType: { type: String, default: "Residential" },
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: "India" },

    // Section Property details
    propertyType: { type: String, default: "Residential" },
    unitNumber: String,
    wingName: String,
    floor: String,
    unitType: String,
    fourWheelerParking: String,
    twoWheelerParking: String,

    // Section Contact person
    contactTitle: { type: String, default: "Mr" },
    contactFirstName: String,
    contactMiddleName: String,
    contactSurname: String,
    contactEmail: String,
    contactMobile: Number,

    // Section Nomination person
    nominationTitle: { type: String, default: "Mr" },
    nominationFirstName: String,
    nominationMiddleName: String,
    nominationSurname: String,
    nominationEmail: String,
    nominationMobile: Number,
    dateOfNomination: String,

    // Section Other
    dateOfAdmission: String,
    dateOfEntranceFeePayment: String,
    dateOfCessationOfMembership: String,
    reasonOfCessation: String,
    ageOfAccount: String,
    remark: String,
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
