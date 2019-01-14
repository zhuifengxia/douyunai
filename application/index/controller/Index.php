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
        $newslst=Db::table('douyun_news')
            ->order('id desc')
            ->limit(6)
            ->select();
        $news=array();
        $news2=array();
        for($i=0;$i<count($newslst);$i++){
            $newslst[$i]['news_msg']=strip_tags($newslst[$i]['news_msg']);
            if($i<3){
                $news[]=$newslst[$i];
            }else{
                $news2[]=$newslst[$i];
            }
        }
        $this->assign('newslist', $news);
        $this->assign('newslist2', $news2);

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
        $this->assign('news_details', $newsdetail);
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
