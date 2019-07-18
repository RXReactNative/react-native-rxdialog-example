#!/bin/bash

# +---------------------------------------+
#                                         +
#     统计 打包次数，并删除较早打包记录         +
#                                         +
# +---------------------------------------+


root_path=$(cd `dirname $0`; pwd)
cd $root_path

package_result='sh_result.txt'

record_prefix="do script <react-native bundle>  >>>>>"

record_suffix="<<<< end bundle >>>>>>"

packTimes=`cat $package_result | grep "$record_prefix" | wc -l`
echo 'packTimes='$packTimes
if [[ $packTimes -gt 20 ]]; then
  delete_line_info=`grep -n "$record_suffix"  $package_result | head -1`
  delete_line=${delete_line_info%%:*}
  if [[ $delete_line ]]; then
    temp_txt='temp_resut.txt'
    # echo '删除多余 打包结果'
    delete_line=$[delete_line+4]
    # echo 'delete_line='$delete_line
    line="d"
    delete_line=$delete_line$line
    echo 'delete_line='$delete_line
    sed "1,$delete_line" $package_result > $temp_txt
    mv $temp_txt $package_result
  fi
fi