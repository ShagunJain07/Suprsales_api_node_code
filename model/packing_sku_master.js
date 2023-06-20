const mongoose = require('mongoose');

const packingSkuMasterSchema = new mongoose.Schema({
  SKU_ID: { type: String},
  SKU_DESCRIPTION: { type: String},
  UNIT_ID: { type: Number},
  FACTOR: { type: Number},
  GROUP_ID: { type: String},
  FLAG: { type: Boolean},
  SKU_CATEGORY: { type: String},
}, { collection: 'packing_sku_master' });

module.exports = mongoose.model('packing_sku_master', packingSkuMasterSchema);
