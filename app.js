import dotenv from "dotenv";
import {
  findProjects,
  findSkillsToRecalculate,
  matchPrepareNode,
  findNodesToRecalculate,
  matchPrepareSkillToMembers,
  matchPrepareSkillToProjectRoles,
} from "./backEnd_api_func.js";

dotenv.config();

console.log("I am alive!");

let max_num_updates = 1;
let posUpdate = 0;

const interval = setInterval(async function () {
  console.log(" --- Search for New Recalculate Skills --- ");

  let res = await findNodesToRecalculate("Member");

  console.log(" num res =  ", res.length);
  // console.log(" posUpdate =  ", posUpdate);

  if (res.length > 0) {
    if (res.length > max_num_updates) {
      posUpdate = Math.floor(Math.random() * (res.length - max_num_updates));
    }

    // posUpdate = 86;
    // max_num_updates = 1;

    if (posUpdate + max_num_updates > res.length) {
      max_num_updates = res.length - posUpdate;
    }

    for (let i = posUpdate; i < posUpdate + max_num_updates; i++) {
      // for (let i = 0; i < res.length; i++) {
      findMatchToSkillForProject(res[i]);
      console.log("res[i]._id = ", i, res[i]._id);
      // console.log("change = ",i,res.length )
    }
  }

  // posUpdate = posUpdate + max_num_updates;
}, 30000);

interval;

// console.log("res findSkillsToRecalculate= " )

async function findMatchToSkillForProject(nodeData) {
  // if (nodeData._id.toString() == ("63098cfbb003e10004f9a9f1")) {
  // console.log("nodeData = ", nodeData);

  if (nodeData.match_v2_update.member) {
    await matchPrepareNode(nodeData._id, "Member");
  }
  // else if (nodeData.match_v2_update.projectRole) {
  //   await matchPrepareNode(nodeData._id, "ProjectRole");
  // }

  // await matchPrepareNode(nodeData._id, "Member");
  // // console.log("matchPrepareSkillToMembers = ", res);

  // await matchPrepareNode(nodeData._id, "ProjectRole");
  // // console.log("matchPrepareSkillToProjectRoles = " , res2)
  // // }
}
