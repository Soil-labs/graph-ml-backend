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
} from "./backEnd_api_func.js";

dotenv.config();

console.log("I am alive!");


var speedFast_CheckNodes = 2500;
var speedSlow_CheckNodes = 6000;

var speed_CheckNodes = speedFast_CheckNodes;
var speedBefore_CheckNodes = speedFast_CheckNodes;
var changeSpeed_CheckNodes = speedFast_CheckNodes;

let repeater, repeater_keepOpenNeo4j;
repeater = setInterval(repeatCheckRecalculateNodes, speed_CheckNodes);

repeater_keepOpenNeo4j = setInterval(repeatCalculateNodes, 24 * 60 * 60 * 1000);

async function repeatCheckRecalculateNodes() {
  console.log("changeSpeed_CheckNodes,speedBefore_CheckNodes = ", changeSpeed_CheckNodes, speedBefore_CheckNodes);
  if (changeSpeed_CheckNodes != speedBefore_CheckNodes) {
    console.log("change = 1.1.1");
    clearInterval(repeater);
    speedBefore_CheckNodes = changeSpeed_CheckNodes;
    speed_CheckNodes = changeSpeed_CheckNodes;
    repeater = setInterval(repeatCheckRecalculateNodes, speed_CheckNodes);
  }

  // random decide to have 0 or 1
  let random = Math.floor(Math.random() * 2);
  if (random == 0) {
    console.log("fast = " )
    speed_CheckNodes = changeRepeater(speedFast_CheckNodes);
  } else {
    console.log("slow = " )
    speed_CheckNodes = changeRepeater(speedSlow_CheckNodes);
  }

  // let res = await findNodesToRecalculate("All");
  // if (res) {
  //   res = res.data.data.findNodes;
  //   console.log("res.length = ", res.length);
  //   if (res.length > 0) {
  //     changeRepeater(speedFast_CheckNodes);

  //     if (res.length > max_num_updates) {
  //       posUpdate = Math.floor(Math.random() * (res.length - max_num_updates));
  //     }

  //     if (posUpdate + max_num_updates > res.length) {
  //       max_num_updates = res.length - posUpdate;
  //     }

  //     for (let i = posUpdate; i < posUpdate + max_num_updates; i++) {
  //       findMatchToSkillForProject(res[i]);
  //       console.log("res[i]._id = ", i, res[i]._id);
  //     }
  //   } else {
  //     changeRepeater(speedSlow_CheckNodes);
  //     // This means taht is empty so we can update the conversations

  //     if (speed_CheckNodes == speedSlow_CheckNodes) {
  //       let usersUpdateFromCV = await autoUpdateUserInfoFromCV()

  //       console.log("usersUpdateFromCV = " , usersUpdateFromCV)

  //       if (usersUpdateFromCV?.length == 0) {
  //         let updateConvoRes = await updateConvSummaries()

  //         console.log("updateConvoRes = " , updateConvoRes)

  //         if (updateConvoRes.length == 0) {

  //           let updatePositionUserAnswersRes = await updatePositionUserAnswers()

  //           console.log("updatePositionUserAnswersRes = " , updatePositionUserAnswersRes)


  //         }
  //       }
  //     }
  //   }
  // }
}
function changeRepeater(speed_change) {
  // console.log("change = 0.0.0");
  changeSpeed_CheckNodes = speed_change;

  return changeSpeed_CheckNodes;
}

async function repeatCalculateNodes() {
  // run a function every day just to keep open the neo4j

  console.log("test second corn = ");

  let res_t = await findOneNode();

  if (res_t && res_t.data && res_t.data.data && res_t.data.data.findNodes) {
    let res_k = res_t.data.data.findNodes;
    
    let rt = await matchPrepareNode(res_k[0]._id, "Member");
    
  }

  clearInterval(repeater_keepOpenNeo4j);
  // repeater_keepOpenNeo4j = setInterval(repeatCalculateNodes, 10000);
  repeater_keepOpenNeo4j = setInterval(repeatCalculateNodes, 24 * 60 * 60 * 1000);
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
