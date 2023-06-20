const mongoose = require('mongoose');

const customerBalanceSchema = new mongoose.Schema({
  CUSTOMER_ID: { type: String},
  TYPE_CODE: { type: String},
  CLOSING_BALANCE: { type: Number},
  OPENING_BALANCE: { type: Number},
  OPENING_BALANCE_TIME: { type: Date},
  IMM_DUES: { type: Number},
  TOTAL_OUTSTANDING: { type: Number},
  ADVANCE: { type: Number},
  UPTO30_DAYS: { type: Number},
  UPTO60_DAYS: { type: Number},
  UPTO90_DAYS: { type: Number},
  UPTO120_DAYS: { type: Number},
  UPTO150_DAYS: { type: Number},
  UPTO180_DAYS: { type: Number},
  ABOVE180_DAYS: { type: Number},
  TOTAL_CREDIT_LIMIT: { type: Number},
  REMAINING_CREDIT_LIMIT: { type: Number},
  UPDATED_AT: { type: Date}
});
module.exports = mongoose.model('customer_balance', customerBalanceSchema);

