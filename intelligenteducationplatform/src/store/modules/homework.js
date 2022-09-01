const state = {
    GradeParams: null,
    StuPractiseParams: null,
    PaperTaskTea: null,
    StuId: null,
    OnLineParams: null,
};

const mutations = {
    GradeParams: (state, v) => {
        state.GradeParams = v;
    },
    StuPractiseParams: (state, v) => {
        state.StuPractiseParams = v;
    },
    PaperTaskTea: (state, v) => {
        state.PaperTaskTea = v;
    },
    StuId: (state, StuId) => {
        state.StuId = StuId;
    },
    OnLineParams: (state, v) => {
        state.OnLineParams = v;
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
