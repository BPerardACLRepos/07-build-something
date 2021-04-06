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

    static async read() {
        const { rows } = await pool.query('SELECT * FROM favorites');

        return rows.map((row) => new Favorite(row));
    }
};