import { autoUpdateUserInfoFromCVSubsccriptionVersion } from "./backEnd_api_func.js";
import subscriptionClient from "./api/subscriptionClient.js";

export async function userCVSavedSubscription() {
  //USER_CV_SAVED

  const operation = {
    query: `
  subscription {
    userCVSavedToDB {
        userID
        cvSummary
    }
  }
`,
  };

  subscriptionClient.subscribe(operation, {
    next: async (result) => {
      const { userID, cvSummary } = result?.data?.userCVSavedToDB;
      console.log("cv summary", cvSummary);
      if (userID) {
        const result = await autoUpdateUserInfoFromCVSubsccriptionVersion(
          userID
        );
        console.log("processed CV", result);
      }
    },
    error: (error) => console.error(error),
    complete: () => console.log("Subscription complete"),
  });
}
