#!/bin/bash

# +---------------------------------------+
#               DEBUG                     +
#                                         +
# info: react-native `bundle` for Android +
#                                         +
#                                         +
#  MacOS - 运行脚本命令:(终端)               +
#            npm run android              +
#                                         +
#  Windows - 运行脚本命令:(powershell)      +
#            npm run win_android          +
#                                         +
# +---------------------------------------+


project_path=$(cd `dirname $0`; pwd)

package=$project_path/package.sh

# sh    path     platform configurations
/bin/sh $package android  debug