<?php
/**
 * 加盟申请管理
 * 作者：刘单风
 * 最后修改时间：2019-01-11
 * 版权：医库PHP小组
 */

namespace app\model;
use think\Model;
use think\Db;

class Joins extends Model
{

    function dataList($where,$opertype=0)
    {
        if (empty($opertype)) {
            $data = Db::table('douyun_join')
                ->where($where)
                ->order('id desc')
                ->paginate(20);
        } else {
            //导出数据,不再分页
            $data = Db::table('douyun_join')
                ->where($where)
                ->order('id desc')
                ->select();
            for ($i = 0; $i < count($data); $i++) {
                $data[$i]['create_time'] = date("Y-m-d H:i:s", $data[$i]['create_time']);
            }
        }
        return $data;
    }

    function updateOne($data, $where)
    {
        Db::table('douyun_join')
            ->where($where)
            ->update($data);
    }

    function oneDetail($where)
    {
        $data = Db::table('douyun_join')
            ->where($where)
            ->find();
        return $data;
    }

}