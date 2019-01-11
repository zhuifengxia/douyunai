<?php
namespace app\admin\behavior;
use think\Session;

/**
 *是否登录验证
 */
class LoginAuth
{
    public function run()
    {
        $session = Session::get('adminuser');
        if (!$session) {
            return $this->error('请登录！', '/adminauth');
        }
    }
}