const state = {
  token: localStorage.getItem("token"),
  id: 0,
  userInfo: null
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN: (state) => {
    state.token = "";
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  set_userInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
