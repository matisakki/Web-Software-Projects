import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($1);", name);
};

const findByActivity = async () => {
  let result = await executeQuery("SELECT * FROM shopping_lists WHERE active = TRUE;");
  return result.rows;
};

const deactivate = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = FALSE WHERE id = $1;", id);
};

const findListAmounts = async () => {
  let lists = await executeQuery("SELECT * FROM shopping_lists;");

  return lists.rows;
};

const findItemAmounts = async () => {
  let items = await executeQuery("SELECT * FROM  shopping_list_items;");

  return items.rows;
};

const addItem = async (shopping_list_id, name) => {
  await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($1, $2);",shopping_list_id, name);
};

const findItemsNotCollected = async (shopping_list_id) => {
  let result = await executeQuery("SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = $1 ORDER BY name ASC;", shopping_list_id);
  return result.rows;
};

const collectItem = async (item_id) => {
  await executeQuery("UPDATE shopping_list_items SET collected = TRUE WHERE id = $1;", item_id);
};
const findItemsCollected = async (shopping_list_id) => {
  let result = await executeQuery("SELECT * FROM shopping_list_items WHERE collected = true AND shopping_list_id = $1 ORDER BY name ASC;", shopping_list_id);
  return result.rows;
};


/*
const findAllNonCompletedTasks = async () => {
  let result = await executeQuery(
    "SELECT * FROM tasks WHERE completed = false;",
  );
  return result.rows;
};

const findById = async (id) => {
  let result = await executeQuery("SELECT * FROM tasks WHERE id = $1;", id);
  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return { id: 0, name: "Unknown" };
};
*/

export { create, findByActivity, deactivate, addItem, findItemsCollected, findItemsNotCollected, findListAmounts, findItemAmounts, collectItem};