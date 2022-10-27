require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoDB = require('mongodb');

/**
 * Creates a collection in the `db` database with the given schema as a validator
 *
 * @param {string} COLLECTION_NAME
 * @param {mongoDB.CreateCollectionOptions} SCHEMA_VALIDATOR
 * @param {mongoDB.Db} db
 * @see https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
 */
async function createCollection(COLLECTION_NAME, SCHEMA_VALIDATOR, db) {
  try {
    await db.createCollection(COLLECTION_NAME, {
      validator: SCHEMA_VALIDATOR,
    });

    const createdCollection = db.collection(COLLECTION_NAME);

    if (createdCollection) {
      console.log(` - Collection '${COLLECTION_NAME}' created`);
    }
  }
  catch (error) {
    if (error instanceof mongoDB.MongoServerError) {
      if (error.codeName === 'NamespaceExists') {
        console.log(` - Collection '${COLLECTION_NAME}' already created`);
      }
      else {
        console.error(error);
        console.log('\n❌ Something went wrong while creating the collection');
        process.exit(1);
      }
    }
  }
}

async function main() {
  const { MONGO_URI } = process.env;
  const COLLECTIONS_PATH = path.join(__dirname, '../build/models');

  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
  }
  const collectionsFiles = fs.readdirSync(COLLECTIONS_PATH);
  console.log(`🐢 Started registering ${collectionsFiles.length} collections to database:`);

  const mongoClient = new mongoDB.MongoClient(MONGO_URI);
  await mongoClient.connect();
  const db = mongoClient.db(process.env.DB_NAME); // database to create the collections in

  const collectionsPromises = collectionsFiles.map(async (collectionFile) => (
    import(path.join(COLLECTIONS_PATH, collectionFile))
  ));

  // Wait for all the collections to be imported
  const DBcollections = await Promise.allSettled(collectionsPromises);

  // Create the collections
  const createdCollections = DBcollections.map(async (collectionObject) => {
    const schema = collectionObject.value;
    return createCollection(schema.COLLECTION_NAME, schema.SCHEMA_VALIDATOR, db);
  });

  // Wait for all the collections to be created
  await Promise.allSettled(createdCollections);

  console.log('\n✅ Finished creating collections');
  mongoClient.close();
}

if (require.main === module) {
  main();
}
