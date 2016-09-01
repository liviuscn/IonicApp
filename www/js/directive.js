//添加自定义的指令
//E 只限元素名使用
//A 只限属性使用
//C 只限类名使用
//M 只限注释使用
angular.module('starter.directive', [])
    //隐藏tabs的另一种方法  tabs class中加{{hideTabs}}   ion-view加hide-tabs
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'AE',
            link: function ($scope) {
                $rootScope.hideTabs = 'tabs-item-hide';
                $scope.$on('$destroy', function () {
                    $rootScope.hideTabs = ' ';
                })
            }
        }
    });




