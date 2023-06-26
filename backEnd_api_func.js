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

  return res.data.data.findProjects;
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

  return res.data.data.findSkills;
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

  return res;
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

  return res;
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

  return res.data.data.matchPrepareSkillToMembers;
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

  // return res.data.data.matchPrepareNode;
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

  return res.data.data.matchPrepareSkillToProjectRoles;
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


  return res.data.data.updateConvSummaries;
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


  return res.data.data.updatePositionConvRecruiter;
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


  return res.data.data.updatePositionUserAnswers;
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

  return res.data.data.autoUpdateUserInfoFromCV;
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

  return res.data.data.autoUpdateMemoryFromCV;
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

  return res.data.data.updateSkillCategory;
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

  return res.data.data.updateSkillSubCategory;
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

  return res.data.data.createSkill;
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
  return res.data.data.relatedSkills;
}
