const pool = require('../utils/pool');

module.exports = class Favorite {
    id;
    type;
    options;

    constructor(row) {
        this.id = row.id;
        this.type = row.type;
        this.options = row.options;
    }

    static async insert({ type, options }) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO favorites (type, options) VALUES ($1, $2) RETURNING *',
            [type, options]
        );

        return new Favorite(rows[0]);
    }

    static async selectAll() {
        const {
            rows,
        } = await pool.query(
            'SELECT * FROM favorites'
        );

        return rows.map(row => new Favorite(row));
    }

    static async selectId(id) {
        const {
            rows,
        } = await pool.query(
            'SELECT * FROM favorites WHERE id=$1',
            [id]
        );

        return new Favorite(rows[0]);
    }

    static async updateId({ type, options }, id) {
        const {
            rows,
        } = await pool.query(
            'UPDATE favorites SET type=$1, options=$2 WHERE id=$3 RETURNING *',
            [type, options, id]
        );

        return new Favorite(rows[0]);
    }

    static async deleteId(id) {
        const {
            rows,
        } = await pool.query(
            'DELETE FROM favorites WHERE id=$1 RETURNING *',
            [id]
        );

        return new Favorite(rows[0]);
    }
};