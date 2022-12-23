import dotenv from "dotenv";
import {
  findProjects,
  findSkillsToRecalculate,
  matchPrepareSkillToMembers,
  matchPrepareSkillToProjectRoles,
} from "./backEnd_api_func.js";

dotenv.config();

console.log("I am alive!");

const interval = setInterval(async function () {
  console.log(" --- Search for New Recalculate Skills --- ");

  let res = await findSkillsToRecalculate();

  console.log("number of skills to search: = ", res.length);

  for (let i = 0; i < res.length; i++) {
    findMatchToSkillForProject(res[i]);

    // console.log("change = ", i, res.length);
  }
}, 10000);

interval;

// console.log("res findSkillsToRecalculate= " )

async function findMatchToSkillForProject(skillData) {
  // if (skillData._id.toString() == ("63098cfbb003e10004f9a9f1")) {
  //   console.log("skillData = ", skillData);

  let res = await matchPrepareSkillToMembers(skillData._id);
  //   console.log("matchPrepareSkillToMembers = ", res);

  let res2 = await matchPrepareSkillToProjectRoles(skillData._id);
  //   console.log("matchPrepareSkillToProjectRoles = ", res2);
  // }
}
