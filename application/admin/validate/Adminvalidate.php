<?php
namespace app\admin\validate;

use think\Validate;
use think\Db;
class Adminvalidate extends Validate
{
    protected $rule =   [
        'username'  => ['require','checkName'=>'username'],
        'password'   => 'require',
//        'captcha|验证码'=>'require|captcha'
    ];

    protected $message  =   [
        'username.require' => '登录名不能为空',
        'password.require' => '密码不能为空',
    ];

    //自定义验证；后台登录
    protected function checkName()
    {
        $data=Db::table('douyun_admin')
            ->where('user_name',$_POST['username'])
            ->where('user_pwd',md5($_POST['password']))
            ->find();
        return $data ? true : '账号或密码错误';
    }
}