// 这是存于session的一个 长存储文件
const state = {
    hclassid: {
        value: JSON.stringify({ id: 999999, role: 999999 }),
        id: 999999,
        inx:0,
        label: '全部班级'
    },
    classList: null,
    frombuzhi: false,
};

const mutations = {
    classList:(state, o) => {
        state.classList = o
    },
    // 布置作业批改 查看班级作业的记录
    hclassid:(state, o) => {
        state.hclassid = o
    },
    // 布置作业之后前往作业列表时设置为true 更新侧边栏导航
    frombuzhi (state, o) {
        state.frombuzhi = o
    },
};

const actions = {

};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
