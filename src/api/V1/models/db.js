const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_CLOUD_URL,
});

pool.on('connect', () => {
});

// Create User Table
const createUserTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
                        users(
                          id UUID PRIMARY KEY,
                          email VARCHAR(128) NOT NULL,
                          first_name VARCHAR(128) NOT NULL,
                          last_name VARCHAR(128) NOT NULL,
                          password VARCHAR(128) NOT NULL,
                          role VARCHAR(128) NOT NULL
                        )`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop Tables
const dropUserTables = () => {
  const queryString = 'DROP TABLE IF EXISTS users';
  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create Message Table
const createMessageTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
                      messages(
                        id UUID PRIMARY KEY,
                        subject VARCHAR(128) NOT NULL,
                        message VARCHAR(128) NOT NULL,
                        parent_message_id UUID NOT NULL,
                        status VARCHAR(10) NOT NULL,
                        created_on TIMESTAMP,
                        FOREIGN KEY (parent_message_id) REFERENCES messages (id) ON DELETE CASCADE
                      )`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Drop Tables
const dropMessageTables = () => {
  const queryString = 'DROP TABLE IF EXISTS messages';
  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create Contacts Table
const createContactsTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
                        contacts(
                          id UUID PRIMARY KEY,
                          email VARCHAR(128) NOT NULL,
                          first_name VARCHAR(128) NOT NULL,
                          last_name VARCHAR(128) NOT NULL,
                          owner_id UUID NOT NULL,
                          FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
                        )`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Contact Tables
const dropContactTables = () => {
  const queryString = 'DROP TABLE IF EXISTS contacts';
  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create Inbox Table
const createInboxTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
                        inbox(
                          message_id UUID PRIMARY KEY,
                          receiver_id UUID NOT NULL,
                          delete UUID NOT NULL,
                          status VARCHAR(128),
                          FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE CASCADE
                        )`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop Tables
const dropInboxTables = () => {
  const queryString = 'DROP TABLE IF EXISTS inbox';
  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create Sent Table
const createSentTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
                        sent(
                            message_id UUID PRIMARY KEY,
                            sender_id UUID NOT NULL,
                            delete UUID NOT NULL,
                            status VARCHAR(128),
                            FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE CASCADE

                        )`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Drop Tables
const dropSentTables = () => {
  const queryString = 'DROP TABLE IF EXISTS sent';
  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


pool.on('remove', () => {
  process.exit(0);
});

// create all tables
const createAllTables = () => {
  createUserTable();
  createMessageTable();
  createInboxTable();
  createSentTable();
  createContactsTable();
};

// drop all tables
const dropAllTables = () => {
  dropMessageTables();
  dropUserTables();
  dropContactTables();
  dropSentTables();
  dropInboxTables();
};

module.exports = {
  createAllTables,
  createUserTable,
  createMessageTable,
  createInboxTable,
  createSentTable,
  createContactsTable,
  dropUserTables,
  dropMessageTables,
  dropSentTables,
  dropInboxTables,
  dropContactTables,
  dropAllTables,
};

require('make-runnable');
