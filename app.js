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

const interval = setInterval(async function () {
  console.log(" --- Search for New Recalculate Skills --- ");

  let res = await findNodesToRecalculate();

  console.log("num res = ", res.length);

  for (let i = 0; i < res.length; i++) {
    findMatchToSkillForProject(res[i]);

    // console.log("change = ",i,res.length )
  }
}, 20000);

interval;

// console.log("res findSkillsToRecalculate= " )

async function findMatchToSkillForProject(nodeData) {
  // if (nodeData._id.toString() == ("63098cfbb003e10004f9a9f1")) {
  // console.log("nodeData = ", nodeData);

  let res = await matchPrepareNode(nodeData._id, "Member");
  // console.log("matchPrepareSkillToMembers = ", res);

  let res2 = await matchPrepareNode(nodeData._id, "Role");
  // console.log("matchPrepareSkillToProjectRoles = " , res2)
  // }
}
