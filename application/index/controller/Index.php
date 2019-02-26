<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{
    //首页
    public function index()
    {
        //获取6条新闻资讯
        //行业资讯
        $hangye=Db::table('douyun_news')
            ->where('news_type',0)
            ->order('id desc')
            ->limit(10)
            ->select();
        //公司动态
        $gongsi=Db::table('douyun_news')
            ->where('news_type',1)
            ->order('id desc')
            ->limit(10)
            ->select();
        //热门新闻
        $remen=Db::table('douyun_news')
            ->where('news_type',2)
            ->order('id desc')
            ->limit(10)
            ->select();

        $this->assign('hangye', $hangye);
        $this->assign('gongsi', $gongsi);
        $this->assign('remen', $remen);

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
    public function news($datatype=0)
    {
        $newslst = Db::table('douyun_news')
            ->where('news_type', $datatype)
            ->order('id desc')
            ->paginate(10, false, ['query' => request()->param()])->each(function ($item, $key) {
                $item['news_msg'] = strip_tags($item['news_msg']);
                return $item;
            });
        $this->assign('newslist', $newslst);
        $this->assign('datatype', $datatype);
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
    public function newsdetails($id=0)
    {
        $newsdetail=Db::table('douyun_news')
            ->where('id',$id)
            ->find();
        //增加浏览量
        Db::table('douyun_news')
            ->where('id',$id)
            ->inc('read_num')
            ->update();
        $this->assign('news_details', $newsdetail);
        $this->assign('pagenum', 3);
        return $this->fetch('news_details');
    }

    //合作案例
    public function coopercase()
    {
        //读取最新的6条合作案例信息
        $coopercase = Db::table('douyun_coopercase')
            ->order('id desc')
            ->limit(6)
            ->select();
        for($i=0;$i<count($coopercase);$i++) {
            $classname = "fadeInLeft";
            switch ($i) {
                case 0:
                    $classname = "fadeInLeft";
                    break;
                case 1:
                    $classname = "slideInDown";
                    break;
                case 2:
                    $classname = "fadeInRight";
                    break;
                case 3:
                    $classname = "slideInLeft";
                    break;
                case 4:
                    $classname = "fadeInUp";
                    break;
                case 5:
                    $classname = "slideInRight";
                    break;
            }
            $coopercase[$i]['class_name'] = $classname;
        }
        $this->assign('coopercase', $coopercase);
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

    //用户免费体验
    public function usertest()
    {
        $test_name = input('test_name');
        $test_tel = input('test_tel');
        $test_remark = input('test_remark');
        $data = array(
            'user_name' => $test_name,
            'user_phone' => $test_tel,
            'data_remark' => $test_remark,
            'create_time' => time()
        );
        Db::table('douyun_experience')
            ->insert($data);
        $returnarr = array(
            'code' => 0,
            'message' => 'ok'
        );
        return json($returnarr);
    }

}
