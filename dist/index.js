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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./combatants/db");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/combatants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combatants = yield (0, db_1.getCombatants)();
        if (!combatants) {
            res.status(404).json({ message: 'Cannot find combatants' });
        }
        else {
            res.status(200).json(combatants);
        }
    }
    catch (err) {
        res.status(500).send(`Error fetching combatants`);
    }
}));
app.get('/combatants/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combatant = yield (0, db_1.getCombatantByName)(req.params.name);
        res.status(200).json(combatant);
    }
    catch (err) {
        res
            .status(500)
            .send(`Error finding combatant with name ${req.params.name}`);
    }
}));
app.put('/combatants/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const combatant = yield (0, db_1.updateCombatant)(req.body);
    try {
        res
            .set('location', `/api/combatants/${combatant.name}`)
            .status(201)
            .json(combatant);
    }
    catch (err) {
        res.status(500).send('Error posting new cart');
    }
}));
app.post('/combatants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const combatant = yield (0, db_1.createNewCombatant)(req.body);
    try {
        res
            .set('location', `/api/combatants/${combatant.name}`)
            .status(201)
            .json(combatant);
    }
    catch (err) {
        res.status(500).send('Error posting new cart');
    }
}));
app.delete('/combatants/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCombatant = yield (0, db_1.deleteCombatant)(req.params.name);
        res.status(204).json(deletedCombatant);
    }
    catch (err) {
        res.status(500).send(`Error deleting combatant with ID ${req.params.name}`);
    }
}));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
