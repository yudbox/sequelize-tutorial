const models = require('../models');
const { STATUS_GROUPS } = require('../../lib/constants').CRM;
const {escape} = require('sequelize/lib/sql-string');

const COMMON_REASON_TITLE = 'Still in process';
const COMMON_SUB_REASON_TITLE = 'Other';

const getAppliedUsersCount = (nctId, dateFrom, dateTo, statuses) => {
  let inCondition = 'null';
  let table = models.CrmUserStatusHistory.getTableName();
  if (Array.isArray(statuses)){
    inCondition = statuses.map(id => `'${id}'`).join(',');
  }

  return `
    SELECT count(*) as count    
     FROM ${table} AS cur 
    WHERE cur.crmStatus IN (${inCondition}) 
      AND cur.content LIKE '%${nctId}%'
      AND cur.modifiedAt BETWEEN '${dateFrom}' AND '${dateTo}'
      AND NOT EXISTS (select 1 FROM ${table} AS prev 
          where  prev.crmId = cur.crmId 
            and prev.crmStatus IN (${inCondition}) 
            and prev.createdAt > cur.createdAt  
      )
  `;
}


const getInsightUsers = (nctId, userWixIds, dateFrom, dateTo) => {
  let idsInCondition = 'null';
  if (Array.isArray(userWixIds) && userWixIds.length){
    idsInCondition = userWixIds.map(id => escape(id)).join(',');
  }
  let nctIdsInCondition = 'null';
  if (nctId && typeof nctId == 'string'){
    nctIdsInCondition = nctId.split(',').map(id => escape(id)).join(',');
  }

  let appliedTrialTable = models.UserAppliedTrial.getTableName();

  let reasonTable = models.DeclineReason.getTableName();

  return ` 
    SELECT 
     a.externalId, a.nctId, 
     ifnull(main.name,'${COMMON_REASON_TITLE}') reasonMainName, 
     if(main.type = 'group', 
        if(sub.type = 'free' or sub.name is null, '${COMMON_SUB_REASON_TITLE}' , sub.name), 
        null 
     ) reasonSubName, 
     a.appliedAt, sign.name reasonSignName, a.signedAt,
     if (a.appliedAt between ${escape(dateFrom)} and ${escape(dateTo)},1,0) AS isApplied,
     if (a.signedAt between ${escape(dateFrom)} and ${escape(dateTo)},1,0) AS isSigned
    from ${appliedTrialTable} a
    LEFT JOIN ${reasonTable} main ON a.reasonMainId = main.id
    LEFT JOIN ${reasonTable} sub ON a.reasonSubId = sub.id
    LEFT JOIN ${reasonTable} sign ON a.reasonSignId = sign.id
   WHERE (a.externalId IN (${idsInCondition})
       OR a.appliedAt between ${escape(dateFrom)} and ${escape(dateTo)}
       OR a.signedAt between ${escape(dateFrom)} and ${escape(dateTo)})
     AND a.nctId in (${nctIdsInCondition});
  `;
}

const getSponsoredMatchesTickets = () => {
  return `SELECT * FROM v_rep_sponsored_matches_tickets`;
}

module.exports = {
  getInsightUsers,
  getSponsoredMatchesTickets,
  getAppliedUsersCount
};