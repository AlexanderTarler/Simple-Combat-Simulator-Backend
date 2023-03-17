"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const url = 'mongodb://localhost:27017';
const dbName = 'saltcarts';
const generateCartId = () => (0, uuid_1.v4)();
const createNewCart = () => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = {
        cartId: generateCartId(),
        products: [],
        totalNumberOfItems: 0,
        totalPrice: 0,
    };
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    yield db.collection('carts').insertOne(newCart);
    client.close();
    return newCart;
});
const getCartById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    const cart = yield db.collection('carts').findOne({ cartId: id });
    client.close();
    return cart;
});
const updateCart = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    yield db.collection('carts').updateOne({
        cartId: cart.cartId,
    }, {
        $push: { products: cart.products },
        $inc: {
            totalNumberOfItems: cart.products.quantity,
            totalPrice: cart.products.quantity * cart.products.price,
        },
    });
    client.close();
    return getCartById(cart.cartId);
});
const deleteCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    yield client.connect();
    const db = client.db(dbName);
    const col = db.collection('carts');
    yield col.deleteOne({ id: cartId });
    yield client.close();
});
exports.default = {
    createNewCart,
    getCartById,
    updateCart,
    deleteCart,
};
