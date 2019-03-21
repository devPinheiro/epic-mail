import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

let conString;
if (process.env.NODE_env === 'test') {
  conString = config.test.db;
} else if (process.env.NODE_env === 'development') {
  conString = config.development.db;
} else if (process.env.NODE_env === 'production') {
  conString = config.production.db;
}

// Create an instance of pool for connection
const pool = new Pool({
  connectionString: conString,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

// Create Message Table
const createMessage = `
                     CREATE TABLE IF NOT EXISTS
                      messages(
                        id SERIAL PRIMARY KEY,
                        subject VARCHAR(128) NOT NULL,
                        message VARCHAR(128) NOT NULL,
                        parent_message_id INTEGER NOT NULL,
                        status VARCHAR(10) NOT NULL,
                        created_on TIMESTAMP,
                        FOREIGN KEY (parent_message_id) REFERENCES messages (id) ON DELETE CASCADE
                        );`;

// Create User Table
const createUser = `
                    CREATE TABLE IF NOT EXISTS
                    users(
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(128) NOT NULL,
                        first_name VARCHAR(128) NOT NULL,
                        last_name VARCHAR(128) NOT NULL,
                        password VARCHAR(128) NOT NULL,
                        role VARCHAR(128) NOT NULL
                       );`;

const createSent = `CREATE TABLE IF NOT EXISTS
                        sent(
                            id SERIAL,
                            message_id INTEGER PRIMARY KEY,
                            sender_id INTEGER NOT NULL,
                            delete INTEGER NOT NULL,
                            FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE CASCADE

                        );`;

const createInbox = `CREATE TABLE IF NOT EXISTS
                        inbox(
                          id SERIAL,
                          message_id INTEGER PRIMARY KEY,
                          receiver_id INTEGER NOT NULL,
                          delete INTEGER NOT NULL,
                          status VARCHAR(128),
                          FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE CASCADE
                        );`;

const createGroup = `CREATE TABLE IF NOT EXISTS
                        groups(
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(128) NOT NULL,
                          role VARCHAR(128) NOT NULL,
                          owner_id INTEGER NOT NULL,
                          FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
                        );`;

const createGroupMembers = `CREATE TABLE IF NOT EXISTS
                        group_members(
                          id SERIAL PRIMARY KEY,
                          user_id INTEGER NOT NULL,
                          group_id INTEGER NOT NULL,
                          user_role VARCHAR(128) NOT NULL,
                          FOREIGN KEY (id) REFERENCES groups (id) ON DELETE CASCADE
                        );`;

const dropInboxQuery = `                    
                        DROP TABLE IF EXISTS inbox;                       
                        `;
const dropSentQuery = `                    
                        DROP TABLE IF EXISTS sent;                      
                        `;
const dropMessagesQuery = `                    
                        DROP TABLE IF EXISTS messages;                       
                        `;
const dropUsersQuery = `                    
                        DROP TABLE IF EXISTS users;                        
                        `;

const dropGroupsQuery = `                    
                        DROP TABLE IF EXISTS groups;                        
                        `;
const dropGroupMembersQuery = `                    
                        DROP TABLE IF EXISTS group_members;                        
                        `;
// create all tables
const createTablesQuery = `${dropInboxQuery} ${dropSentQuery}  ${dropMessagesQuery} ${dropGroupMembersQuery} ${dropGroupsQuery}  ${dropUsersQuery}   ${createMessage} ${createInbox} ${createSent} ${createUser} ${createGroup} ${createGroupMembers}`;

const createAllTables = () => {
  pool.query(createTablesQuery, (err, res) => {
    // console.log(err, res);
    pool.end();
  });
};

export default createAllTables();
