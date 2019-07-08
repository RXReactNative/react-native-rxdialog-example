#!/bin/bash

# +===================================+ 
# +                                   +
# +      Mac - 启动iOS模拟器            +
# +                                   +
# + --------------------------------- +
# +                                   +
# +  运行脚本命令:                      +
# +             npm run start_ios      +
# +===================================+

# https://blog.csdn.net/iamhuanggua/article/details/84401869


# +-----------------------------------+
# +      没有验证过 - 启动iOS模拟器      +
# +-----------------------------------+
# xcrun simctl shutdown all

# path=$(find ~/Library/Developer/Xcode/DerivedData/${project_name}-*/Build/Products/Debug-iphonesimulator -name "${app_name}.app" | head -n 1)
# echo "${path}"
 
# filename=${path_to_MultiSimConfig.txt}
# grep -v '^#' $filename | while read -r line
# do
#   echo $line
#   xcrun instruments -w "$line"
#   xcrun simctl install booted $path
#   xcrun simctl launch booted ${bundle_identifier}
# done




# +------------------------------------+
# +      我用的脚本 - 启动iOS模拟器       +
# +                                    +
# + 获取模拟器列表: xcrun instruments -s +
# +------------------------------------+

# xcrun instruments -w "模拟器的名字"
# xcrun instruments -w "iPhone x (12.2)"

xcrun instruments -w "iPhone Xʀ (12.2)"



#***************************************************************************
# 问：为什么 `react-native run-ios` 启动不了 => “Could not find iPhone 6 simulator”
# 答：在 ./node_modules/react-native/local-cli/runIOS/runIOS.js 默认启动就是 `iPhone 6`的设备
#     而你的Xcode随着时间不断的更新，已经没有这个模拟器的，就启动不了了
# 
#
#
#  react-native 指定模拟器启动
#  react-native run-ios "iPhone x (12.2)"
#
#***************************************************************************


# +-----------------------------------+
# +   一、   iOS模拟器 - 安装app        +
# +                                   +
# +-----------------------------------+
#xcrun simctl install booted  `/xx/xx.app`


# +-----------------------------------+
# +    二、 iOS模拟器 - 启动app         +
# +                                   +
# +-----------------------------------+
#xcrun simctl launch booted `Bundle identifier`
xcrun simctl launch booted "srxboys.privateNotes"




# +-----------------------------------+
# +     三、  iOS模拟器 - 卸载app       +
# +                                   +
# +-----------------------------------+
#xcrun simctl uninstall booted `Bundle identifier`
# xcrun simctl uninstall booted "srxboys.privateNotes"