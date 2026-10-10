/**
 * Barcode & Identification Utility
 * Supports EAN-13 generation with check-digit calculation & Code-128 prefixes
 */

function generateEAN13(prefix = '890') {
  let code = prefix + Math.floor(100000000 + Math.random() * 900000000).toString().substring(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return code + checkDigit;
}

function generateInvoiceNumber(prefix = 'INV', sequence = 1) {
  const padded = String(sequence).padStart(6, '0');
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${padded}`;
}

function generatePONumber(prefix = 'PO', sequence = 1) {
  const padded = String(sequence).padStart(5, '0');
  return `${prefix}-${padded}`;
}

function generateGRNNumber(prefix = 'GRN', sequence = 1) {
  const padded = String(sequence).padStart(5, '0');
  return `${prefix}-${padded}`;
}

module.exports = {
  generateEAN13,
  generateInvoiceNumber,
  generatePONumber,
  generateGRNNumber,
};
