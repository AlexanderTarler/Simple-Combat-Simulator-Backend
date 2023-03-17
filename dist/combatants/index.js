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
exports.updateCombatant = exports.getCombatantByName = exports.deleteCombatant = exports.createNewCombatant = exports.getCombatants = void 0;
const db_1 = __importDefault(require("./db"));
const getCombatants = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.getCombatants();
    return result;
});
exports.getCombatants = getCombatants;
const getCombatantByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.getCombatantByName(name);
    return result;
});
exports.getCombatantByName = getCombatantByName;
const createNewCombatant = (combatant) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.createNewCombatant(combatant);
    return result;
});
exports.createNewCombatant = createNewCombatant;
const updateCombatant = (name, damage) => __awaiter(void 0, void 0, void 0, function* () {
    return;
});
exports.updateCombatant = updateCombatant;
const deleteCombatant = (name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Name: ' + name);
    const result = yield db_1.default.deleteCombatant(name);
    return result;
});
exports.deleteCombatant = deleteCombatant;
