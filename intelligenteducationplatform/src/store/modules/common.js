const state = {
  machinecode: null,
  isMobile: false,
  stupapercorrection: null,
  taskstuobj: null,
  taskteaobj: null,
  correctionresult: null,
  teapapercorrection: null,
  poverdirection: { direction: "rtl", sliderSize: 45, buttonModel: "one" },
  stuIndex:null,
};

const mutations = {
  stuIndex:(state, v) => {
    state.stuIndex = v
  },
  SET_MachineCode: (state, v) => { // 全局机器码
    state.stuIndex = v;
  },
  SET_ISMOBILE: (state, v) => {
    state.isMobile = v;
  },
  stupapercorrection: (state, o) => {
    state.stupapercorrection = o;
  },
  taskstuobj: (state, o) => {
    state.taskstuobj = o;
  },
  taskteaobj: (state, o) => {
    state.taskteaobj = o;
  },
  correctionresult: (state, o) => {
    state.correctionresult = o;
  },
  teapapercorrection: (state, o) => {
    state.teapapercorrection = o;
  },
  poverdirection (state, data) {
    [state.poverdirection.direction, state.poverdirection.sliderSize, state.poverdirection.buttonModel] = [data.direction, data.sliderSize, data.buttonModel];
  }
};

const actions = {

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
