#!/bin/bash

# +---------------------------------------+
#                Release                  +
#                                         +
# info: react-native `bundle` for iOS     +
#                                         +
#                                         +
#  MacOS - 运行脚本命令:(终端)               +
#            npm run ios_release          +
#                                         +
#  Windows - 运行脚本命令:(powershell)      +
#            npm run win_ios_release      +
#                                         +
# +---------------------------------------+

project_path=$(cd `dirname $0`; pwd)

package=$project_path/package.sh

# sh    path     platform configurations(or null)
/bin/sh $package ios      release
