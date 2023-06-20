const mongoose = require('mongoose');

const roleMasterSchema = new mongoose.Schema({
  ROLE_ID: {
    type: Number,
    required: true,
  },
  ROLE_NAME: {
    type: String,
    required: true,
  },
  ROLE_DESCRIPTION: {
    type: String,
    required: true,
  },
  AUTH_ID: {
    type: Number,
    required: true,
  },
  FLAG: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const RoleMaster = mongoose.model('role_master', roleMasterSchema);

module.exports = RoleMaster;
