import db from '../models/index';

export default {
  async checkUser(email) {
    /**
     * check if user exist in db
     */
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(queryString, [email]);
    const user = rows[0];
    return { user };
  },
  async receiverId(email) {
    /**
     * get receiver Id from db
     */
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(queryString, [email]);
    return rows[0].id;
  },
  async senderId(userId) {
    /**
     * get sender Id from db
     */
    const queryString = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(queryString, [userId]);
    return rows[0].id;
  },
  async userDetails(userId) {
    /**
     * get user from db
     */
    const queryString = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(queryString, [userId]);
    const user = rows[0];
    return { user };
  },

  async insertInbox(values) {
    /**
     * populate insert for the receiver from db
     */
    const queryString = 'INSERT INTO inbox (message_id, receiver_id, delete, status) VALUES($1, $2, $3, $4)  returning *';
    const { rows } = await db.query(queryString, values);
    const insertBox = rows[0];
    return { insertBox };
  },
  async insertSent(values) {
    /**
     * populate sent for the sender from db
     */
    const queryString = 'INSERT INTO sent (message_id, sender_id, delete) VALUES($1, $2, $3)  returning *';
    const { rows } = await db.query(queryString, values);
    const sentBox = rows[0];
    return { sentBox };
  },
  async fetchAllInbox(values) {
    /**
     * all inbox messages from db
     */
    const queryString = ` SELECT      
                          a.message_id,
                          a.status,
                          a.receiver_id,
                          b.sender_id,
                          c.parent_message_id,
                          created_on,
                          message,
                          subject
                          FROM
                          inbox a
                          INNER JOIN sent b ON a.message_id = b.message_id 
                          INNER JOIN messages c ON b.message_id = c.id
                          WHERE a.receiver_id = $1 AND a.delete = $2 AND b.delete = $2 `;
    const { rows } = await db.query(queryString, [values, 0]);
    const allInbox = rows;
    return { allInbox };
  },
  async fetchAllUnread(values) {
    /**
     * all inbox messages from db
     */
    const queryString = `SELECT                             
                              a.message_id,
                              a.status,
                              a.receiver_id,
                              b.sender_id,
                              c.parent_message_id,
                              created_on,
                              message,
                              subject
                              FROM
                              inbox a
                              INNER JOIN sent b ON a.message_id = b.message_id AND status = $1
                              INNER JOIN messages c ON a.message_id = c.id
                              WHERE a.receiver_id = $2
                              `;
    const { rows } = await db.query(queryString, ['unread', values]);
    const allUnread = rows;
    return { allUnread };
  },
  async fetchAllSent(values) {
    /**
     * all sent messages from db
     */
    const queryString = `SELECT                             
                              b.message_id,
                              b.receiver_id,
                              a.sender_id,
                              c.parent_message_id,
                              created_on,
                              message,
                              subject
                              FROM
                              sent a
                              INNER JOIN inbox b ON a.message_id = b.message_id 
                              INNER JOIN messages c ON a.message_id = c.id
                              WHERE a.sender_id = $1 AND a.delete = $2
                              `;
    const { rows } = await db.query(queryString, [values, 0]);
    const allSent = rows;
    return { allSent };
  },
  async fetchOneMessage(paramsId, userId) {
    /**
     * get sender Id from db
     */
    const queryString = `SELECT      
                          a.message_id,
                          a.status,
                          a.receiver_id,
                          b.sender_id,
                          c.parent_message_id,
                          created_on,
                          message,
                          subject
                          FROM
                          inbox a
                          INNER JOIN sent b ON a.message_id = b.message_id 
                          INNER JOIN messages c ON b.message_id = c.id
                          WHERE a.message_id = $1 AND a.receiver_id = $2 AND a.delete = $3 AND b.delete = $3`;
    const { rows } = await db.query(queryString, [paramsId, userId, 0]);
    const singleMessage = rows[0];
    return { singleMessage };
  },
  async updateReadMessage(paramsId) {
    /**
     * update message to read
     */
    const queryString = `UPDATE
                          inbox 
                          SET status = $1      
                          WHERE message_id = $2
                          returning *
                          `;
    const { rows } = await db.query(queryString, ['read', paramsId]);
    const singleMessage = rows[0];
    return { singleMessage };
  },
  async deleteInboxMessage(paramsId) {
    /**
     * delete message
     */
    const queryString = `UPDATE
                          inbox 
                          SET delete = $1      
                          WHERE message_id = $2
                          returning *
                          `;
    const { rows } = await db.query(queryString, [1, paramsId]);
    const singleMessage = rows[0];
    return { singleMessage };
  },
  async deleteSentMessage(paramsId) {
    /**
     * delete message
     */
    const queryString = `UPDATE
                          sent 
                          SET delete = $1      
                          WHERE message_id = $2
                          returning *
                          `;
    const { rows } = await db.query(queryString, [1, paramsId]);
    const singleMessage = rows[0];
    return { singleMessage };
  },
  async sendResetLink(query, values) {
    const { rows } = await db.query(query, values);
    const msgs = rows[0];
    return { msgs };
  },
  async fetchAllGroups(userId) {
    /**
     * get user from db
     */
    const queryString = 'SELECT * FROM groups WHERE owner_id = $1';
    const { rows } = await db.query(queryString, [userId]);
    const allGroups = rows;
    return { allGroups };
  },
  async deleteGroup(paramsId, userId) {
    /**
     * delete group
     */
    const queryString = `DELETE FROM groups    
                          WHERE id = $1 AND owner_id = $2
                          returning *
                          `;
    const {
      rows
    } = await db.query(queryString, [paramsId, userId]);
    const deleteGroup = rows[0];
    return { deleteGroup };
  },
  async updateGroup(values, groupId, userId) {
    /**
     * update Group
     */
    const queryString = `UPDATE
                          groups 
                          SET name = $1      
                          WHERE id = $2
                          AND owner_id = $3
                          returning *
                          `;
    const { rows } = await db.query(queryString, [values[0], groupId, userId]);
    const updatedGroup = rows[0];
    return { updatedGroup };
  },
  async checkGroup(values, userId) {
    /**
     * check if group exist in db
     */
    const queryString = 'SELECT * FROM groups WHERE name = $1 AND owner_id = $2';
    const { rows } = await db.query(queryString, [values[1], userId]);
    const group = rows[0];
    return { group };
  },

  async checkUserExistGroup(userId, groupId) {
    /**
       * check if group exist in db checkUserExistGroup
       */
    const queryString = 'SELECT * FROM group_members WHERE user_id = $1 AND group_id = $2';
    const { rows } = await db.query(queryString, [userId, groupId]);
    const alUser = rows[0];
    return { alUser };
  },
  async checkGroupExists(groupId) {
    /**
       * check if group exist in db checkUserExistGroup
       */
    const queryString = 'SELECT * FROM groups WHERE id = $1 ';
    const { rows } = await db.query(queryString, [groupId]);
    const group = rows[0];
    return { group };
  },
  async insertUserGroup(user, groupId) {
    const queryString = `INSERT INTO 
                         group_members (user_id, group_id, user_role)
                         VALUES ($1, $2, $3) 
                         returning *`;
    const { rows } = await db.query(queryString, [user.id, groupId, 'member']);
    const addUser = rows;
    return { addUser };
  },
  async deleteUserGroup(user, groupId) {
    const queryString = `DELETE FROM 
                         group_members 
                         WHERE user_id = $1 and group_id = $2
                         returning *`;
    const { rows } = await db.query(queryString, [user, groupId]);
    const delUser = rows[0];
    return { delUser };
  },
  async getUsersInGroup(groupId) {
    /**
     * get users
     */
    const queryString = 'SELECT user_id FROM group_members WHERE group_id = $1';
    const { rows } = await db.query(queryString, [groupId]);
    const users = rows;
    return { users };
  },
};
