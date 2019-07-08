#!/bin/bash

# +---------------------------------------+
#                Release                  +
#                                         +
# info: react-native `bundle` for Android +
#                                         +
#                                         +
#  MacOS - 运行脚本命令:(终端)               +
#            npm run android_release      +
#                                         +
#  Windows - 运行脚本命令:(powershell)      +
#            npm run win_android_release  +
#                                         +
# +---------------------------------------+


project_path=$(cd `dirname $0`; pwd)

package=$project_path/package.sh

# sh    path     platform configurations(or null)
/bin/sh $package android  release