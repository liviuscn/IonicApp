//这里就是本app的所有的 router
angular.module('starter.routes', ['ionic', 'starter.controllers', 'starter.services'])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, myProviderProvider) {

        //向自定义服务传参数
        myProviderProvider.thingFromConfig = "This was set on config()";
        myProviderProvider._artist = "configartist";

        $ionicConfigProvider.scrolling.jsScrolling(true);


        // 默认样式
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            //首页
            .state('app.home', {
                url: '/home',
                views: {
                    'tab-one': {
                        templateUrl: 'templates/home.html',
                        //  controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'tab-two': {
                        templateUrl: 'templates/search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'tab-three': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'tab-three': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.browse', {
                url: '/home/browse',
                views: {
                    'tab-one': {
                        templateUrl: 'templates/browse.html',
                        controller: 'actionsheetCtl'
                    }
                }
            })
            .state('app.radio', {
                url: '/home/radio',
                views: {
                    'tab-one': {
                        templateUrl: "templates/radio.html",
                        controller: 'RadioCtrl'
                    }
                }
            })
            .state('app.modal', {
                url: "/home/modal",
                views: {
                    'tab-one': {
                        templateUrl: "templates/modal.html",
                        controller: "ModalCtrl"
                    }
                }
            })
            .state('app.sheet', {
                url: '/home/sheet',
                views: {
                    'tab-one': {
                        templateUrl: "templates/sheet.html",
                        controller: "SheetCtl"
                    }
                }
            })
            .state("app.popup", {
                url: '/home/pupop',
                views: {
                    'tab-one': {
                        templateUrl: "templates/popup.html",
                        controller: "PopupCtrl"
                    }
                }
            })
            .state("app.platform", {
                url: '/home/platform',
                views: {
                    'tab-one': {
                        templateUrl: "templates/platform.html",
                        controller: "PlatformCtrl"
                    }
                }
            })
            //上传图片
            .state("app.picture", {
                url: '/home/picture',
                views: {
                    'tab-one': {
                        templateUrl: "templates/picture.html",
                        controller: "PictureCtrl"
                    }
                }
            })
            //闪光灯
            .state("app.flashlight", {
                url: '/home/flashlight',
                views: {
                    'tab-one': {
                        templateUrl: "templates/flashlight.html",
                        controller: "FlashlightCtrl"
                    }
                }
            })
            //引导页
            .state("intro", {
                url: '/intro',
                templateUrl: "templates/intro.html",
                controller: "IntroCtrl"
            })
            //照相
            .state("app.camera", {
                url: '/home/camera',
                views: {
                    'tab-one': {
                        templateUrl: "templates/camera.html",
                        controller: "CameraCtrl"
                    }
                }

            })
            //播放
            .state("app.audio", {
                url: '/home/audio',
                views: {
                    'tab-one': {
                        templateUrl: "templates/audio.html",
                        controller: "AudioCtrl"
                    }
                }

            })
            .state("app.barcode", {
                url: '/home/barcode',
                views: {
                    'tab-one': {
                        templateUrl: "templates/barcode.html",
                        controller: "BarcodeCtrl"
                    }
                }

            })
            .state("app.video", {
                url: '/home/video',
                views: {
                    'tab-one': {
                        templateUrl: "templates/video.html",
                        controller: "VideoCtrl"
                    }
                }

            })
            .state("app.media", {
                url: '/home/media',
                views: {
                    'tab-one': {
                        templateUrl: "templates/media.html",
                        controller: "MediaCtrl"
                    }
                }

            })
            .state("app.localnotification", {
                url: '/home/localnotification',
                views: {
                    'tab-one': {
                        templateUrl: "templates/localnotification.html",
                        controller: "LocalNotificationCtrl"
                    }
                }
            
            })

        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    })
;



