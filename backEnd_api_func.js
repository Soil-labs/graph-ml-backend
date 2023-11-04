import apiClient from "./api/axios.js";
import apiClientCron from "./api/axiosCron.js";
// import apiClientCron from "./api/axiosCron.js";

export async function findProjects() {
  let res = await apiClient({
    data: {
      query: `query{
        findProjects(fields:{
            # serverID: "996558082098339953"
        }){
            _id
            title
            
        }
        }`,
    },
  });

  if (res && res.data && res.data.data && res.data.data.findProjects) {
    return res.data.data.findProjects;
  } else {
    console.error('Error in findProjects: response is undefined or malformed');
    return null;
  }
}

export async function findSkillsToRecalculate() {
  let res = await apiClient({
    data: {
      query: `query{
        findSkills(fields:{
          recalculateMembers: false,
          recalculateProjectRoles: false
      }){
        _id
        name
        match {
          recalculateMembers
          recalculateProjectRoles
        }
      }
      }`,
    },
  });

  if (res && res.data && res.data.data && res.data.data.findSkills) {
    return res.data.data.findSkills;
  } else {
    console.error('Error in findSkillsToRecalculate: response is undefined or malformed');
    return null;
  }
}

export async function findNodesToRecalculate(recalculate) {
  let res = await apiClient({
    data: {
      query: `query{
        findNodes(fields:{
          recalculate_en: ${recalculate}
      }){
        _id
        match_v2_update {
          member
          projectRole
        }
      }
      }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data && res.data.data.findNodes) {
    return res.data.data.findNodes;
  } else {
    console.error('Error in findNodesToRecalculate: response is undefined or malformed');
    return null;
  }
}



export async function findOneNode() {
  let res = await apiClient({
    data: {
      query: `query{
        findNodes(fields:{
      }){
        _id
        match_v2_update {
          member
          projectRole
        }
      }
      }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data && res.data.data.findNodes) {
    return res.data.data.findNodes;
  } else {
    console.error('Error in findOneNode: response is undefined or malformed');
    return null;
  
  }
}

export async function matchPrepareSkillToMembers(skillID) {
  let res = await apiClient({
    data: {
      query: `query{
        matchPrepareSkillToMembers(fields:{
          skillID: "${skillID}"
      }){
        _id
        name
        match {
          recalculateMembers
          recalculateProjectRoles
          distanceMembers {
            hop0
            hop1
            hop2
          }
        }
      }
      }`,
    },
  });

  if (res && res.data && res.data.data && res.data.data.matchPrepareSkillToMembers) {
    return res.data.data.matchPrepareSkillToMembers;
  } else {
    console.error('Error in matchPrepareSkillToMembers: response is undefined or malformed');
    return null;
  }
}

export async function matchPrepareNode(nodeID, find) {
  // console.log("res = ", nodeID, find);

  let res = await apiClient({
    data: {
      query: `query{
        matchPrepareNode_AI4(fields:{
          nodeID: "${nodeID}"
          find: ${find}
          distancePenalty: [1,0.3,0.1]
      }){
        _id
        name
      }
      }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data && res.data.data.matchPrepareNode_AI4) {
    return res.data.data.matchPrepareNode_AI4;
  } else {
    console.error('Error in matchPrepareNode: response is undefined or malformed');
    return null;
  }
}

export async function matchPrepareSkillToProjectRoles(skillID) {
  let res = await apiClient({
    data: {
      query: `query{
        matchPrepareSkillToProjectRoles(fields:{
          skillID: "${skillID}"
      }){
        _id
        name
        match {
          recalculateMembers
          recalculateProjectRoles
          distanceProjectRoles {
            hop0
            hop1
            hop2
          }
        }
      }
      }`,
    },
  });

  if (res && res.data && res.data.data && res.data.data.matchPrepareSkillToProjectRoles) {
    return res.data.data.matchPrepareSkillToProjectRoles;
  } else {
    console.error('Error in matchPrepareSkillToProjectRoles: response is undefined or malformed');
    return null;
  }
}

export async function updateConvSummaries() {
  // let res = await apiClient({
    let res = await apiClientCron({
    data: {
      query: `mutation{
            updateConvSummaries(fields:{
            }){
              _id
              userID
              summary {
                pineConeID
                content
              }
              updatedAt
              summaryReady
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data && res.data.data) {
    return res.data.data.updateConvSummaries;
  } else {
    console.error('Error in updateConvSummaries: response is undefined or malformed');
    return null;
  }
}

export async function updatePositionConvRecruiter() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
            updatePositionConvRecruiter(fields:{
            }){
              _id
              convRecruiter {
                user {
                  _id
                  discordName
                }
                readyToDisplay
                positionQuestions {
                  question
                  content
                }
                roleQuestions {
                  question
                  content
                }
              }
              convRecruiterReadyToDisplay
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });


  if (res && res.data && res.data.data && res.data.data.updatePositionConvRecruiter) {
    return res.data.data.updatePositionConvRecruiter;
  } else {
    console.error('Error in updatePositionConvRecruiter: response is undefined or malformed');
    return null;
  }
}


export async function updatePositionUserAnswers() {
  // let res = await apiClient({
  let res = await apiClientCron({
    data: {
      query: `mutation{
            updatePositionUserAnswers(fields:{
            }){
              _id
              name
              candidatesReadyToDisplay
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });


  if (res && res.data && res.data.data) {
    return res.data.data.updatePositionUserAnswers;
  } else {
    console.error('Error in updatePositionUserAnswers: response is undefined or malformed');
    return null;
  }
}

export async function updateAnalysisEdenAICandidates() {
  // let res = await apiClient({
  let res = await apiClientCron({
    data: {
      query: `mutation{
        updateAnalysisEdenAICandidates(fields:{
            }){
              _id
              candidatesFlagAnalysisCreated
              candidates {
                analysisCandidateEdenAI {
                  flagAnalysisCreated
                  background {
                    content
                  }
                }
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });


  return res.data.data.updateAnalysisEdenAICandidates;
}

export async function autoUpdateUserInfoFromCV() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
            autoUpdateUserInfoFromCV(fields:{
            }){
              users {
                _id
                discordName
                bio
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data) {
    return res.data.data.autoUpdateUserInfoFromCV;
  } else {
    console.error('Error in autoUpdateUserInfoFromCV: response is undefined or malformed');
    return null;
  }
}


export async function autoUpdateMemoryFromCV() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
          autoUpdateMemoryFromCV(fields:{
            }){
              users {
                _id
                discordName
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data && res.data.data.autoUpdateMemoryFromCV) {
    return res.data.data.autoUpdateMemoryFromCV;
  } else {
    console.error('Error in autoUpdateMemoryFromCV: response is undefined or malformed');
    return null;
  }
}

export async function autoCreateCardsCandidatesAndScore() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
          autoCreateCardsCandidatesAndScore(fields:{
            }){
              _id
              name
              company {
                slug
              }
              allCandidateScoreCardCalculated
              candidates {
                user {
                  _id
                  discordName
                }
                candidateScoreCardCalculated
                scoreCardTotal {
                  score
                  scoreCardCalculated
                }
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data ) {
    return res.data.data.autoCreateCardsCandidatesAndScore;
  } else {
    console.error('Error in autoCreateCardsCandidatesAndScore: response is undefined or malformed');
    return null
  }
}


export async function autoCreateCardsForPosition() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
          autoCreateCardsForPosition(fields:{
            }){
              _id
              content
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data ) {
    return res.data.data.autoCreateCardsForPosition;
  } else {
    console.error('Error in autoCreateCardsForPosition: response is undefined or malformed');
    return null
  }
}

export async function wait(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      return "yo"
    }, x*1000);
  });
}


export async function autoCalculatePrioritiesAndQuestions() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
          autoCalculatePrioritiesAndQuestions(fields:{
            }){
              _id
              name
              prioritiesPositionCalculated

              positionsRequirements {
                originalContent
                priorities {
                  priority
                }
                tradeOffs {
                  tradeOff1
                  tradeOff2
                }
              }
              questionsToAsk {
                question {
                  _id
                  content
                }
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data) {
    return res.data.data.autoCalculatePrioritiesAndQuestions;
  } else {
    console.error('Error in autoCalculatePrioritiesAndQuestions: response is undefined or malformed');
    return null;
  }
}


export async function autoUpdateMemoryFromPositionRequirments() {
  let res = await apiClientCron({
    data: {
      query: `mutation{
          autoUpdateMemoryFromPositionRequirments(fields:{
            }){
              positions {
                _id
                name
                positionsRequirements {
                  positionPreparationMemory
                  originalContent
                }
              }
            }
          }`,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (res && res.data && res.data.data) {
    return res.data.data.autoUpdateMemoryFromPositionRequirments;
  } else {
    console.error('Error in autoUpdateMemoryFromPositionRequirments: response is undefined or malformed');
    return null;
  }
}


export async function CreateSkillCategory(name, id_lightcast) {
  let res = await apiClient({
    data: {
      query: `mutation{
            updateSkillCategory(fields:{
              name: "${name}"
              
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              id_lightcast
            }
          }`,
    },
  });

  if (res && res.data && res.data.data) {
    return res.data.data.updateSkillCategory;
  } else {
    console.error('Error in updateSkillCategory: response is undefined or malformed');
    return null;
  }
}

export async function CreateSkillSubCategory(name, id_lightcast) {
  let res = await apiClient({
    data: {
      query: `mutation{
            updateSkillSubCategory(fields:{
              name: "${name}"
              
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              id_lightcast
            }
          }`,
    },
  });

  if (res && res.data && res.data.data) {
    return res.data.data.updateSkillSubCategory;
  } else {
    console.error('Error in updateSkillSubCategory: response is undefined or malformed');
    return null;
  }
}

export async function createSkill(
  name,
  id_lightcast,
  categorySkills,
  subCategorySkill
) {
  let res = await apiClient({
    data: {
      query: `mutation{
            createSkill(fields:{
              name: "${name}"
              state: approved
              categorySkills: ["${categorySkills}"]
              subCategorySkill: ["${subCategorySkill}"]
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              state
              categorySkills{
                name
              }
              subCategorySkill{
                name
              }
              id_lightcast
              
                
            }
          }`,
    },
  });

  if (res && res.data && res.data.data) {
    return res.data.data.createSkill;
  } else {
    console.error('Error in createSkill: response is undefined or malformed');
    return null;
  }
}

export async function relatedSkills(coreSkill_id, relatedSkill_id) {
  let res = await apiClient({
    data: {
      query: `mutation{
        relatedSkills(fields:{
          _id: "${coreSkill_id}"
          relatedSkills_id: ["${relatedSkill_id}"]
        }){
          _id
          name
      
          relatedSkills{
            _id
            name
          }
          
            
        }
      }`,
    },
  });

  // return (res.data)
  if (res && res.data && res.data.data) {
    return res.data.data.relatedSkills;
  } else {
    console.error('Error in relatedSkills: response is undefined or malformed');
    return null;
  }
}