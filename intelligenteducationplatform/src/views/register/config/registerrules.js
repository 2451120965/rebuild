export const phoneRules = {
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
    code: [
     {
       required: true,
       message: '请输入验证码',
       trigger: ['blur','change']
     }
   ],
   password1:[
    {
        required: true,
        message: '请输入密码',
        trigger: ['blur','change']
    },{
        pattern: /^[a-z0-9]{8,18}$/,
        message: '密码必须是8-18位的字母或者数字~',
        trigger: ['blur','change']
    }
   ],
   password:[
    {
        required: true,
        message: '请再次输入密码',
        trigger: ['blur','change'],
    },{
        trigger: ['blur','change']
    }
   ]


 };
 
 
 
 