import { pool } from '../db.js';

// Getting users...
export const getAllUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');

  res.send(rows);
}
export const getUniqueUser = async (req, res) => {
  const {id} = req.params;
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found"});
  }

  res.send(rows[0])
};

// Creating Users...
export const createUser =  async (req, res) => {
  const data = req.body;
  const { rows } = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);
  console.log(rows[0]);
  res.json(rows[0]);
};

// Deleting Users...
export const deleteUser =  async (req, res) => {
  const {id} = req.params;
  const { rows, rowCount } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  
  console.log(rows);
  if (rowCount === 0) {
    return res.status(404).json({message: "User not found"});
  }
  return res.json({message: `User ${id} deleted`});
};


// Updating users...
export const updateUser = async (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body;

  const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
  console.log(result);
  res.send('updating user ' + id)
};