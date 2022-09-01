const state = {
  // 布置试卷作业
  BlankPaper: [],
  CardPaper: [],
  title: "",
  blank: [],
  AssignPaperData: [],
  // generateTopicArray: [],
  gengerWay: 1,
  // loading
  loading: false,
  errorLoading: false,
  //w1
  onlinePaperParams: null,
  // w2
  topicArray: [],
  pagesInfo: [], // 试卷批改结果 w2
  stuImgs: null, // 学生图片
  paperType: null, // 试卷类型
  paperData: null, // 试卷类型
  nativeCorreect: null, // 试卷批改接口返回的结果
  handleImgUrl: [], // 试卷批改接口返回的结果
  // imgUrl: [], // 试卷批改接口返回的结果
  homework: null,
  student: null,
  // way 3
  pagesInfoW3: null, // 试卷批改结果 w3
  // way 4
  way4NativeImg: [], // 原生图片
  way4ProcessedImg: [], // 处理过的图片
  // images
  nativeImgs: [],
  imgs: [],
  answerImg: [],
  cardImg: [],
  examsave: null,
  isClear: true
};

const mutations = {
  BlankPaper: (state, blankPaper) => {
    state.BlankPaper = blankPaper;
  },
  CardPaper: (state, cardPaper) => {
    state.CardPaper = cardPaper;
  },
  set_title: (state, title) => {
    state.title = title;
  },
  set_blank: (state, blank) => {
    state.blank = blank;
  },
  set_gengerWay: (state, value) => {
    state.gengerWay = value;
  },
  set_nativeImgs: (state, value) => {
    state.nativeImgs = value;
  },
  // set_generateTopicArray: (state, value) => { // 先不删
  //   state.generateTopicArray = value;
  // },
  AssignPaperData: (state, assignPaperData) => {
    state.AssignPaperData = assignPaperData;
  },
  // loading
  commit_loading: (state, loading) => {
    state.loading = loading;
  },
  //way 1
  set_onlinePaperParams: (state, onlinePaperParams) => {
    state.onlinePaperParams = onlinePaperParams;
  },
  // way 2
  commit_topic: (state, topic) => {
    state.topicArray = topic;
  },
  commit_pagesInfo: (state, pagesInfo) => {
    state.pagesInfo = pagesInfo;
  },
  commit_stuImgs: (state, stuImgs) => {
    state.stuImgs = stuImgs;
  },
  commit_paperType: (state, paperType) => {
    state.paperType = paperType;
  },
  commit_paperData: (state, paperData) => {
    state.paperData = paperData;
  },
  commit_nativeCorreect: (state, nativeCorreect) => {
    state.nativeCorreect = nativeCorreect;
  },
  commit_handleImgUrl: (state, handleImgUrl) => {
    state.handleImgUrl = handleImgUrl;
  },
  // commit_imgUrl: (state, imgUrl) => { // 先不删
  //   state.imgUrl = imgUrl;
  // },
  commit_homework: (state, homework) => {
    state.homework = homework;
  },
  commit_student: (state, student) => {
    state.student = student;
  },
  // way 3
  commit_pagesInfoW3: (state, pagesInfoW3) => {
    state.pagesInfoW3 = pagesInfoW3;
  },
  set_assign_imgs: (state, arr) => {
    state.imgs = arr;
  },
  set_assign_answerImg: (state, arr) => {
    state.answerImg = arr;
  },
  set_assign_cardImg: (state, arr) => {
    state.cardImg = arr;
  },
  set_examsave: (state, value) => {
    state.examsave = value;
  },
  set_isClear: (state, value) => {
    state.isClear = value;
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
