const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packingUnitMasterSchema = new Schema({
  UNIT_ID: { type: Number, required: true },
  UNIT_TYPE: { type: String, required: true },
  UNIT_VALUE: { type: Number, required: true },
  CATEGORY_ID: { type: Number, required: true },
  FLAG: { type: Boolean, required: true }
});

const PackingUnitMaster = mongoose.model('packing_unit_master', packingUnitMasterSchema);

module.exports = PackingUnitMaster;
