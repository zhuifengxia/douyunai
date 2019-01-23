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
 * 后台登陆
 */
Route::group('adminauth',[
    '/'=>['admin/Adminauth/Login',['method' => 'get']],
    'dologin'=>['admin/Adminauth/doLogin',['method' => 'post']],
    'index'=>['admin/Adminauth/index',['method' => 'get']],
    'loginOut'=>['admin/Adminauth/loginOut'],
]);

/**
 * 后台管理
 */
Route::group('admin',[
    //体验用户管理
    'exper/list'=>['admin/Admin/Experlist',['method' => 'get|post']],
    //体验用户数据导出
    'exper/export'=>['admin/Admin/Experexport',['method' => 'get|post']],

    //加盟申请管理
    'join/list'=>['admin/Admin/Joinlist',['method' => 'get|post']],
    //加盟申请数据导出
    'join/export'=>['admin/Admin/Joinexport',['method' => 'get|post']],

    //新闻资讯列表
    'news/list'=>['admin/Admin/Newslist',['method' => 'get|post']],
    //添加新闻
    'news/add/[:id]'=>['admin/Admin/addNews',['method' => 'get']],
    //新闻保存
    'news/doAddNews'=>['admin/Admin/doAddNews',['method' => 'post']],
    //删除新闻
    'news/delete/:id'=>['admin/Admin/delNews',['method' => 'get']],

    //合作案例管理
    'cooper/list'=>['admin/Admin/Cooperlist',['method' => 'get']],
    //添加合作案例
    'cooper/add/[:id]'=>['admin/Admin/addCooper',['method' => 'get']],
    //合作案例保存
    'cooper/doAddCooper'=>['admin/Admin/doAddCooper',['method' => 'post']],

    //上传图片
    'uploadfiles'=>['admin/Admin/uploadFiles',['method' => 'post|get']],
]);




/**
 * 首页
 */
Route::group('/',[
    '/'=>['index/Index/index',['method' => 'get']],
    'news/[:datatype]'=>['index/Index/news',['method' => 'get']],
    'product'=>['index/Index/product',['method' => 'get']],
    'partner'=>['index/Index/partner',['method' => 'get']],
    'contact'=>['index/Index/contact',['method' => 'get']],
    'coopercase'=>['index/Index/coopercase',['method' => 'get']],
    'newdetail/:id'=>['index/Index/newsdetails',['method' => 'get']],
    'joinapply'=>['index/Index/joinapply',['method' => 'post']],
    'usertest'=>['index/Index/usertest',['method' => 'post']],
]);

return [

];
