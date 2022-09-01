let api = {
    //用户登录修改密码信息验证模块
    Login: "/login",
    Sendloginsms: "/sendloginsms",
    Smstologin: "/smstologin",
    Sendmessage: "/sendmessage",
    Forgetpassword: "/forgetpassword",
    Logout: "/logout",
    Register: "/register",

    //考试阅卷模块
    getmyExam:"/test/mytest",
    assignExternalpaper:'/test/assigntask',
    deleteExam:"/test/deletetest",
    assignInternalpaperexam:'/etc/setPaper',
    setTest:'/etc/settest',
    testAddmediaofpicture: "/test/addmediaofpicture",
    testAddmediaofanswer: "/test/addmediaofanswer",

    //topic
    GetTopic: "/topic/gettopicbyid",
    Gettopicbyidarr: "/topic/gettopicbyidarr",
    Getknowledge: "/exam/getknowledge",
    ExamGetTopic: "/exam/getTopic",
    Getversion: "/topic/getversion",
    Existgrade: "/ck/existgrade",
    GetChapterOrKnowledge:"/topic/getChapterOrKnowledge",
    AddTopics:"/topic/addTopics",
    GetMyTopic:"/topic/getMyTopic",
    GetMyAllTopic: "/topic/getMyAllTopic",
    SetTopic: "/topic/setTopics",
    RemoveTopic: "/topic/removeTopics",
    // Getversion
    Existedition: "/ck/existedition",
    // Getknowledge
    Getall: "/ck/getall",
    Getknowledge2: "/ck/get",
    Getgradename: "/exam/zt/getgradename",
    Getarea: "/exam/zt/getarea",
    Getyear: "/exam/zt/getyear",
    Getpapertype: "/exam/zt/getpapertype",
    GetPaperForSAuto: "/exam/zt/getPaper",
    Getpaperbyid: "/exam/zt/getpaperbyid",
    Getrecordtopichistory: "/homework/toassignhomeworkbyai",
    Gettopicbyselect: "/topic/gettopicbyselect",
    Toassignhomework: "/homework/toassignhomework",
    Submithomework: "/homework/submithomework",
    Recordhomeworktopic: "/homework/recordhomeworktopic",
    Checkhomewotkissubmit: "/homework/checkhomewotkissubmit",
    Gettopichistorybyhomeworkidandstuid: "/topic/gettopichistorybyhomeworkidandstuid",
    Addcheck: "/hc/addcheck",
	Gethccheck: "/hc/getcheck",
	Updatecheck: "/hc/updatecheck",
    Homeworkconditionofscore: "/homework/homeworkconditionofscore",
    GetTopicsCondition: "/topic/gettopichistory",
    Topichistoryaddimg: "/homework/topichistoryaddimg",
    Submitandrecord: "/homework/submitandrecord",
    Gettopicrecordbytopicid: "/homework/gettopicrecordbytopicid",

    //考试阅卷
    setinternalPaper:"/setPaper",

    //任务模块 task
    Assigntask: "/homework/assigntask",
    Assigntaskaddmedia: "/homework/assigntaskaddmedia",
    MyHomework: "/homework/myhomework",
    GetByClassId: "/homework/gethomeworkbyclassid",
    MyAssignHomework: "/homework/assignhomework",
    ToassignhomeworkByClass: "/homework/getmyassignhomeworkbyclass",
    Getmyhomeworkbystatus: "/homework/getmyhomeworkbystatus",
    Getnotcompletebyclassid: "/homework/getnotcompletebyclassid",
    Gethomeworkofclass: "/homework/gethomeworkofclass",
    Gettestocr: "/task/gettestocr",
    Removetaskimage: "/task/removetaskimage",
    GetMedia: "/homework/getMedia",
    GetMedia1: "/test/getMedia",
    Assigntaskdeletemedia: "/homework/assigntaskdeletemedia",
    GetUrl: "/index/getUrl",
    GetUrls: "/index/getUrls",
    Gethomeworkconditionbyclass: "/homework/gethomeworkconditionbyclass",
    Getsingletaskisfinished: "/task/getsingletaskisfinished",
    Getalltaskisfinished: "/task/getalltaskisfinished",
    Getalltaskisfinished1: "/testtask/getalltaskisfinished",
    Gettaskbytaskid: "/task/gettaskbytaskid",
    Submittask: "/task/submittask",
    Marktaskhomework: "/task/marktaskhomework",
    Getstudentocr: "/task/getstudentocr",
    Getstudentocr1: "/testtask/getstudentocr",
    Updatestuocr: "/task/updatestuocr",
    Updatetestorc: "/task/updatetestorc",
    Updatetestorc1: "/testtask/updatetestorc",
    Submittaskimages: "/task/submittaskimages",
    Pgtaskimages: "/task/pgtaskimages",
    Addmediaofpicture: "/homework/addmediaofpicture",
    Addmediaofanswer: "/homework/addmediaofanswer",
    Secondpigai: "/homework/secondpigai",
    Secondpigai1: "/test/secondpigai",
    Gethomeworkstatus: "/homework/gethomeworkstatus",
    Deletehomework: "/homework/deletehomework",
    batchsubmittaskimages: "/testtask/batchsubmittaskimages",
    //人工智能辅助批改模块
    Correcttaskcomposition: "/task/correcttaskcomposition", //作文批改
	Getcorrect :"/task/getcorrect", //作文批改结果获取

    // 试卷批改
    Sethomework: "/ehc/sethomework",
    Addexamimg: "/esc/addexamimg",
    Addcardimg: "/esc/addcardimg",
    EhcAddList: "/ehc/addlist",
    EhcAddimg: "/ehc/addimg",
    Getpaperlist: "/ehc/getpaperlist",
    Getallpaperbystuid: "/ehc/getallpaperbystuid",
    Getallpaperbyclass: "/ehc/getallpaperbyclass",
    Updatelist: "ehc/updatelist",
    Addanswerimg: "/ehc/addanswerimg",
    Addremarkorscore: "/ehc/addremarkorscore",
    GetTopicSurveyByTopicId: "/homework/getTopicSurveyByTopicId",

    // 生成试卷
    Addexam: "/exam/addexam",
    CreateExam: "/exam/createExam",
    Examsave: "/esc/examsave",
    EscSave: "/esc/exam",
    GeneratePaper: "/paper/screenshot",
    GeneratePaperSd: "/paper/screenshotsd",
    GeneratePaperCard: "/paper/splitcard",
    GeneratePaperStuCard: "/paper/splitstucard",
    GetAllexambyuserid: "/esc/allexambyuserid",
    Getexamtypebyid: "/esc/getexamtypebyid",

    // 文档
    GetDocText: "/getdoctext",

    //衍生试卷
    CreatePaperbyZt: "/exam/zt/createpaperbyzt",
    CorrectComPosition: "/algorithm/correctcomposition",
    EnglishCorrect: "/algorithm/english_correct",

    // 测试题目用到的请求
    Getid: "topic/getid",
    GettopicbyidarrTopicTest: "topic/gettopicbyidarr",
}

export default api;