import dotenv from "dotenv";
import {
  findProjects,
  findSkillsToRecalculate,
  matchPrepareNode,
  findNodesToRecalculate,
  findOneNode,
  matchPrepareSkillToMembers,
  matchPrepareSkillToProjectRoles,
  updateConvSummaries,
  updatePositionUserAnswers,
  autoUpdateUserInfoFromCV,
  autoUpdateMemoryFromCV,
  updatePositionConvRecruiter,
} from "./backEnd_api_func.js";



dotenv.config();

console.log("I am alive!");

let max_num_updates = 1;
let posUpdate = 0;

// // --------------- repeatCheckRecalculateNodes ----------------
// var speedFast_CheckNodes = 2500;
// var speedSlow_CheckNodes = 6000;

// var speed_CheckNodes = speedFast_CheckNodes;
// var speedBefore_CheckNodes = speedFast_CheckNodes;
// var changeSpeed_CheckNodes = speedFast_CheckNodes;


// let repeatCheckRecalculateNodesVar = setInterval(repeatCheckRecalculateNodes, speed_CheckNodes);
// // --------------- repeatCheckRecalculateNodes ----------------


// --------------- repeatCalculateCVsummaryJobsNodesFunc ----------------
const speed_CalculateCVsummaryJobsNodes = 105000;
let repeatCalculateCVsummaryJobsNodesVar = setInterval(repeatCalculateCVsummaryJobsNodesFunc, speed_CalculateCVsummaryJobsNodes);
// --------------- repeatCalculateCVsummaryJobsNodesFunc ----------------


// // --------------- repeatCalculateMemoryFromCV ----------------
// const speed_CalculateMemoryFromCV = 45000;
// let repeatAutoUpdateMemoryFromCVVar = setInterval(repeatCalculateMemoryFromCV, speed_CalculateMemoryFromCV);
// // --------------- repeatCalculateMemoryFromCV ----------------


// // --------------- repeatCalculateUpdateConvPositionAnswersFunc ----------------
// const speed_CalculateUpdateConvPositionAnswers = 170000;
// let repeatCalculateUpdateConvPositionAnswersVar = setInterval(repeatCalculateUpdateConvPositionAnswersFunc, speed_CalculateUpdateConvPositionAnswers);
// // --------------- repeatCalculateUpdateConvPositionAnswersFunc ----------------




// --------------- repeatKeepNeo4jOpen ----------------
let repeatKeepNeo4jOpenVar = setInterval(repeatKeepNeo4jOpen, 24 * 60 * 60 * 1000);
// --------------- repeatKeepNeo4jOpen ----------------


// // --------------- updatePositionConvRecruiterFunc ----------------
// const speed_updatePositionConvRecruiter = 20000;
// let repeat_updatePositionConvRecruiter = setInterval(updatePositionConvRecruiterFunc, speed_updatePositionConvRecruiter);
// // --------------- updatePositionConvRecruiterFunc ----------------







async function repeatCheckRecalculateNodes() {
  if (changeSpeed_CheckNodes != speedBefore_CheckNodes) {
    clearInterval(repeatCheckRecalculateNodesVar);
    speedBefore_CheckNodes = changeSpeed_CheckNodes;
    speed_CheckNodes = changeSpeed_CheckNodes;
    repeatCheckRecalculateNodesVar = setInterval(repeatCheckRecalculateNodes, speed_CheckNodes);
  }



  let res = await findNodesToRecalculate("All");
  if (res) {
    res = res.data.data.findNodes;
    console.log("res.length = ", res.length);
    if (res.length > 0) {
      changeRepeater(speedFast_CheckNodes);

      if (res.length > max_num_updates) {
        posUpdate = Math.floor(Math.random() * (res.length - max_num_updates));
      }

      if (posUpdate + max_num_updates > res.length) {
        max_num_updates = res.length - posUpdate;
      }

      for (let i = posUpdate; i < posUpdate + max_num_updates; i++) {
        findMatchToSkillForProject(res[i]);
        // console.log("res[i]._id = ", i, res[i]._id);
      }
    } else {
      changeRepeater(speedSlow_CheckNodes);

    }
  } else {
    console.log("changeSpeed_CheckNodes= ", changeSpeed_CheckNodes, speedBefore_CheckNodes);

  }
}

function changeRepeater(speed_change) {
  changeSpeed_CheckNodes = speed_change;

  return changeSpeed_CheckNodes;
}

async function repeatCalculateCVsummaryJobsNodesFunc() {

  

  let usersUpdateFromCV = await autoUpdateUserInfoFromCV()
  console.log("usersUpdateFromCV = " , usersUpdateFromCV)


  if (usersUpdateFromCV?.length == 0) {
    let updateConvoRes = await updateConvSummaries()
    console.log("updateConvoRes = " , updateConvoRes)


    if (updateConvoRes?.length == 0) {

      let updatePositionUserAnswersRes = await updatePositionUserAnswers()
      console.log("updatePositionUserAnswersRes -= " , updatePositionUserAnswersRes)

      let updatePositionConvRecruiterRes = await updatePositionConvRecruiter()
      console.log("updatePositionConvRecruiterRes ->= " , updatePositionConvRecruiterRes
    }
  }


  
  clearInterval(repeatCalculateCVsummaryJobsNodesVar);
  
  repeatCalculateCVsummaryJobsNodesVar = setInterval(repeatCalculateCVsummaryJobsNodesFunc, speed_CalculateCVsummaryJobsNodes);
}

async function repeatCalculateUpdateConvPositionAnswersFunc() {

  
  let updateConvoRes = await updateConvSummaries()
  console.log("updateConvoRes = -------------------0-0-0-0- " , updateConvoRes)


  if (updateConvoRes?.length == 0) {

    let updatePositionUserAnswersRes = await updatePositionUserAnswers()
    console.log("updatePositionUserAnswersRes = " , updatePositionUserAnswersRes)

    
    let updatePositionConvRecruiterRes = await updatePositionConvRecruiter()
    console.log("updatePositionConvRecruiterRes ->= " , updatePositionConvRecruiterRes)



    clearInterval(repeatCalculateUpdateConvPositionAnswersVar);
    
    repeatCalculateUpdateConvPositionAnswersVar = setInterval(repeatCalculateUpdateConvPositionAnswersFunc, speed_CalculateUpdateConvPositionAnswers);
  }


  if (updateConvoRes !== undefined) {
    clearInterval(repeatCalculateUpdateConvPositionAnswersVar);
    
    repeatCalculateUpdateConvPositionAnswersVar = setInterval(repeatCalculateUpdateConvPositionAnswersFunc, speed_CalculateUpdateConvPositionAnswers);
  }
}

async function updatePositionConvRecruiterFunc() {

  
  let updatePositionConvRecruiterRes = await updatePositionConvRecruiter()
  console.log("updatePositionConvRecruiterRes ->= " , updatePositionConvRecruiterRes)


  
  clearInterval(repeat_updatePositionConvRecruiter);
  repeat_updatePositionConvRecruiter = setInterval(updatePositionConvRecruiterFunc, speed_updatePositionConvRecruiter);
}

async function repeatCalculateMemoryFromCV() {



  let autoUpdateMemoryFromCVres = await autoUpdateMemoryFromCV()
  console.log("autoUpdateMemoryFromCVres = " , autoUpdateMemoryFromCVres)



  
  clearInterval(repeatAutoUpdateMemoryFromCVVar);
  
  repeatAutoUpdateMemoryFromCVVar = setInterval(repeatCalculateMemoryFromCV, speed_CalculateMemoryFromCV);
}

async function repeatKeepNeo4jOpen() {
  // run a function every day just to keep open the neo4j


  let res_t = await findOneNode();

  console.log("res_t.data.data = ", res_t.data.data);
  if (res_t && res_t.data && res_t.data.data && res_t.data.data.findNodes) {
    let res_k = res_t.data.data.findNodes;
    
    let rt = await matchPrepareNode(res_k[0]._id, "Member");
    
  }

  clearInterval(repeatKeepNeo4jOpenVar);
  
  repeatKeepNeo4jOpenVar = setInterval(repeatKeepNeo4jOpen, 24 * 60 * 60 * 1000);
}

// console.log("res findSkillsToRecalculate= " )

async function findMatchToSkillForProject(nodeData) {
  // if (nodeData._id.toString() == ("63098cfbb003e10004f9a9f1")) {
  // console.log("nodeData = ", nodeData);

  if (nodeData.match_v2_update.member) {
    await matchPrepareNode(nodeData._id, "Member");
  } else if (nodeData.match_v2_update.projectRole) {
    await matchPrepareNode(nodeData._id, "ProjectRole");
  }

  // await matchPrepareNode(nodeData._id, "Member");
  // // console.log("matchPrepareSkillToMembers = ", res);

  // await matchPrepareNode(nodeData._id, "ProjectRole");
  // // console.log("matchPrepareSkillToProjectRoles = " , res2)
  // // }
}
