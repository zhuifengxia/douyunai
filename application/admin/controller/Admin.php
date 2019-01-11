<?php
/**
 * 后台数据管理相关操作
 * 作者：刘单风
 * 最后修改时间：2016-12-23
 * 版权：刘单风个人所有
 */
namespace app\admin\controller;
use app\model\Experience;
use app\model\Joins;
use app\model\Luckprizes;
use app\model\Lucksponsor;
use app\model\News;
use app\model\Util;
use think\Controller;
use think\Hook;
use think\facade\Env;
use think\facade\Config;

class Admin extends Controller
{
    public function _initialize()
    {
        parent::_initialize();
        Hook::listen('CheckAuth');

    }

    /**
     * 体验用户列表数据
     */
    public function Experlist()
    {
        $keywords=input('keywords');
        if($keywords){
            $where="user_phone LIKE '%$keywords%'";
        }else{
            $where="1=1";
        }
        $this->view->engine->layout('layouts/admin');
        $experModel=new Experience();
        $expers=$experModel->dataList($where);
        $this->assign('expers', $expers);
        $this->assign('keywords', $keywords);
        return $this->fetch('experience_list');
    }

    //体验用户数据导出
    public function Experexport()
    {
        $experModel=new Experience();
        //设置表头：
        $head = ['手机号', '最近一次体验时间', '体验次数'];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['user_phone', 'create_time', 'use_time'];
        $keywords=input('keywords');
        if($keywords){
            $where="user_phone LIKE '%$keywords%'";
        }else{
            $where="1=1";
        }
        $expers=$experModel->dataList($where,1);
        //导出数据
        Util::dataexport('体验用户数据-'.date('Y.m.d'), $expers, $head, $keys);
    }


    /**
     * 加盟申请列表
     */
    public function Joinlist()
    {
        $keywords=input('keywords');
        if($keywords){
            $where="user_name LIKE '%$keywords%' OR user_phone LIKE '%$keywords%' OR company_name LIKE '%$keywords%' OR addr_province LIKE '%$keywords%'";
        }else{
            $where="1=1";
        }
        $this->view->engine->layout('layouts/admin');
        $joinModel=new Joins();
        $joins=$joinModel->dataList($where);
        $this->assign('joins', $joins);
        $this->assign('keywords', $keywords);
        return $this->fetch('join_list');
    }

    //加盟申请数据导出
    public function Joinexport()
    {
        $joinModel=new Joins();
        //设置表头：
        $head = ['姓名', '联系电话', '公司名称','省份','提交时间'];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['user_name', 'user_phone', 'company_name','addr_province','create_time'];
        $keywords=input('keywords');
        if($keywords){
            $where="user_name LIKE '%$keywords%' OR user_phone LIKE '%$keywords%' OR company_name LIKE '%$keywords%' OR addr_province LIKE '%$keywords%'";
        }else{
            $where="1=1";
        }
        $expers=$joinModel->dataList($where,1);
        //导出数据
        Util::dataexport('加盟申请数据-'.date('Y.m.d'), $expers, $head, $keys);
    }


    /**
     * 新闻资讯列表
     */
    public function Newslist()
    {
        $keywords=input('keywords');
        $newstype=input('newstype',-1);
        if($keywords){
            $where="news_title LIKE '%$keywords%'";
        }else{
            $where="1=1";
        }
        if($newstype!=-1){
            $where.=" AND news_type=$newstype";
        }
        $this->view->engine->layout('layouts/admin');
        $newsModel=new News();
        $news=$newsModel->dataList($where);
        $this->assign('news', $news);
        $this->assign('newstype', $newstype);
        $this->assign('keywords', $keywords);
        return $this->fetch('news_list');
    }

    /**
     * 添加/编辑资讯
     * @param int $id 资讯id
     */
    public function addNews($id = 0)
    {
        $this->view->engine->layout('layouts/admin');
        $newsModel = new News();
        if ($id) {
            $newsdetails = $newsModel->oneDetail(["id" => $id]);
        }else{
            $newsdetails=$newsModel->News();
        }
        $this->assign("newsdetails", $newsdetails);
        return $this->fetch('addnews');
    }

    /**
     * 资讯保存
     */
    public function doAddNews()
    {
        $newsModel = new News();
        //查询是否存在
        $where = [
            'news_title' => $_POST['newstitle']
        ];
        if ($_POST['id']) {
            $where['id'] = "!=" . $_POST['id'];
        }
        $data = $newsModel->oneDetail($where);
        if ($data) {
            $this->error('该资讯已经存在，请重新输入', '/admin/news/add');
        } else {
            $insrtdata = [
                'news_title' => $_POST['newstitle'],
                'news_type' => $_POST['newstype'],
                'news_msg' => $_POST['newsmsg'],
                'news_img' => $_POST['newsimg'],
                'read_num' => 0,
                'create_time' => time(),
                'news_source' => $_POST['newssource']
            ];
            if ($_POST['id']) {
                $newsModel->updateOne($insrtdata, ['id' => $_POST['id']]);
            } else {
                $newsModel->addOne($insrtdata);
            }
            $this->success('保存成功', '/admin/news/list');
        }
    }


    /**
     * 删除资讯
     * @param $id
     */
    public function delNews($id)
    {
        $newsModel = new News();
        $newsModel->deleteOne(['id' => $id]);
        $this->success('删除成功', '/admin/news/list');
    }


    //上传文件
    public function uploadFiles()
    {
        $file = $_FILES['logofile'];
        //将文件上传到本地
        //如果路径不存在就创建
        $filepath = Env::get('ROOT_PATH') . 'public/static/admin/uploadfiles/'.date("Ymd")."/";
        if (!file_exists(dirname($filepath))) {
            mkdir(dirname($filepath), 0777);
        }
        $picname = Util::singlefileupload('', $file, $filepath, '');
        echo "<p style='color:red'>上传成功！</p>";
        echo "<script>window.parent.document.getElementById('newsimg').value='/static/admin/uploadfiles/".date("Ymd")."/" . $picname . "';</script>";


        exit();
    }

    //阿里云删除图片
    public function delPic($imgname)
    {
        $alioss = Config::get('app.alioss');
        $accessKeyId = $alioss['accesskey'];
        $accessKeySecret = $alioss['accesskeysecret'];
        $endpoint = $alioss['endpoint'];
        // 存储空间名称
        $bucket = $alioss['bucket'];
        // 文件名称
        $object = "luckprizeimgs" . $imgname;
        try {
            $ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint);
            $ossClient->deleteObject($bucket, $object);
        } catch (OssException $e) {
            //文件删除失败
        }
    }


}
