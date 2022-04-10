export default {
  baseUrl: "http://localhost:3003",
  authentication: {
    signUp: "/v1/client/signup",
    login: "/v1/client/login",
  },

  diet: {
    getAllDietTypes: "/v1/client/dietType/list",
    saveDietSchedule: "/v1/client/save/diet/schedule",
    getDietSchedule: (userId) => `/v1/client/diet/schedule/${userId}`,
    updateDietSchedule: (scheduleId) =>
      `/v1/client/update/diet/schedule/${scheduleId}`,

    recommededItems: (dietTypeId) =>
      `/v1/client/recommended/diet/items/${dietTypeId}`,
  },

  article: {
    add: "articles/add_content/",
    update: (article_id) => `articles/update_content/${article_id}/`,
    getAll: "articles/get_all/",
    getAuthorAll: "articles/get_author_all/",
    getParticular: (article_id) => `articles/get_particular/${article_id}`,
    getUnpublishedArticles: "articles/get_unpublished_article",
    getUnpublishedParticular: (article_id) =>
      `articles/get_Unpublishedparticular/${article_id}`,
  },
};
