import { MongoClient, ObjectId } from 'mongodb';
// import { v4 as uuidv4 } from 'uuid';

export type Combatant = {
  name: string;
  healthPoints: number;
  toHit: number;
  dodge: number;
  damage: number;
  armor: number;
};

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.htzukjr.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'combat-simulator';

// const generateCombatantId = () => uuidv4();

export const getCombatants = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  const combatants = await db.collection('combatants').find({}).toArray();

  return combatants;
};

export const getCombatantByName = async (name: string) => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  const combatant = await db.collection('combatants').findOne({ name: name });

  return combatant;
};

export const createNewCombatant = async (
  combatant: Combatant,
): Promise<Combatant> => {
  console.log('Combatant name: ' + combatant.name);

  const newCombatant: Combatant = {
    name: combatant.name,
    healthPoints: combatant.healthPoints,
    toHit: combatant.toHit,
    dodge: combatant.dodge,
    damage: combatant.damage,
    armor: combatant.armor,
  };

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  await db.collection('combatants').insertOne(newCombatant);

  return newCombatant;
};

export const updateCombatant = async (
  combatant: Combatant,
): Promise<Combatant> => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  await db.collection('combatants').updateOne(
    {
      name: combatant.name,
    },
    {
      $set: {
        healthPoints: combatant.healthPoints,
        toHit: combatant.toHit,
        dodge: combatant.dodge,
        damage: combatant.damage,
        armor: combatant.armor,
      },
    },
  );
  const updatedCombatant: any = await getCombatantByName(combatant.name);
  return updatedCombatant;
};

export const deleteCombatant = async (name: string) => {
  console.log('Name: ' + name);

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  const deletedCombatant = await db
    .collection('combatants')
    .deleteOne({ name: name });

  return deletedCombatant;
};
