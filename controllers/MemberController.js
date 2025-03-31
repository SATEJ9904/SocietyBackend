const Member = require("../models/MemberModels");

// Autocomplete function
exports.getMemberAutocomplete = async (req, res) => {
  console.log("🔹 Autocomplete Function HIT");

  try {
    const query = req.query.query || ""; // Default to empty string if no query
    console.log("🔹 Received query:", query);

    // Validate if query is not empty
    if (query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // Use regular expressions to search for matches on unitNumber, firstName, and surname
    const members = await Member.find({
      $or: [
        { unitNumber: { $regex: query, $options: "i" } }, // Case-insensitive regex for unitNumber
        { firstName: { $regex: query, $options: "i" } }, // Case-insensitive regex for firstName
        { surname: { $regex: query, $options: "i" } }, // Case-insensitive regex for surname
      ],
    }).select("unitNumber firstName surname "); // Only return necessary fields for autocomplete

    console.log("🔹 Members found:", members.length);

    // If no members found, send a suitable response
    if (members.length === 0) {
      return res
        .status(200)
        .json({ message: "No members found matching your query" });
    }

    // Format and send response
    const results = members.map((member) => ({
      label: `${member.firstName} ${member.surname} - ${member.unitNumber}`,
      value: member.unitNumber,
    }));

    res.json(results); // Send formatted data back to frontend
  } catch (err) {
    console.error("🔴 Error fetching members:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
