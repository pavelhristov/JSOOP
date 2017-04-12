/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }

        get productType() {
            return this._productType;
        }

        set productType(value) {
            // TODO: validation string & empty
            this._productType = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            // TODO: validation string & empty
            this._name = value;
        }

        get price() {
            return this._price;
        }

        set price(value) {
            // TODO: validation number & empty
            this._price = value;
        }
    }

    class ShoppingCart {
        /* .... */
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        add(product) {
            // adding product to ShoppingCart
            if (product.constructor.name === "Product") {
                this._products.push(product);
            }
            // can add same product multiple times

            return this;
        }

        remove(product) {
            // removes first matched product with same name, productType and price
            // throws when ShoppingCart is empty
            if (this._products.length <= 0) {
                throw "Can not remove product from empty Shopping Cart!";
            }

            let isFound = false;

            for (let i = 0; i < this._products.length; i += 1) {
                if (this._products[i].name === product.name &&
                    this._products[i].productType === product.productType &&
                    this._products[i].price === product.price) {
                    this._products.splice(i, 1);
                    isFound = true;
                    break;
                }
            }

            // throws when product is not contained
            if (!isFound) {
                throw "Product not found!";
            }
        }

        showCost() {
            // returns price of all products
            // returns 0 when no products
            let totalCost = 0;

            if (this._products.length <= 0) {
                totalCost = 0;
            } else {
                this.products.forEach(function(product) {
                    totalCost += Number(product.price);
                }, this);
            }

            return totalCost;
        }

        showProductTypes() {
            // returns all product types in cart sorted alphabetically
            let productTypes = [];

            this._products.forEach(function(product) {
                if (productTypes.indexOf(product.productType) < 0) {
                    productTypes.push(product.productType);
                }
            }, this);

            productTypes.sort(function(a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
            return productTypes;
        }

        getInfo() {
            // products with unique name and total their cost and quantity of the product
            // total price of all products in the cart
            // totalPrice = 0 and products = [] when cart is empty
            let totalPrice = 0,
                productsForInfo = [];

            this.products.forEach(function(currentProduct) {
                let isAlreadyInInfoArrey = false;
                totalPrice += Number(currentProduct.price);
                for (let i = 0; i < productsForInfo.length; i += 1) {
                    if (productsForInfo[i].name === currentProduct.name) {
                        productsForInfo[i].quantity += 1;
                        productsForInfo[i].totalPrice += currentProduct.price;
                        isAlreadyInInfoArrey = true;
                        break;
                    }
                }

                if (!isAlreadyInInfoArrey) {
                    productsForInfo.push({
                        name: currentProduct.name,
                        totalPrice: currentProduct.price,
                        quantity: 1
                    });
                }
            }, this);

            return {
                totalPrice: totalPrice,
                products: productsForInfo
            };
        }
    }
    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;