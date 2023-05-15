const models = require('../models');
const {escape} = require('sequelize/lib/sql-string');


const getCRMUsersIds = (externalIds) => {
  let inCondition = externalIds.map(id => escape(id)).join(',') || 'null';
  let historyTable = models.UserHistory.getTableName();
  let userTable = models.CrmUser.getTableName();

  return `
    SELECT * FROM ( 
      SELECT id AS crmId, externalId FROM ${historyTable}
      WHERE externalId IS NOT NULL
       union
      SELECT crmId, externalId FROM ${userTable}
      WHERE externalId IS NOT NULL AND crmId IS NOT NULL
      ) t WHERE externalId IN (${inCondition})
  `;
}

const getAllCRMUsersIds = () => {
  let historyTable = models.UserHistory.getTableName();
  let userTable = models.CrmUser.getTableName();

  return `
    SELECT * FROM ( 
      SELECT id AS crmId, externalId FROM ${historyTable}
      WHERE externalId IS NOT NULL
       union
      SELECT crmId, externalId FROM ${userTable}
      WHERE externalId IS NOT NULL AND crmId IS NOT NULL
      ) t
  `;
}



module.exports = {
  getCRMUsersIds,
  getAllCRMUsersIds,
};