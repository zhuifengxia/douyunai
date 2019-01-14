<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{
    //首页
    public function index()
    {
        $this->assign('pagenum', 0);
        return $this->fetch('index');
    }

    //产品
    public function product()
    {
        $this->assign('pagenum', 1);
        return $this->fetch('product');
    }

    //加盟
    public function partner()
    {
        $this->assign('pagenum', 2);
        return $this->fetch('partner');
    }

    //新闻动态
    public function news()
    {
        $this->assign('pagenum', 3);
        return $this->fetch('news');
    }

    //关于
    public function contact()
    {
        $this->assign('pagenum', 4);
        return $this->fetch('contact');
    }

    //新闻详情
    public function newsdetails()
    {
        $this->assign('pagenum', 3);
        return $this->fetch('news_details');
    }

    //合作案例
    public function coopercase()
    {
        $this->assign('pagenum', 5);
        return $this->fetch('coopercase');
    }

    //加盟申请提交
    public function joinapply()
    {
        $name = input('name');
        $company = input('company');
        $telNumber = input('telNumber');
        $area = input('area');
        $data = array(
            'user_name' => $name,
            'user_phone' => $telNumber,
            'company_name' => $company,
            'addr_province' => $area,
            'create_time' => time()
        );
        Db::table('douyun_join')
            ->insert($data);
        $returnarr = array(
            'code' => 0,
            'message' => 'ok'
        );
        return json($returnarr);
    }

}
