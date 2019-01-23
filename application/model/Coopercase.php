<?php
/**
 * 合作案例管理
 * 作者：刘单风
 * 最后修改时间：2019-01-11
 * 版权：医库PHP小组
 */

namespace app\model;
use think\Model;
use think\Db;

class Coopercase extends Model
{
    function Coopercase()
    {
        return [
            'id' => 0,
            'cooper_name' => "",
            'cooper_msg' => "",
            'cooper_img' => ""
        ];
    }

    function dataList()
    {
        $data = Db::table('douyun_coopercase')
            ->order('id desc')
            ->paginate(6);
        return $data;
    }

    function updateOne($data, $where)
    {
        Db::table('douyun_coopercase')
            ->where($where)
            ->update($data);
    }

    function oneDetail($where)
    {
        $data = Db::table('douyun_coopercase')
            ->where($where)
            ->find();
        return $data;
    }

    function addOne($data)
    {
        Db::table('douyun_coopercase')
            ->insertGetId($data);
    }

}