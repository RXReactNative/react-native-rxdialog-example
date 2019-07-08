#!/bin/bash

:<<!
      package (特别: windows[vscode]上使用的 powershell)

      react-native bundle --help

        执行：  脚本路径 参数1  参数2

        参数1： 移动平台(ios/android)
        参数2： 环境(debug/release)
!


root_path=$(cd `dirname $0`; pwd)

# 存放结果的，方便日后排错，不会上传到 git (已经过滤掉了)
result_path=$root_path/sh_result.txt

echo 'package->root_path=>'$root_path

# 清空 结果文件内容 (建议：不要打开)
# echo " " > $result_path

is_windows=true
hash dir 2>/dev/null || { is_windows=false; }
if [ $is_windows == true ];then
  echo '** [ windows ] operating system **' >> $result_path
fi


function create_directory()
{
  if [ $1 ];then

    file_dir=$1
  
    file_path=${file_dir%/*}
    echo ' dir path nil && create dir =>' $file_path >> $result_path
    mkdir -p $file_path
    cd $file_path
  

    file_name=${file_dir##*/}
    if [ ! -f $file_name ];then
      echo ' file nil && create file =>' $file_name  >> $result_path
      touch $file_name
    fi

    cd $root_path
  else
    echo ' create_directory() error, please right call!' >> $result_path
    exit;
  fi
}

# 存放结果的文件，是否存在，不存在就创建
if [ ! -f $result_path ];then
  create_directory $result_path
fi

# 执行脚本的时间
time3=$(date "+%Y-%m-%d %H:%M:%S")

# 平台
platform='ios'

# debug / release 的包
configurations=false

echo "" >> $result_path
echo 'do script <react-native bundle>  >>>>>' >> $result_path >> $result_path
echo 'now time:>'$time3 >> $result_path
echo "" >> $result_path

# 接受的 第一个参数
if [ $1 ];then
  echo ' parameter_1：' $1 >> $result_path
  if [ "$1" == "ios" ] || [ "$1" == "android" ];then
    platform=$1
  fi
fi

# 接受的 第二个参数
if [ $2 ];then
   echo ' parameter_2：' $2 >> $result_path
   if [ $2 == 'debug' ];then
    configurations=true
  fi
fi


# ios的 `js工程` 存放在 `iOS项目中` 的哪个目录
ios_page=./ios/bundle
# ios的 `图片资源` 存放在 `iOS项目中` 的哪个目录
ios_assets_path=$ios_page

# android的 `js工程` 存放在 `android项目中`的哪个目录
android_path=./android/app/src/main/assets/index.android.bundle 
# android的 `图片资源` 存放在 `android项目中`的哪个目录
android_assets_path=$(dirname $(dirname "$android_path"))/res/

# RN 打包脚本 默认参数
from_js_name='index.ios.js'
output_dir=$ios_page/main.jsbundle

output_assets_dir=$ios_assets_path
# 1、无用的 xx.meta
delete_js_meta_path=$ios_page/main.jsbundle.meta
# 2、无用的 xx/react-navigation-stack
delete_assets_navigation=$ios_page/assets/node_modules

if [ "$platform" == "android" ];then
  #如果是 Android 打包，对应 RN 的参数
  output_dir=$android_path
  from_js_name='index.android.js'
  output_assets_dir=$android_assets_path
  delete_js_meta_path=$android_path.meta
fi

if [ ! -f $output_dir ];then
  echo ' create dir&file => '$output_dir >> $result_path
  create_directory  $output_dir
fi

cd $root_path
cd ../

react-native bundle --platform $platform --dev $configurations --entry-file $from_js_name --bundle-output  $output_dir --assets-dest $output_assets_dir

echo "" >> $result_path
echo ' doing ...' >> $result_path
echo " " >> $result_path
echo ' react-native bundle' >> $result_path
echo ' --platform' $platform >> $result_path
echo ' --dev' $configurations >> $result_path
echo ' --entry-file' $from_js_name >> $result_path
echo ' --bundle-output' $output_dir >> $result_path
echo ' --assets-dest' $output_assets_dir >> $result_path
echo "" >> $result_path

echo ' scanning whether to delete unnecessary files.' >> $result_path
if [ -f $delete_js_meta_path ];then
  echo ' have meta file & delete => '$delete_js_meta_path >> $result_path
  /bin/rm -rf  $delete_js_meta_path
fi

function delete_unnecessary_files_for_android_assets()
{
  if [ $1 ];then
    file=$1
    if [ -f $file ]; then
      echo " delete node_modules->react-navigation-stack => "$file >> $result_path
      /bin/rm -rf  $file
    fi
  fi
}


if [[ "$platform" == "ios"  && -d $delete_assets_navigation ]]; then
  echo " delete node_modules->react-navigation-stack => "$delete_assets_navigation >> $result_path
  /bin/rm -rf $delete_assets_navigation
elif [ "$platform" == "android" ]; then
  # android 

  # hdpi
  res_hdpi_assets_backicon=$android_assets_path/drawable-hdpi/node_modules_reactnavigation_src_views_assets_backicon.png
  delete_unnecessary_files_for_android_assets $res_hdpi_assets_backicon

  # mdpi
  res_mdpi_assets_backicon=$android_assets_path/drawable-mdpi/node_modules_reactnavigation_src_views_assets_backicon.png
  res_mdpi_assets_backiconmask=$android_assets_path/drawable-mdpi/node_modules_reactnavigation_src_views_assets_backiconmask.png

  delete_unnecessary_files_for_android_assets $res_mdpi_assets_backicon
  delete_unnecessary_files_for_android_assets $res_mdpi_assets_backiconmask

  # xhdpi
  res_xhdpi_assets_backicon=$android_assets_path/drawable-xhdpi/node_modules_reactnavigation_src_views_assets_backicon.png
  delete_unnecessary_files_for_android_assets $res_xhdpi_assets_backicon

  # xxhdpi
  res_xxhdpi_assets_backicon=$android_assets_path/drawable-xxhdpi/node_modules_reactnavigation_src_views_assets_backicon.png
  delete_unnecessary_files_for_android_assets $res_xxhdpi_assets_backicon

  # xxxhdpi
  res_xxxhdpi_assets_backicon=$android_assets_path/drawable-xxxhdpi/node_modules_reactnavigation_src_views_assets_backicon.png
  delete_unnecessary_files_for_android_assets $res_xxxhdpi_assets_backicon
fi

echo "" >> $result_path
echo '<<<< end bundle >>>>>>' >> $result_path

echo "-------------------------------" >> $result_path
echo "" >> $result_path
echo "" >> $result_path




:<<!

# ios (为了方便看，下面有换行操作)
react-native bundle --platform ios --dev yes --entry-file index.ios.js 
--bundle-output ./ios/bundle/main.jsbundle --assets-dest ./ios/bundle

# android (为了方便看，下面有换行操作)
react-native bundle --platform android --dev false
--entry-file index.js --bundle-output 
android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res/


--------------------------------------------------------------------
!

