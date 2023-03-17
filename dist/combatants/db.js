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
exports.deleteCombatant = exports.updateCombatant = exports.createNewCombatant = exports.getCombatantByName = exports.getCombatants = void 0;
const mongodb_1 = require("mongodb");
const url = 'mongodb+srv://gamemaster:LucyLoo42@cluster0.htzukjr.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'combat-simulator';
// const generateCombatantId = () => uuidv4();
const getCombatants = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    const combatants = yield db.collection('combatants').find({}).toArray();
    return combatants;
});
exports.getCombatants = getCombatants;
const getCombatantByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    const combatant = yield db.collection('combatants').findOne({ name: name });
    return combatant;
});
exports.getCombatantByName = getCombatantByName;
const createNewCombatant = (combatant) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Combatant name: ' + combatant.name);
    const newCombatant = {
        name: combatant.name,
        healthPoints: combatant.healthPoints,
        toHit: combatant.toHit,
        dodge: combatant.dodge,
        damage: combatant.damage,
        armor: combatant.armor,
    };
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    yield db.collection('combatants').insertOne(newCombatant);
    return newCombatant;
});
exports.createNewCombatant = createNewCombatant;
const updateCombatant = (combatant) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    yield db.collection('combatants').updateOne({
        name: combatant.name,
    }, {
        $set: {
            healthPoints: combatant.healthPoints,
            toHit: combatant.toHit,
            dodge: combatant.dodge,
            damage: combatant.damage,
            armor: combatant.armor,
        },
    });
    const updatedCombatant = yield (0, exports.getCombatantByName)(combatant.name);
    return updatedCombatant;
});
exports.updateCombatant = updateCombatant;
const deleteCombatant = (name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Name: ' + name);
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db(dbName);
    const deletedCombatant = yield db
        .collection('combatants')
        .deleteOne({ name: name });
    return deletedCombatant;
});
exports.deleteCombatant = deleteCombatant;
