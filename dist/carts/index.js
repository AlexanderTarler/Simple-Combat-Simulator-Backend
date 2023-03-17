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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.addProductToCart = exports.getCart = exports.createCart = void 0;
const db_1 = __importDefault(require("./db"));
const createCart = () => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.createNewCart(); });
exports.createCart = createCart;
const getCart = (id) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.getCartById(id); });
exports.getCart = getCart;
const addProductToCart = (product, cart) => __awaiter(void 0, void 0, void 0, function* () {
    const cartWithProducts = {
        cartId: cart.cartId,
        products: product,
    };
    return db_1.default.updateCart(cartWithProducts);
});
exports.addProductToCart = addProductToCart;
const deleteCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.deleteCart(cartId); });
exports.deleteCart = deleteCart;
