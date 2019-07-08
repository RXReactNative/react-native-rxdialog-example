
:: +===================================+ 
:: +                                   +
:: +      windows - 启动Android模拟器    +
:: +                                   +
:: + ----------------------------------+
:: +                                   +
:: +  运行脚本命令:                      +
:: +             npm run start_an      +
:: +===================================+


@echo off
echo **************************************************************************
echo start "android emulator" command is deprecated.
echo.

:: + 说明  `Android SDK -> 模拟器的 路径`  -netdelay none -netspeed full -avd `模拟器的名字`
E:\software\Android_SDK\emulator\emulator.exe -netdelay none -netspeed full -avd Pixel_2_API_28

echo are u ok ?
echo
echo

echo
echo "pause viewing"
echo

:: pause
exit




:: 不能和上面一起用(需要2个终端输入才可以)
:: echo "start app in emulator"
:: adb shell am start -n com.privatenotes/com.privatenotes.MainActivity


:: echo "stop app in emulator"
:: adb shell am force-stop com.privatenotes/com.privatenotes.MainActivity
:: echo




:: https://blog.csdn.net/u010871962/article/details/78370069

:: 显示系统中全部Android平台
:: android list target

:: 显示系统中全部AVD（模拟器）：
:: android list avd