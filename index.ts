import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import {
  getCombatants,
  getCombatantByName,
  createNewCombatant,
  deleteCombatant,
  updateCombatant,
} from './combatants/db';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/combatants', async (req: Request, res: Response) => {
  try {
    const combatants = await getCombatants();
    if (!combatants) {
      res.status(404).json({ message: 'Cannot find combatants' });
    } else {
      res.status(200).json(combatants);
    }
  } catch (err) {
    res.status(500).send(`Error fetching combatants`);
  }
});

app.get('/combatants/:name', async (req: Request, res: Response) => {
  try {
    const combatant = await getCombatantByName(req.params.name);
    res.status(200).json(combatant);
  } catch (err) {
    res
      .status(500)
      .send(`Error finding combatant with name ${req.params.name}`);
  }
});

app.put('/combatants/:name', async (req, res) => {
  console.log(req.body);

  const combatant = await updateCombatant(req.body);
  try {
    res
      .set('location', `/api/combatants/${combatant.name}`)
      .status(201)
      .json(combatant);
  } catch (err) {
    res.status(500).send('Error posting new cart');
  }
});

app.post('/combatants', async (req, res) => {
  console.log(req.body);

  const combatant = await createNewCombatant(req.body);
  try {
    res
      .set('location', `/api/combatants/${combatant.name}`)
      .status(201)
      .json(combatant);
  } catch (err) {
    res.status(500).send('Error posting new cart');
  }
});

app.delete('/combatants/:name', async (req: Request, res: Response) => {
  try {
    const deletedCombatant = await deleteCombatant(req.params.name);
    res.status(204).json(deletedCombatant);
  } catch (err) {
    res.status(500).send(`Error deleting combatant with ID ${req.params.name}`);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
