<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------



/**
 * 首页
 */
Route::group('/',[
    '/'=>['index/Index/index',['method' => 'get']],
    'news'=>['index/Index/news',['method' => 'get']],
    'product'=>['index/Index/product',['method' => 'get']],
    'partner'=>['index/Index/partner',['method' => 'get']],
    'contact'=>['index/Index/contact',['method' => 'get']],
    'dologin'=>['admin/Adminauth/doLogin',['method' => 'post']],
    'index'=>['admin/Adminauth/index',['method' => 'get']],
    'loginOut'=>['admin/Adminauth/loginOut'],
]);

return [

];
