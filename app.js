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
  autoUpdateMemoryFromPositionRequirments,
  updateAnalysisEdenAICandidates,
  updatePositionUserAnswers,
  autoUpdateUserInfoFromCV,
  autoUpdateMemoryFromCV,
  autoCreateCardsForPosition,
  autoCalculatePrioritiesAndQuestions,
  updatePositionConvRecruiter,
  autoCreateCardsCandidatesAndScore,
  connectMemoriesToKnowledgeGraph_V2,
  pingNeo4j,
  wait,
} from "./backEnd_api_func.js";



dotenv.config();

console.log("I am alive!");

let max_num_updates = 1;
let posUpdate = 0;

// await wait(5)
// f1

// // --------------- repeatCheckRecalculateNodes ----------------
// var speedFast_CheckNodes = 2500;
// var speedSlow_CheckNodes = 6000;

// var speed_CheckNodes = speedFast_CheckNodes;
// var speedBefore_CheckNodes = speedFast_CheckNodes;
// var changeSpeed_CheckNodes = speedFast_CheckNodes;


// let repeatCheckRecalculateNodesVar = setInterval(repeatCheckRecalculateNodes, speed_CheckNodes);
// // --------------- repeatCheckRecalculateNodes ----------------

let startTime = performance.now();
// --------------- autoCreateCardsCandidatesAndScore ----------------
startTime = performance.now();
let promiseAutoCreateCardsCandidatesAndScore
let autoCreateCardsCandidatesAndScoreVar = setTimeout(() => autoCreateCardsCandidatesAndScoreFunc(true,promiseAutoCreateCardsCandidatesAndScore,startTime));
// --------------- autoCreateCardsCandidatesAndScore ----------------

await wait(5)
// --------------- autoCalculatePrioritiesAndQuestions ----------------
startTime = performance.now();
let promiseAutoCalculatePrioritiesAndQuestions
let autoCalculatePrioritiesAndQuestionsVar = setTimeout(() => autoCalculatePrioritiesAndQuestionsFunc(true,promiseAutoCalculatePrioritiesAndQuestions,startTime));
// --------------- autoCalculatePrioritiesAndQuestions ----------------

await wait(5)

// --------------- autoCreateCardsForPosition ----------------
startTime = performance.now();
let promiseAutoCreateCardsForPosition
let autoCreateCardsForPositionVar = setTimeout(() => autoCreateCardsForPositionFunc(true,promiseAutoCreateCardsForPosition,startTime));
// --------------- autoCreateCardsForPosition ----------------


await wait(5)

// --------------- connectMemoriesToKnowledgeGraph_V2 ----------------
startTime = performance.now();
let promiseConnectMemoriesToKnowledgeGraph_V2
let autoConnectMemoriesToKnowledgeGraph_V2Var = setTimeout(() => autoConnectMemoriesToKnowledgeGraph_V2Func(true,promiseConnectMemoriesToKnowledgeGraph_V2,startTime));
// --------------- connectMemoriesToKnowledgeGraph_V2 ----------------




// --------------- repeatCalculateCVsummaryJobsNodesFunc ----------------
const speed_CalculateCVsummaryJobsNodes = 105000;
// const speed_CalculateCVsummaryJobsNodes = 55000;
let repeatCalculateCVsummaryJobsNodesVar = setInterval(repeatCalculateCVsummaryJobsNodesFunc, speed_CalculateCVsummaryJobsNodes);
// --------------- repeatCalculateCVsummaryJobsNodesFunc ----------------



// // --------------- autoUpdateMemoryFromPositionRequirments ----------------
// const speed_autoUpdateMemoryFromPositionRequirments = 130000;
// let autoUpdateMemoryFromPositionRequirmentsVar = setInterval(repeatAutoUpdateMemoryFromPositionRequirments, speed_autoUpdateMemoryFromPositionRequirments);
// // --------------- autoUpdateMemoryFromPositionRequirments ----------------




// // --------------- autoCreateCardsForPosition ----------------
// const speed_autoCreateCardsForPosition = 50000;
// let autoCreateCardsForPositionVar = setInterval(repeatAutoCreateCardsForPosition, speed_autoCreateCardsForPosition);
// // --------------- autoCreateCardsForPosition ----------------

// // --------------- repeatCalculateMemoryFromCV ----------------
// const speed_CalculateMemoryFromCV = 70000;
// let repeatAutoUpdateMemoryFromCVVar = setInterval(repeatCalculateMemoryFromCV, speed_CalculateMemoryFromCV);
// // --------------- repeatCalculateMemoryFromCV ----------------



// // --------------- repeatCalculateUpdateConvPositionAnswersFunc ----------------
// const speed_CalculateUpdateConvPositionAnswers = 170000;
// let repeatCalculateUpdateConvPositionAnswersVar = setInterval(repeatCalculateUpdateConvPositionAnswersFunc, speed_CalculateUpdateConvPositionAnswers);
// // --------------- repeatCalculateUpdateConvPositionAnswersFunc ----------------




// --------------- repeatKeepNeo4jOpen ----------------
let repeatKeepNeo4jOpenVar = setInterval(repeatKeepNeo4jOpen,  60 * 60 * 1000);
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
    if (res){
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
  }
  } else {
    console.log("changeSpeed_CheckNodes= ", changeSpeed_CheckNodes, speedBefore_CheckNodes);

  }
}

function changeRepeater(speed_change) {
  changeSpeed_CheckNodes = speed_change;

  return changeSpeed_CheckNodes;
}

async function autoCreateCardsCandidatesAndScoreFunc(doneCardCandidate,promiseCardCandidate,startTime) {

  if (doneCardCandidate) {
    promiseCardCandidate = autoCreateCardsCandidatesAndScore() // this is the function 
  }

  doneCardCandidate = false
  
  promiseCardCandidate.then(async (resAutoCreateCardCandidate) => {

    console.log("resAutoCreateCardCandidate = ",resAutoCreateCardCandidate)

    doneCardCandidate = true;
    
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / (60*1000); // Calculate duration in seconds
    // console.log("Function has ended. Repeat",durationInSeconds);

    // ------------- If the function came back too fast then wait a bit ---------
    if (durationInSeconds < 5){
      await wait(30) 
    }
    // ------------- If the function came back too fast then wait a bit ---------


    clearTimeout(autoCreateCardsCandidatesAndScoreVar); // clear the timeout when the function has ended
    autoCreateCardsCandidatesAndScoreVar = setTimeout(() => autoCreateCardsCandidatesAndScoreFunc(doneCardCandidate,promiseCardCandidate,performance.now()));

  })
  
}

async function autoCalculatePrioritiesAndQuestionsFunc(donePriorityQuestion, promisePriorityQuestion, startTime) {

  if (donePriorityQuestion) {
    promisePriorityQuestion = autoCalculatePrioritiesAndQuestions() // this is the function 
  }

  donePriorityQuestion = false
  
  promisePriorityQuestion.then(async (resAutoCalculatePriorityQuestion) => {

    console.log("resAutoCalculatePriorityQuestion = ",resAutoCalculatePriorityQuestion)

    donePriorityQuestion = true;
    
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / (60*1000); // Calculate duration in seconds
    // console.log("Function has ended. Repeat",durationInSeconds);

    // ------------- If the function came back too fast then wait a bit ---------
    if (durationInSeconds < 5){
      await wait(30) 
    }
    // ------------- If the function came back too fast then wait a bit ---------

    clearTimeout(autoCalculatePrioritiesAndQuestionsVar); // clear the timeout when the function has ended
    autoCalculatePrioritiesAndQuestionsVar = setTimeout(() => autoCalculatePrioritiesAndQuestionsFunc(donePriorityQuestion,promisePriorityQuestion,performance.now()));

  })
  
}

async function autoCreateCardsForPositionFunc(doneCardPosition, promiseCardPosition, startTime) {

  if (doneCardPosition) {
    promiseCardPosition = autoCreateCardsForPosition() // this is the function 
  }

  doneCardPosition = false
  
  promiseCardPosition.then(async (resAutoCreateCardPosition) => {

    console.log("resAutoCreateCardPosition = ",resAutoCreateCardPosition)

    doneCardPosition = true;
    
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / (60*1000); // Calculate duration in seconds
    // console.log("Function has ended. Repeat",durationInSeconds);

    // ------------- If the function came back too fast then wait a bit ---------
    if (durationInSeconds < 5){
      await wait(30) 
    }
    // ------------- If the function came back too fast then wait a bit ---------

    clearTimeout(autoCreateCardsForPositionVar); // clear the timeout when the function has ended
    autoCreateCardsForPositionVar = setTimeout(() => autoCreateCardsForPositionFunc(doneCardPosition,promiseCardPosition,performance.now()));

  })
  
}

async function autoConnectMemoriesToKnowledgeGraph_V2Func(doneConnectMemories, promiseConnectMemories, startTime) {

  if (doneConnectMemories) {
    promiseConnectMemories = connectMemoriesToKnowledgeGraph_V2() // this is the function 
  }

  doneConnectMemories = false
  
  promiseConnectMemories.then(async (resConnectMemoriesToKnowledgeGraph_V2) => {

    console.log("resConnectMemoriesToKnowledgeGraph_V2 = ",resConnectMemoriesToKnowledgeGraph_V2)

    doneConnectMemories = true;
    
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / (60*1000); // Calculate duration in seconds
    // console.log("Function has ended. Repeat",durationInSeconds);

    // ------------- If the function came back too fast then wait a bit ---------
    if (durationInSeconds < 5){
      await wait(30) 
    }
    // ------------- If the function came back too fast then wait a bit ---------

    clearTimeout(autoConnectMemoriesToKnowledgeGraph_V2Var); // clear the timeout when the function has ended
    autoConnectMemoriesToKnowledgeGraph_V2Var = setTimeout(() => autoConnectMemoriesToKnowledgeGraph_V2Func(doneConnectMemories,promiseConnectMemories,performance.now()));

  })
  
}

async function repeatCalculateCVsummaryJobsNodesFunc() {

  

  let usersUpdateFromCV = await autoUpdateUserInfoFromCV()
  console.log("usersUpdateFromCV = " , usersUpdateFromCV)


  if (usersUpdateFromCV?.users && usersUpdateFromCV?.users?.length == 0) {
    // let updateConvoRes = await updateConvSummaries()
    // console.log("updateConvoRes = " , updateConvoRes)
    
    
    // if (updateConvoRes?.length == 0) {
      
      //   let updatePositionUserAnswersRes = await updatePositionUserAnswers()
      //   console.log("updatePositionUserAnswersRes -= " , updatePositionUserAnswersRes)
      
      //   let updatePositionConvRecruiterRes = await updatePositionConvRecruiter()
      //   console.log("updatePositionConvRecruiterRes ->= " , updatePositionConvRecruiterRes)
      
    let updateAnalysisEdenAICandidatesRes = await updateAnalysisEdenAICandidates()
    console.log("updateAnalysisEdenAICandidatesRes -k-= " , updateAnalysisEdenAICandidatesRes)
    // }
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

// async function repeatAutoCreateCardsForPosition() {
//   // let autoCreateCardsForPositionRes = await autoCreateCardsForPosition()
//   let autoCreateCardsForPositionRes = await autoCalculatePrioritiesAndQuestions()
//   console.log("autoCreateCardsForPositionRes = " , autoCreateCardsForPositionRes)


//   clearInterval(autoCreateCardsForPositionVar);
  
//   autoCreateCardsForPositionVar = setInterval(repeatAutoCreateCardsForPosition, speed_autoCreateCardsForPosition);
// }

async function repeatCalculateMemoryFromCV() {
  let autoUpdateMemoryFromCVres = await autoUpdateMemoryFromCV()
  console.log("autoUpdateMemoryFromCVres = " , autoUpdateMemoryFromCVres)


  clearInterval(repeatAutoUpdateMemoryFromCVVar);
  
  repeatAutoUpdateMemoryFromCVVar = setInterval(repeatCalculateMemoryFromCV, speed_CalculateMemoryFromCV);
}


async function repeatAutoUpdateMemoryFromPositionRequirments() {

  let autoUpdateMemoryFromPositionRequirmentsRES = await autoUpdateMemoryFromPositionRequirments()
  console.log("autoUpdateMemoryFromPositionRequirmentsRES = " , autoUpdateMemoryFromPositionRequirmentsRES)



  clearInterval(autoUpdateMemoryFromPositionRequirmentsVar);
  
  autoUpdateMemoryFromPositionRequirmentsVar = setInterval(repeatAutoUpdateMemoryFromPositionRequirments, speed_autoUpdateMemoryFromPositionRequirments);
}

async function repeatKeepNeo4jOpen() {
  // run a function every day just to keep open the neo4j


  let rt = await pingNeo4j();

  console.log("rt = ", rt);

  clearInterval(repeatKeepNeo4jOpenVar);
  
  repeatKeepNeo4jOpenVar = setInterval(repeatKeepNeo4jOpen, 60 * 60 * 1000);
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
