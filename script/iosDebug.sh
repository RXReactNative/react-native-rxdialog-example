#!/bin/bash

# +---------------------------------------+
#                 DEBUG                   +
#                                         +
# info: react-native `bundle` for iOS     +
#                                         +
#                                         +
#  MacOS - 运行脚本命令:(终端)               +
#            npm run ios                  +
#                                         +
#  Windows - 运行脚本命令:(powershell)      +
#            npm run win_ios              +
#                                         +
# +---------------------------------------+


project_path=$(cd `dirname $0`; pwd)

package=$project_path/package.sh

# sh    path     platform configurations
/bin/sh $package ios    debug
