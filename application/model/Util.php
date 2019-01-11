<?php
/**
 * 工具类
 * User: liudanfeng
 * Date: 2019/1/11
 * Time: 下午2:02
 */

namespace app\model;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Util
{
    /**
     * 导出excel表
     * $data：要导出excel表的数据，接受一个二维数组
     * $name：excel表的表名
     * $head：excel表的表头，接受一个一维数组
     * $key：$data中对应表头的键的数组，接受一个一维数组
     * 备注：此函数缺点是，表头（对应列数）不能超过26；
     *循环不够灵活，一个单元格中不方便存放两个数据库字段的值
     */
    public static function dataexport($name='测试表', $data=[], $head=[], $keys=[])
    {
        $count = count($head);  //计算表头数量
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($i = 65; $i < $count + 65; $i++) {     //数字转字母从65开始，循环设置表头：
            $sheet->setCellValue(strtoupper(chr($i)) . '1', $head[$i - 65]);
        }

        /*--------------开始从数据库提取信息插入Excel表中------------------*/

        foreach ($data as $key => $item) {             //循环设置单元格：
            //$key+2,因为第一行是表头，所以写到表格时   从第二行开始写

            for ($i = 65; $i < $count + 65; $i++) {     //数字转字母从65开始：
                $sheet->setCellValue(strtoupper(chr($i)) . ($key + 2), $item[$keys[$i - 65]]);
                $spreadsheet->getActiveSheet()->getColumnDimension(strtoupper(chr($i)))->setWidth(20); //固定列宽
            }
        }
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $name . '.xlsx"');
        header('Cache-Control: max-age=0');
        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');

        //删除清空：
        $spreadsheet->disconnectWorksheets();
        unset($spreadsheet);
        exit;
    }


    /**
     * 单个文件上传
     * @param $typelist 可以上传的文件类型
     * @param $file 文件内容
     * @param $filepath 文件上传路径
     * @param $viewpath 外部访问地址
     */
    public static function singlefileupload($typelist,$file,$filepath,$viewpath)
    {
        $test = file_get_contents($file["tmp_name"]);
        $trueimg = @imagecreatefromstring($test);
        $resultpath = "";
        if (empty($typelist)) {
            //定义可以上传的文件类型
            $typelist = array("image/gif", "image/jpg", "image/jpeg", "image/png");
        }
        if (is_uploaded_file($file['tmp_name']) && in_array($file['type'], $typelist) && $trueimg) {
            //获取文件扩展名
            $exten_name = pathinfo($file['name'], PATHINFO_EXTENSION);
            //重新命名图片名称
            $picname = self::custom_mt_uniqid() . "." . $exten_name;//重新命名文件名
            $fpath = $filepath;
            //路径是否存在，不存在则创建
            if (!is_dir($fpath)) mkdir($fpath, 0777);
            //调用move_uploaded_file（）函数，进行文件转移
            $path = $fpath . $picname;
            if (move_uploaded_file($file['tmp_name'], $path)) {
                $resultpath = $viewpath . $picname;
            }
        }
        return $resultpath;
    }

    /**
     * 唯一值生成规则.
     *
     * @farwish
     */
    public static function custom_mt_uniqid($prefix = 'Mo')
    {
        $value = mt_rand();

        $str = md5 ( uniqid($prefix, TRUE) . microtime() . $value . str_shuffle($value) );

        $new_str = '';

        for ($i = 0; $i < 10; $i++) {
            $rand[] = mt_rand(10, 31);
        }

        $rand = array_unique($rand);

        for ($i = 0; $i < 32; $i++) {

            if (in_array($i, $rand)) {
                $new_str .= strtoupper($str[$i]);
            } else {
                $new_str .= $str[$i];
            }
        }

        return date('mY') . $new_str;
    }
}