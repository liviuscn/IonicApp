angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, LocalStorage) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        /*    $scope.$on('$ionicView.enter', function (e) {
         $state.go('intro');
         });*/

        $scope.$on('$ionicView.enter', function (e) {
            if (LocalStorage.get("firstRun") != "no") {
                LocalStorage.clear();
                LocalStorage.set('firstRun', 'no');
                $state.go('intro');
            }
        });

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        //登录
        $scope.doLogin = function () {
            console.log('登录中', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };


        $scope.logout = function () {
            var sss1 = "您真的要退出吗？";
            var confirmPopup = $ionicPopup.confirm(
                {
                    title: '友情提示',
                    template: sss1
                }
            );
            confirmPopup.then(function (res) {
                if (res) {
                    console.log(sss1);
                } else {
                    console.log('您取消了！啥都没有做');
                }
            });
        };
    })
    //轮播 下拉刷新 上拉加载更多
    .controller('PlaylistsCtrl', ['$scope', '$http', '$ionicScrollDelegate', function ($scope, $http, $ionicScrollDelegate) {
        $scope.moreDataCanBeLoaded = function () {
            return true;
        };
        $scope.scrollMainToTop = function () {
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        };
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Reggae', id: 6},
            {title: 'Chill', id: 7},
            {title: 'Dubstep', id: 8},
            {title: 'Indie', id: 9},
            {title: 'Rap', id: 10}
        ];
        //下拉刷新函数
        $scope.doRefresh = function () {
            $http.get('').success(function () {
                $scope.playlists = [
                    {title: 'aaaaa', id: 7},
                    {title: 'bbbbb', id: 8},
                    {title: 'ccccc', id: 9},
                    {title: 'ddddd', id: 10},
                    {title: 'eeeee', id: 11},
                    {title: 'fffff', id: 12}
                ];
            })
                .finally(function () {
                    // 停止广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        //上拉加载更多函数
        $scope.loadMore = function () {
            $http.get('').success(function (data) {
                var length = ($scope.playlists).length;
                ($scope.playlists)[length] = {title: 'Reggae', id: 1};
                if (length == 200) {
                    $scope.moreDataCanBeLoaded = function () {
                        return false;
                    };
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
            $scope.$on('stateChangeSuccess', function () {
                $scope.loadMore();
            });
        }
    }])
    //隐藏tabs
    .controller('PlaylistCtrl', ['$scope', '$stateParams', '$timeout', '$ionicLoading', function ($scope, $stateParams, $timeout, $ionicLoading) {
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
        $timeout(function () {
            $ionicLoading.hide();
            $scope.stooges = [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}];
        }, 2000);


        var playlistId = $stateParams.playlistId;
        var playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6},
            {title: 'aaaaa', id: 7},
            {title: 'bbbbb', id: 8},
            {title: 'ccccc', id: 9},
            {title: 'ddddd', id: 10},
            {title: 'eeeee', id: 11},
            {title: 'fffff', id: 12}
        ];

        angular.forEach(playlists, function (data, k, array) {
            //data等价于array[index]
            //console.log(data.title + '=' + array[k].id + 'k='+ k);
            if (data.id == playlistId) {
                $scope.title = array[k].title;
            }
        });

    }])
    //列表操作 自定义nav
    .controller('SearchCtrl', function ($scope, $state) {

        $scope.data = {
            showDelete: false
        };

        $scope.edit = function (item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function (item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function (item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function (item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        $scope.items = [
            {id: 0},
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6},
            {id: 7},
            {id: 8},
            {id: 9},
            {id: 10},
            {id: 11},
            {id: 12},
            {id: 13},
            {id: 14},
            {id: 15},
            {id: 16},
            {id: 17},
            {id: 18},
            {id: 19},
            {id: 20},
            {id: 21},
            {id: 22},
            {id: 23},
            {id: 24},
            {id: 25},
            {id: 26},
            {id: 27},
            {id: 28},
            {id: 29},
            {id: 30},
            {id: 31},
            {id: 32},
            {id: 33},
            {id: 34},
            {id: 35},
            {id: 36},
            {id: 37},
            {id: 38},
            {id: 39},
            {id: 40},
            {id: 41},
            {id: 42},
            {id: 43},
            {id: 44},
            {id: 45},
            {id: 46},
            {id: 47},
            {id: 48},
            {id: 49},
            {id: 50}
        ];

    })
    //复选框操作
    .controller('actionsheetCtl', ['$scope', function ($scope) {
        $scope.devList = [
            {text: "HTML5", checked: true},
            {text: "CSS3", checked: false},
            {text: "JavaScript", checked: false}
        ];
        $scope.pushNotificationChange = function () {
            console.log('Push Notification Change', $scope.pushNotification.checked);
        };
        $scope.pushNotification = {checked: true};
        $scope.emailNotification = 'Subscribed';

    }])

    //单选框操作
    .controller('RadioCtrl', ['$scope', function ($scope) {
        $scope.clientSideList = [
            {text: "Backbone", value: "bb"},
            {text: "Angular", value: "ng"},
            {text: "Ember", value: "em"},
            {text: "Knockout", value: "ko"}
        ];
        $scope.serverSideList = [
            {text: "Go", value: "go"},
            {text: "Python", value: "py"},
            {text: "Ruby", value: "rb"},
            {text: "Java", value: "jv"}
        ];

        $scope.data = {
            clientSide: 'ng'
        };
        $scope.serverSideChange = function (item) {
            console.log("Selected Serverside, text:", item.text, "value:", item.value);
        };
    }])
    //模型
    .controller('ModalCtrl', ['$scope', '$ionicModal', function ($scope, $ionicModal) {
        $scope.contacts = [
            {name: 'Gordon Freeman'},
            {name: 'Barney Calhoun'},
            {name: 'Lamarr the Headcrab'},
        ];

        $ionicModal.fromTemplateUrl('templates/modal2.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.createContact = function (u) {
            $scope.contacts.push({name: u.firstName + ' ' + u.lastName});
            $scope.modal.hide();
        }

    }])
    //上拉菜单
    .controller('SheetCtl', ['$scope', '$ionicActionSheet', '$timeout', function ($scope, $ionicActionSheet, $timeout) {
        $scope.show = function () {

            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "分享"},
                    {text: '移动'}
                ],
                destructiveText: '删除',
                titleText: '修改',
                cancelText: '取消',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });

            $timeout(function () {
                hideSheet();
            }, 2000);

        };
    }])
    //对话框
    .controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {

        // Triggered on a button click, or some other target
        $scope.showPopup = function () {
            $scope.data = {};

            // 自定义弹窗
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="data.wifi">',
                title: 'Enter Wi-Fi Password',
                subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                // 不允许用户关闭，除非输入 wifi 密码
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
            $timeout(function () {
                myPopup.close(); // 3秒后关闭弹窗
            }, 3000);
        };
        //  confirm 对话框
        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        //  alert（警告） 对话框
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eat that!',
                template: 'It might taste good'
            });
            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
    })

    .controller('PlatformCtrl', function ($scope, $stateParams, $ionicPopup,
                                          CheckNavigator, CheckNetwork, LocalStorage) {
        $scope.checkNavigator = function () {
            var sss1 = CheckNavigator.log();
            var alertPopup = $ionicPopup.alert(
                {
                    title: '设备配置',
                    template: sss1
                }
            );
            alertPopup.then(function (res) {

            });

        };

        $scope.checkNetwork = function () {
            var sss1 = CheckNetwork.log();
            var alertPopup = $ionicPopup.alert(
                {
                    title: '网络状况',
                    template: sss1
                }
            );
            alertPopup.then(function (res) {

            });

        };

        $scope.clearLocalStorage = function () {
            var confirmPopup = $ionicPopup.confirm(
                {
                    title: '友情提示',
                    template: "您真的要清空 本地存储 吗 ？"
                }
            );
            confirmPopup.then(function (res) {
                if (res) {
                    LocalStorage.clear();
                    var BROADCAST_NAME = 'localstorage.clear';
                    $scope.$emit(BROADCAST_NAME, null);
                } else {
                    console.log('您取消了！啥都没有做');
                }
            });
        };
        //测试存储数据
        $scope.localStorageSet = function () {
            LocalStorage.set('a', 'b')
        }
    })

    .controller("HttpCtrl", function ($scope, $http) {

        var getUrl = "";
        var getConfig = {params: {id: 5}};
        $http.get(getUrl, getConfig).success(function (response) {
            if (response.errcode == '0') {
                $scope.getdata = response.data;
            }

        }).error(function (data) {
            JSON.stringify(data)
        });

        var postData = {text: "这是post的内容"};
        var postConfig = {params: {id: 1, page: 2}};
        $http.post(url, postData, postConfig).success(function (response) {
            $scope.postdata = response;
        }).error(function (data) {
            JSON.stringify(data)
        });

        var postUrl = "http://api.php?id=2&callback=JSON_CALLBACK";
        $http.jsonp(postUrl).success(function (response) {
            $scope.jsonpdata = response.result;
        }).error(function (data) {
            JSON.stringify(data)
        });

        var httpConfig = {
            url: "",
            method: "post",
            cache: false,
            timeout: 20000,
            data: {
                uuid_user: local.uuid_user ? local.uuid_user : '',
                sessionid: local.sessionid ? local.sessionid : ''
            }
        };
        $http(httpConfig).success(function (response) {
            $scope.jsonpdata = response.result;
        }).error(function (data) {
            JSON.stringify(data)
        })


    })

    /*引导页*/
    .controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        // Called to navigate to the main app
        $scope.startApp = function (index) {
            $state.go('app.home');
        };
        $scope.next = function (index) {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function (index) {
            $ionicSlideBoxDelegate.previous();
        };
        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
    })

    /*闪光灯*/
    .controller('FlashlightCtrl', ['$scope', '$cordovaFlashlight', function ($scope, $cordovaFlashlight) {

        $scope.cheack = function () {
            $cordovaFlashlight.available().then(function (availability) {
                alert(availability)
            }, function () {
                // unavailable
                alert("unavailable");
            });
        };

        $scope.turnon = function () {
            $cordovaFlashlight.switchOn()
                .then(
                    function (success) { /* success */
                        alert("success")
                    },
                    function (error) { /* error */
                        alert("error")
                    });
        };

        $scope.turnoff = function () {
            $cordovaFlashlight.switchOff()
                .then(
                    function (success) { /* success */
                        alert("success")
                    },
                    function (error) { /* error */
                        alert("error")
                    });
        };

        $scope.change = function () {
            $cordovaFlashlight.toggle()
                .then(function (success) { /* success */
                        alert("success")
                    },
                    function (error) { /* error */
                        alert("error")
                    });
        };

    }])

    //播放音频
    .controller('AudioCtrl', ['$scope', '$cordovaNativeAudio', '$timeout', function ($scope, $cordovaNativeAudio, $timeout) {

        $cordovaNativeAudio
            .preloadSimple('click', 'audio/answer_error.mp3')
            .then(function (msg) {
                console.log(msg);
            }, function (error) {
                alert(error);
            });

        $cordovaNativeAudio
            .preloadComplex('music', 'audio/answer_right.mp3', 1, 1)
            .then(function (msg) {
                console.log(msg);
            }, function (error) {
                console.error(error);
            });

        $scope.play = function () {
            alert("开始播放");
            $cordovaNativeAudio.play('click');
            $cordovaNativeAudio.loop('music');
            // stop 'music' loop and unload
            $timeout(function () {
                $cordovaNativeAudio.stop('music');
                $cordovaNativeAudio.unload('click');
                $cordovaNativeAudio.unload('music');
            }, 1000 * 60);
        };

    }])

    //扫描二维码
    .controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner', function ($scope, $cordovaBarcodeScanner) {
        $scope.scanbarcode = function () {
            $cordovaBarcodeScanner
                .scan()
                .then(function (barcodeData) {
                    $scope.text = barcodeData.text;
                }, function (error) {
                    alert("error");
                });

            // NOTE: encoding not functioning yet
            $cordovaBarcodeScanner
                .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
                .then(function (success) {
                    alert("success");
                }, function (error) {
                    alert("error");
                });
        }
    }])

    //录音
    .controller('MediaCtrl', ['$scope', '$cordovaMedia', function ($scope, $cordovaMedia) {
        var days = new Date("");
        var name = days.getTime();

        var src = "audio/" + name + ".mp3";
        var media = $cordovaMedia.newMedia(src);

        var iOSPlayOptions = {
            numberOfLoops: 2,
            playAudioWhenScreenIsLocked: false
        };

        $scope.play = function () {
            media.play(iOSPlayOptions); // iOS only!
            media.play(); // Android
        };
        $scope.pause = function () {
            media.pause();
        };

        $scope.stop = function () {
            media.stop();
        };

        $scope.release = function () {
            media.release();
        };

        $scope.seekTo = function () {
            media.seekTo(5000); // milliseconds value
        };

        $scope.setVolume = function () {
            media.setVolume(0.5);
        };

        $scope.startRecord = function () {
            media.startRecord();
        };
        $scope.stopRecord = function () {
            media.stopRecord();
        };


        // media.getDuration(media); not working yet

        // media.getCurrentPosition().then(...); not working yet
    }])

    //h5 video
    .controller("VideoCtrl", function ($scope, myProvider, myService) {
        $scope.artist = myProvider.getArtist();
        $scope.thingFromConfig = myProvider.thingOnConfig;
        $scope.getArtist2 = myService.getArtist2();
        var myVideo = document.getElementById("video1");

        $scope.playPause = function () {
            if (myVideo.paused)
                myVideo.play();
            else
                myVideo.pause();
        };

        $scope.makeBig = function makeBig() {
            myVideo.width = 560;
        };

        $scope.makeSmall = function () {
            myVideo.width = 320;
        };
        $scope.makeNormal = function () {
            myVideo.width = 420;
        }

    })


    //上传图片 拍照+图库
    .controller('PictureCtrl', 
        ['$scope', '$ionicActionSheet', '$cordovaCamera', '$cordovaImagePicker', 
        function ($scope, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker) {

        $scope.imgSrc = "";
        var pickImage = function () {
            var options = {
                maximumImagesCount: 10,
                width: 800,
                height: 800,
                quality: 80
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                        $scope.imgSrc = results;
                    },
                    function (err) {
                    });
        };
        var appendByCamera = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options)
                .then(function (imageData) {
                    $scope.imgSrc = "data:image/jpeg;base64," + imageData;
                }, function (error) {
                });
        };
        $scope.choosePicMenu = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '拍照'},
                    {text: '从相册选择'}
                ],
                titleText: '选择照片',
                cancelText: '取消',
                cancel: function () {
                    return true;
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:
                            appendByCamera();
                            break;
                        case 1:
                            pickImage();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        };
    }])

    //本地消息
    .controller('LocalNotificationCtrl', 
        ['$scope', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification',
        function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {

            $ionicPlatform.ready(function () {

                // ========== Scheduling

                $scope.scheduleSingleNotification = function () {
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: '标题',
                        text: '内容',
                        data: {
                            customProperty: 'custom value'
                        }
                    }).then(function (result) {
                        // ...
                    });
                };

                $scope.scheduleMultipleNotifications = function () {
                    $cordovaLocalNotification.schedule([
                        {
                            id: 1,
                            title: '标题 1 ',
                            text: '内容 1 ',
                            data: {
                                customProperty: 'custom 1 value'
                            }
                        },
                        {
                            id: 2,
                            title: 'Title 2 here',
                            text: 'Text 2 here',
                            data: {
                                customProperty: 'custom 2 value'
                            }
                        },
                        {
                            id: 3,
                            title: 'Title 3 here',
                            text: 'Text 3 here',
                            data: {
                                customProperty: 'custom 3 value'
                            }
                        }
                    ]).then(function (result) {
                        // ...
                    });
                };

                $scope.scheduleDelayedNotification = function () {
                    var now = new Date().getTime();
                    var _10SecondsFromNow = new Date(now + 10 * 1000);

                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: '标题',
                        text: '内容',
                        at: _10SecondsFromNow
                    }).then(function (result) {
                        // ...
                    });
                };

                $scope.scheduleEveryMinuteNotification = function () {
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: '标题',
                        text: '内容',
                        every: 'minute'
                    }).then(function (result) {
                        // ...
                    });
                };

                // =========/ Scheduling

                // ========== Update

                $scope.updateSingleNotification = function () {
                    $cordovaLocalNotification.update({
                        id: 1,
                        title: '标题 - UPDATED',
                        text: '标题 - UPDATED'
                    }).then(function (result) {
                        // ...
                    });
                };

                $scope.updateMultipleNotifications = function () {
                    $cordovaLocalNotification.update([
                        {
                            id: 1,
                            title: '标题 1 - UPDATED',
                            text: '标题 1 - UPDATED'
                        },
                        {
                            id: 2,
                            title: 'Title 2 - UPDATED',
                            text: 'Text 2 - UPDATED'
                        },
                        {
                            id: 3,
                            title: 'Title 3 - UPDATED',
                            text: 'Text 3 - UPDATED'
                        }
                    ]).then(function (result) {
                        // ...
                    });
                };

                // =========/ Update

                // ========== Cancelation

                $scope.cancelSingleNotification = function () {
                    $cordovaLocalNotification.cancel(1).then(function (result) {
                        // ...
                    });
                };

                $scope.cancelMultipleNotifications = function () {
                    $cordovaLocalNotification.cancel([1, 2]).then(function (result) {
                        // ...
                    });
                };

                $scope.cancelAllNotifications = function () {
                    $cordovaLocalNotification.cancelAll().then(function (result) {
                        // ...
                    });
                };

                // =========/ Cancelation

                // ========== Events

                $rootScope.$on('$cordovaLocalNotification:schedule',
                    function (event, notification, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:trigger',
                    function (event, notification, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:update',
                    function (event, notification, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:clear',
                    function (event, notification, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:clearall',
                    function (event, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:cancel',
                    function (event, notification, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:cancelall',
                    function (event, state) {
                        // ...
                    });

                $rootScope.$on('$cordovaLocalNotification:click',
                    function (event, notification, state) {
                        // ...
                    });

                // =========/ Events

            });

        }]);
;











