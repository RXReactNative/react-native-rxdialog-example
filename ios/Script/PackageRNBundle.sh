#!/bin/sh
# set -x
#
#
#  编译工程的同时，给RN打bundle包
#
# 注意：在 `build Phases` 搜索中，删除当前文件，因为当前脚本 只为Xcode编译时才会用到，和工程项目 业务无关。

path=$SRCROOT/Script

RNPackagePathROOT='../'
RNPackageDebugSH=script/iosDebug.sh
RNPackageReleaseSH=script/iosRelease.sh

OutputRNBundle=$SRCROOT/bundle
RNPackageLog='rn-package.log'

#------------------------------------------------------------------------
# 是否有 RN 项目
function find_rn_project() {
  local dir=$path

  local package_json=$dir/../../package.json
  local package_lock_json=$dir/../../package-lock.json
  local node_modules=$dir/../../node_modules

  if [-f $package_json && -f $package_lock_json && -f $node_modules] ; then
    echo 'RN目录：'$dir
    return 1
  fi
    echo '没有找到RN项目'
    return 0
}

#------------------------------------------------------------------------
function package_with_sh() {

  local package_sh=$1
  local preDir=`pwd`

  cd $RNPackagePathROOT

  local rootPath=$(pwd)
  cd $rootPath

  local log=$rootPath/script/$RNPackageLog
  /bin/sh $package_sh > $log
  local result=`cat $log | grep "Done copying assets"`

  if [[ $result != "" && -d $OutputRNBundle ]]; then
    echo 'jsbundle 打包成功'
  else
    echo "jsbundle打包失败！[$package_sh]" && cat $log && exit 1
  fi
  rm -rf $log
  cd $preDir
}

#------------------------------------------------------------------------
function package() {

  if [ ! find_rn_project ]; then
    echo 'RN 打包失败'
    exit 1;
  fi

  if [[ $CONFIGURATION == Debug* ]]; then
     package_with_sh $RNPackageDebugSH
  else
     package_with_sh $RNPackageReleaseSH
  fi
}

#------------------------------------------------------------------------
echo "开始 打包RN 的 bundle"
package
