#!/bin/sh
# set -x
#
#
# 获取当前 电脑的ip ,并替换工程中 AppDelegate.m中 ip，
# 方便开发，减少复杂过程
#
# 注意：在 `build Phases` 搜索中，删除当前文件，因为当前脚本 只为Xcode编译时才会用到，和工程项目 业务无关。

path=$SRCROOT

current_mac_ip='172.20.13.206'

# -- this mac ip Address ---- xxx.xx.xx.xx
function get_computer_id()
{
#  is_windows=true
#  hash dir 2>/dev/null || { is_windows=false; }
#  if [[ $is_windows == true ]]; then
#    # windows ip
#    echo 'get ip ....'
#    ip_info=`ipconfig | findStr "IPv4"`
#    current_mac_ip=${ip_info#*:}
#    echo 'ip_0=>'$current_mac_ip'==='
#    current_mac_ip=`echo "$current_mac_ip" | sed 's/ //g'`
#    echo 'ip_1=>'$current_mac_ip'==='
#  else
  # Mac ip
    current_mac_ip=`osascript -e "IPv4 address of (system info)"`
#  fi

  echo 'current computer ip =>'$current_mac_ip
}

function change_file_text()
{
  echo '----------------'
#  echo 'change_file_text'
  local_prefix='//ip -- js location'

  app_delegate_path=$path/$PRODUCT_NAME/AppDelegate.m
#  echo 'app_delegate_path='$app_delegate_path

  local_line_info=`grep -n "$local_prefix"  $app_delegate_path | head -1`
  echo 'local_line_info='$local_line_info

  if [[ ! $local_line_info ]]; then
    echo 'error -> AppDelegate.m '$local_prefix'do not exist in a file('$app_delegate_path')。'
    return
  fi

  code_line=${local_line_info%%:*}
  echo 'code_line=>'$code_line
  echo '*********'

  # 获取 文本
  old_data=${local_line_info#*:}
  echo 'old_data_0=>'$old_data

#-------------------------------------
  # 判断当前行代码是否被”注释“掉了

  # 1、获取 "=" 前面的文本
  _temp_text_prefix=${old_data%%=*}
  echo '0——temp_text_prefix='$_temp_text_prefix'<=end'
  # 2、文本中删除行首尾空格
  _temp_text_prefix=`echo $_temp_text_prefix | sed -e 's/^[ \t]*//g'`
  echo '1——temp_text_prefix='$_temp_text_prefix'<=end'
  # 3、截取前2个字符串
  _temp_text_prefix=${_temp_text_prefix:0:2}
  echo '2——temp_text_prefix='$_temp_text_prefix'<=end'

  if [[ $_temp_text_prefix == "//" ]]; then
    # 当前代码已经被注释掉了，没有必要把 `jsCodeLocation中的ip` 替换为 `电脑当前的ip`
    echo 'The current "jsCodeLocation" code has been commented out'
    return
  fi
#-------------------------------------

  # 获取后 文本为 =@"http://x.x.x.x:8081/xx
  old_data=${old_data#*:}
  echo 'old_data_1=>'$old_data

  # 获取后 文本为 =x.x.x.x:8081/xx
  old_data=${old_data#*//}
  echo 'old_data_2=>'$old_data

  # 获取后 文本为 =x.x.x.x
  js_text_ip=${old_data%%:*}
  echo 'get_js_text_ip=>'$js_text_ip

  if [[ !$js_text_ip && $js_text_ip == $old_data ]]; then
    echo 'error -> AppDelegate.m => no ip with “text”'
    return
  fi

  get_computer_id

  if [[ $js_text_ip == $current_mac_ip ]]; then
    echo 'perfect， No need to replace IP'
    return
  fi

  temp_app_delegate_path=$path/$PRODUCT_NAME/temp_AppDelete.txt
  sed "s/$js_text_ip/$current_mac_ip/g" $app_delegate_path > $temp_app_delegate_path
  mv $temp_app_delegate_path $app_delegate_path

  if [ -f $temp_app_delegate_path ];then
    rm -rf $temp_app_delegate_path
    echo 'error -> JSCodeLocation.sh -> no change ip in AppDelegate.m'
    echo ''
    echo 'please usage: ( ip:x.x.x.x   ->  //ip -- js location)'
    echo 'jsCodeLocation = [NSURL URLWithString:@"http://172.0.0.1:8081/index.ios.bundle?platform=ios"];//ip -- js location'
    exit 1
  fi
}

function start()
{
  if [[ $CONFIGURATION == Debug* ]]; then
      change_file_text
  fi
}

# do run script
start
