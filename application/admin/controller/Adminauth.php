<?php
/**
 * 后台登录相关操作
 * 作者：刘单风
 * 最后修改时间：2016-12-06
 * 版权：刘单风个人所有
 */
namespace app\admin\controller;
use app\admin\validate\Adminvalidate;
use think\Controller;
use think\facade\Session;

class Adminauth extends Controller
{
    /**
     * 后台账号登录页面
     */
    public function Login()
    {
        // 临时关闭当前模板的布局功能
        $this->view->engine->layout(false);
        Session::set('adminuser', null);
        return $this->fetch('login');
    }

    /**
     * 执行登录操作
     */
    public function doLogin()
    {
        //数据验证
        $validate = new Adminvalidate();
        if (!$validate->check($_POST)) {
            echo json_encode(1);
            exit;
        }
        //查询数据写入session
        $adminuser = db('douyun_admin')
            ->where('user_name', $_POST['username'])
            ->where('user_pwd', md5($_POST['password']))
            ->find();
        if ($adminuser) {
            Session::set('adminuser', $adminuser);
            echo json_encode(0);
            exit;
        } else {
            echo json_encode(2);
            exit;
        }
    }

    /**
     * 后台首页
     */
    public function index()
    {
        $this->view->engine->layout('layouts/admin');
        return $this->fetch('index');
    }

    /**
     * 退出登录
     */
    public function loginOut()
    {
        Session::set('adminuser', null);
        $this->success('退出成功！', '/adminauth');
    }
}
