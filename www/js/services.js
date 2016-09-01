angular.module('starter.services', [])

//Providers 是唯一一种你可以传进 .config() 函数的 service。在config中使用要加Provider比如： .config(myProviderProvider)
//当你想要在 service 对象启用之前，先进行模块范围的配置，那就应该用 provider。
    .provider("myProvider", function () {
        this._artist = "";
        this.thingFromConfig = "";
        this.$get = function () {
            var that = this;
            return {
                getArtist: function () {
                    return that._artist;
                },
                thingOnConfig: that.thingFromConfig
            }
        }
    })
    //Factory  方法直接把一个函数当成一个对象的$get 方法可以直接返回字符串
    //用 Factory 就是创建一个对象，为它添加属性，然后把这个对象返回出来。你把 service 传进 controller 之后，在 controller 里这个对象里的属性就可以通过 factory 使用了。
    //Service 是用"new"关键字实例化的。因此，你应该给"this"添加属性，然后 service 返回"this"。你把 service 传进 controller 之后，在controller里 "this" 上的属性就可以通过 service 来使用了
    
    .service("myService", function () {
        var _artist = "Helly";
        this.getArtist2 = function () {
            return _artist;
        }
    })
    
    //本地储存
    .factory('LocalStorage', function () {
        return {
            set: function (key, value) {
                if (key == null || value == null)
                    return false;
                window.localStorage.setItem(key, value);
            },
            get: function (key) {
                if (key == null)
                    return false;
                var keyValue = '';
                if (window.localStorage) {
                    keyValue = window.localStorage.getItem(key);
                }
                return keyValue;
            },
            clear: function () {
                localStorage.clear();
                return true;
            },
            remove: function (data) {
                localStorage.removeItem(data);
            }
        };
    })
    
    //api
    .factory('api', function () {
        return {
            API_URL: 'http://api.randomuser.me/'
        }
    })
    //检查设备
    .factory('CheckNavigator', function () {
        return {
            versions: function () {
                var u = navigator.userAgent;
                var app = navigator.appVersion;
                console.log("app=" + app);
                //alert("appVersion 版本信息= \n" + app);
                //alert("userAgent 注册信息= \n" + u);
                var ret = {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    wx: u.indexOf('MicroMessenge') != -1//add by wzh 20140716 是否WX
                };
                console.log("ret=" + ret.trident);
                return ret;
            },
            log: function () {
                var browser = this.versions();
                var sss = "";
                sss = sss + "注册信息:" + navigator.appVersion;
                sss = sss + "<br>";
                sss = sss + " 是否为移动终端: " + browser.mobile;
                sss = sss + "<br>";
                sss = sss + " ios终端: " + browser.ios;
                sss = sss + "<br>";
                sss = sss + " android终端: " + browser.android;
                sss = sss + "<br>";
                sss = sss + " 是否为iPhone: " + browser.iPhone;
                sss = sss + "<br>";
                sss = sss + " 是否iPad: " + browser.iPad;
                sss = sss + "<br>";
                sss = sss + "---------------------";
                sss = sss + "<br>";
                sss = sss + " 是否微信: " + browser.wx;
                sss = sss + "<br>";
                sss = sss + " 是否内置webKit: " + browser.webKit;
                sss = sss + "<br>";
                sss = sss + " 是否火狐: " + browser.gecko;
                sss = sss + "<br>";
                sss = sss + " 是否Opera: " + browser.presto;
                sss = sss + "<br>";
                sss = sss + " 是否IE: " + browser.trident;
                sss = sss + "<br>";
                sss = sss + " 是否google/android: " + browser.android;
                sss = sss + "<br>";
                sss = sss + " 是否苹果safari " + browser.webKit;
                sss = sss + "<br>";
                sss = sss + "---------------------";
                sss = sss + "<br>";
                if (!(document.cookie || navigator.cookieEnabled)) {
                    sss = sss + 'cookie 未打开!';
                    sss = sss + "<br>";
                } else {
                    sss = sss + 'cookie 打开啦！!';
                    sss = sss + "<br>";
                }
                if (window.localStorage) {
                    sss = sss + '恭喜您！您的浏览器支持本地存储!';
                    sss = sss + "<br>";
                } else {
                    sss = sss + '您的浏览器版本不支持本地存储，建议升级！';
                    sss = sss + "<br>";
                }
                return sss;
            }
        };
    })
    .factory('CheckNetwork', function () {
        return {
            log: function () {
                return "开发中，请等待...";
            }
        }
    })


    






