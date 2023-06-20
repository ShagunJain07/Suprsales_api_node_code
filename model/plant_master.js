const mongoose = require('mongoose');

const plantMasterSchema = new mongoose.Schema({
  PLANT_ID: { type: String, required: true },
  PLANT_DESCRIPTION: { type: String, required: true },
  PLANT_ADDRESS: { type: String, required: true },
  PLANT_LONGITUDE: { type: Number, required: true },
  PLANT_LATITUDE: { type: Number, required: true },
  REGION_ID: { type: String, required: true },
  PLANT_POC_ID: { type: String, required: true },
  FLAG: { type: Boolean, required: true }
});

const PlantMaster = mongoose.model('plant_master', plantMasterSchema);

module.exports = PlantMaster;
