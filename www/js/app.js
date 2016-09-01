// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.routes', 'starter.controllers', 'starter.services', 'starter.directive', 'ngCordova'])

  .run(
    ['$ionicPlatform', '$rootScope', '$ionicActionSheet', '$cordovaAppVersion', '$ionicLoading', '$location', '$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2', '$timeout', '$ionicHistory', '$ionicPopup', '$cordovaToast', function ($ionicPlatform, $rootScope, $ionicActionSheet, $cordovaAppVersion, $ionicLoading, $location, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2, $timeout, $ionicHistory, $ionicPopup, $cordovaToast) {
      $ionicPlatform.ready(function ($rootScope) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        //检测更新
        document.addEventListener("menubutton", onHardwareMenuKeyDown, false);
      });
      
      
      //双击退出app
      /* $ionicPlatform.registerBackButtonAction(function (e) {

       //判断处于哪个页面时双击退出
       if ($location.path() == '/app/home') {
       if ($rootScope.backButtonPressedOnceToExit) {
       ionic.Platform.exitApp();
       } else {
       $rootScope.backButtonPressedOnceToExit = true;
       $cordovaToast.showShortBottom('再按一次退出系统');
       setTimeout(function () {
       $rootScope.backButtonPressedOnceToExit = false;
       }, 5000);
       }
       }
       //如果不是首页
       else if ($ionicHistory.backView()) {
       $ionicHistory.goBack();
       }
       else {
       $rootScope.backButtonPressedOnceToExit = true;
       $cordovaToast.showShortBottom('再按一次退出系统');
       setTimeout(function () {
       $rootScope.backButtonPressedOnceToExit = false;
       }, 2000);
       }
       e.preventDefault();
       return false;
       }, 101);*/
  
      
      //确认退出app
      $ionicPlatform.registerBackButtonAction(function (e) {
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出应用?</strong>',
            template: '你确定要退出应用吗?',
            okText: '退出',
            cancelText: '取消'
          });
        
          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            } else {
              // Don't close
              
            }
          });
        }
      
        //判断处于哪个页面时双击退出
        if ($location.path() == 'app/home') {
          showConfirm();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        } else {
          // This is the last page: Show confirmation popup
          showConfirm();
        }
        e.preventDefault();
        return false;
      }, 101);

  
      // 菜单键
      function onHardwareMenuKeyDown() {
        $ionicActionSheet.show({
          titleText: '检查更新',
          buttons: [
            {text: '关于'}
          ],
          destructiveText: '检查更新',
          cancelText: '取消',
          cancel: function () {
            // add cancel code..
          },
          destructiveButtonClicked: function () {
            //检查更新
            checkUpdate();
          },
          buttonClicked: function (index) {

          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);
      };

      // 检查更新
      function checkUpdate() {
        var serverAppVersion = "1.0.0"; //从服务端获取最新版本
        //获取版本
        $cordovaAppVersion.getAppVersion().then(function (version) {
          //如果本地与服务端的APP版本不符合
          if (version != serverAppVersion) {
            showUpdateConfirm();
          }
        });
      }

      // 显示是否更新对话框
      function showUpdateConfirm() {
        var confirmPopup = $ionicPopup.confirm({
          title: '版本升级',
          template: '1.xxxx;</br>2.xxxxxx;</br>3.xxxxxx;</br>4.xxxxxx', //从服务端获取更新的内容
          cancelText: '取消',
          okText: '升级'
        });
        confirmPopup.then(function (res) {
          if (res) {
            $ionicLoading.show({
              template: "已经下载：0%"
            });
            var url = "http://192.168.1.50/1.apk"; //可以从服务端获取更新APP的路径
            var targetPath = "file:///storage/sdcard0/Download/1.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
            var trustHosts = true;
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
              // 打开下载下来的APP
              $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
              ).then(function () {
                // 成功
              }, function (err) {
                // 错误
              });
              $ionicLoading.hide();
            }, function (err) {
              alert('下载失败');
            }, function (progress) {
              //进度，这里使用文字显示下载百分比
              $timeout(function () {
                var downloadProgress = (progress.loaded / progress.total) * 100;
                $ionicLoading.show({
                  template: "已经下载：" + Math.floor(downloadProgress) + "%"
                });
                if (downloadProgress > 99) {
                  $ionicLoading.hide();
                }
              })
            });
          } else {
            // 取消更新
          }
        });
      }
      
      
    }
    ]
  );
