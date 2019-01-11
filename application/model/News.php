<?php
/**
 * 新闻资讯管理
 * 作者：刘单风
 * 最后修改时间：2019-01-11
 * 版权：医库PHP小组
 */

namespace app\model;
use think\Model;
use think\Db;

class News extends Model
{
    function News()
    {
        return [
            'id' => 0,
            'news_title' => "",
            'news_type' => 0,
            'news_msg' => "",
            'news_img' => "",
            'read_num' => 0,
            'create_time' => 0,
            'news_source' => ""
        ];
    }

    function dataList($where)
    {
        if (empty($opertype)) {
            $data = Db::table('douyun_news')
                ->where($where)
                ->order('id desc')
                ->paginate(20);
        }
        return $data;
    }

    function updateOne($data, $where)
    {
        Db::table('douyun_news')
            ->where($where)
            ->update($data);
    }

    function oneDetail($where)
    {
        $data = Db::table('douyun_news')
            ->where($where)
            ->find();
        return $data;
    }

    function addOne($data)
    {
        Db::table('douyun_news')
            ->insert($data);
    }
    function deleteOne($where)
    {
        Db::table('douyun_news')
            ->where($where)
            ->delete();
    }

}