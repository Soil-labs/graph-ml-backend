import dotenv from "dotenv";
import {
  findProjects,
  findSkillsToRecalculate,
  matchPrepareNode,
  findNodesToRecalculate,
  findOneNode,
  matchPrepareSkillToMembers,
  matchPrepareSkillToProjectRoles,
} from "./backEnd_api_func.js";

dotenv.config();

console.log("I am alive!");

let max_num_updates = 1;
let posUpdate = 0;

let timeRepeatSlow = 6000;
let timeRepeatFast = 1000;
let timeRepeat = timeRepeatSlow;

function changeInterval(res_length) {
  if (res_length > 0) {
    timeRepeat = timeRepeatFast;
  } else {
    timeRepeat = timeRepeatSlow;
  }
}

// const interval = setInterval(async function () {
//   console.log(" --- Search for New Recalculate Skills --- ");

//   let res = await findNodesToRecalculate("All");

//   if (res) {
//     res = res.data.data.findNodes;
//     console.log(" num res =  ", res.length);
//     // console.log(" posUpdate =  ", posUpdate);

//     changeInterval(res.length);

//     console.log("timeRepeat = ", timeRepeat);

//     // if (res.length > 0) {
//       // if (res.length > max_num_updates) {
//       //   posUpdate = Math.floor(Math.random() * (res.length - max_num_updates));
//       // }

//       // // posUpdate = 86;
//       // // max_num_updates = 1;

//       // if (posUpdate + max_num_updates > res.length) {
//       //   max_num_updates = res.length - posUpdate;
//       // }

//       // for (let i = posUpdate; i < posUpdate + max_num_updates; i++) {
//       //   // for (let i = 0; i < res.length; i++) {
//       //   findMatchToSkillForProject(res[i]);
//       //   console.log("res[i]._id = ", i, res[i]._id);
//       //   // console.log("change = ",i,res.length )
//       // }

//     // }
//   }

//   // posUpdate = posUpdate + max_num_updates;
// }, timeRepeat);

// interval;

var speed_fast = 2500;
var speed_slow = 60000;

var speed = speed_fast;
var speed_before = speed_fast;
var changeSpeed = speed_fast;

let repeater, repeater_keepOpenNeo4j;
repeater = setInterval(repeaterFn, speed);

// repeater_keepOpenNeo4j = setInterval(keepOpenNeo4j, 10000);
repeater_keepOpenNeo4j = setInterval(keepOpenNeo4j, 24 * 60 * 60 * 1000);

async function repeaterFn() {
  console.log("changeSpeed,speed_before = ", changeSpeed, speed_before);
  if (changeSpeed != speed_before) {
    console.log("change = 1.1.1");
    clearInterval(repeater);
    speed_before = changeSpeed;
    speed = changeSpeed;
    repeater = setInterval(repeaterFn, speed);
  }

  let res = await findNodesToRecalculate("All");
  if (res) {
    res = res.data.data.findNodes;
    console.log("res.length = ", res.length);
    if (res.length > 0) {
      changeRepeater(speed_fast);

      if (res.length > max_num_updates) {
        posUpdate = Math.floor(Math.random() * (res.length - max_num_updates));
      }

      if (posUpdate + max_num_updates > res.length) {
        max_num_updates = res.length - posUpdate;
      }

      for (let i = posUpdate; i < posUpdate + max_num_updates; i++) {
        findMatchToSkillForProject(res[i]);
        console.log("res[i]._id = ", i, res[i]._id);
      }
    } else {
      changeRepeater(speed_slow);
    }
  }
}
function changeRepeater(speed_change) {
  console.log("change = 0.0.0");
  changeSpeed = speed_change;
}

async function keepOpenNeo4j() {
  // run a function every day just to keep open the neo4j

  console.log("test second corn = ");

  let res_t = await findOneNode();

  console.log("res_t.data.data = ", res_t.data.data);
  if (res_t && res_t.data && res_t.data.data && res_t.data.data.findNodes) {
    let res_k = res_t.data.data.findNodes;
    // console.log("res_k = ", res_k);
    // console.log("res_k = ", res_k[0]);
    // console.log("res_k = ", res_k[0]._id);
    let rt = await matchPrepareNode(res_k[0]._id, "Member");
    // console.log("rtqw = ", rtqw);
    // asdf;
  }

  clearInterval(repeater_keepOpenNeo4j);
  // repeater_keepOpenNeo4j = setInterval(keepOpenNeo4j, 10000);
  repeater_keepOpenNeo4j = setInterval(keepOpenNeo4j, 24 * 60 * 60 * 1000);
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
