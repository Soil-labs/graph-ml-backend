import apiClient from "./api/axios.js"

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
    })

  return (res.data.data.findProjects)

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
  })


  


return (res.data.data.findSkills)

}


export async function findNodesToRecalculate() {

  let res = await apiClient({
  data: {
      query: `query{
        findNodes(fields:{
          matchByServer_update: true
      }){
        _id
        name
      }
      }`,
  },
  }).catch((err) => {
    console.log(err)
  })


  


return (res.data.data.findNodes)

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
  })


return (res.data.data.matchPrepareSkillToMembers)

}

export async function matchPrepareNode(nodeID,find) {

  let res = await apiClient({
  data: {
      query: `query{
        matchPrepareNode(fields:{
          nodeID: "${nodeID}"
          find: ${find}
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
  }).catch((err) => {
    console.log(err)
  })

  // console.log("res = " , nodeID,find,res)


return (res.data.data.matchPrepareNode)

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
  })


return (res.data.data.matchPrepareSkillToProjectRoles)

}



export async function CreateSkillCategory(name,id_lightcast) {

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
    })

  return (res.data.data.updateSkillCategory)

}

export async function CreateSkillSubCategory(name,id_lightcast) {

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
    })

  return (res.data.data.updateSkillSubCategory)

}

export async function createSkill(name,id_lightcast,categorySkills,subCategorySkill) {

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
    })

  return (res.data.data.createSkill)

}


export async function relatedSkills(coreSkill_id,relatedSkill_id) {

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
  })

// return (res.data)
return (res.data.data.relatedSkills)

}