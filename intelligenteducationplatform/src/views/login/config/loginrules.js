const phoneRules = {
   phone:[ {
    required: true,
    message: '电话号码不能为空~',
    trigger: ['blur','change']
  },
  {
    pattern: /1[0-9]{10}$/,
    message: '请输入正确的手机号码',
    trigger: ['blur','change']
  }],
   phoneCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['blur','change']
    },
  ]
};


const accountRules = {
    username:[ {
     required: true,
     message: '电话号码不能为空~',
     trigger: ['blur','change']
   },
   {
     pattern: /1[0-9]{10}$/,
     message: '请输入正确的手机号码',
     trigger: ['blur','change']
   }],
    password: [
     {
       required: true,
       message: '请输入密码',
       trigger: ['blur','change']
     }
   ]
 };
export {
    accountRules,phoneRules
}