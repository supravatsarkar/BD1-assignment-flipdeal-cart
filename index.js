const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// ### BD1 - Assignment (FlipDeal Ecommerce Cart) ####

app.get('/', (req, res)=>{
  res.send('Welcome to FlipDeal Ecommerce!');
})

// Endpoint 1: Calculate the total price of items in the cart
///cart-total?newItemPrice=1200&cartTotal=0
function calculateTotalCartValue(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartValue(newItemPrice, cartTotal).toString());
});

// Endpoint 2 : Apply a discount based on membership status
// /membership-discount?cartTotal=3600&isMember=true
function calculateMembershipDiscount(cartTotal, isMember) {
  let discountPersentage = 10;
  let totalCartValue = cartTotal;
  if (isMember) {
    totalCartValue = cartTotal - (cartTotal * discountPersentage) / 100;
  }
  return totalCartValue;
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(calculateMembershipDiscount(cartTotal, isMember).toString());
});

// Endpoint 3 : Calculate tax on the cart total
// /calculate-tax?cartTotal=3600
function calculateTax(cartTotal) {
  let taxPercentage = 5;
  let taxAmount = (cartTotal * taxPercentage) / 100;
  return taxAmount;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method
// /estimate-delivery?shippingMethod=express&distance=600
function calculateEstimateDeliveryDay(shippingMethod, distance) {
  let estimateDay;
  if (shippingMethod === 'express') {
    estimateDay = distance / 100;
  } else {
    estimateDay = distance / 50;
  }
  return estimateDay;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateEstimateDeliveryDay(shippingMethod, distance).toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
// /shipping-cost?weight=2&distance=600
function calculateShippingCost(weight, distance) {
  let shiipingCost = weight * distance * 0.1;
  return shiipingCost;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
// /loyalty-points?purchaseAmount=3600
function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPointPerAmountUnit = 2;
  let loyaltyPoint = purchaseAmount * loyaltyPointPerAmountUnit;
  return loyaltyPoint;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
