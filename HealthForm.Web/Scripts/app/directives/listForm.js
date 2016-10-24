(function (app) {


    function caseCommentsController($scope, $location, myService) {

        var ctrl = this;

        //alert(ctrl.entityObject.ObjectType);

        //myService.getListByPost('api/comments/list', ctrl, 'list', ctrl.entityObject);



        $scope.$on("comments", function (evt, data) {
            //alert('ff');
            console.log(ctrl.entityObject);
            myService.getListByPost('api/comments/list', ctrl, 'list', ctrl.entityObject);
            //$scope.childVm = {};
            ctrl.childVm = angular.copy(ctrl.entityObject);
        });



        ctrl.editChild = function (childVm) {
            ctrl.childVm = JSON.parse(JSON.stringify(childVm));
        }

        ctrl.addNew = function () {
            ctrl.childVm = angular.copy(ctrl.entityObject);
        }



        ctrl.save = function () {
            myService.save('api/comments/maintain', ctrl, 'childVm', function () {
                $scope.$emit("comments");
            });

        }


    };



    var ourComponent = {
        // isolated scope binding
        bindings: {
            entityObject: '='
        },

        // Inline template which is binded to message variable
        // in the component controller
        templateUrl: 'scripts/app/case/comments.html',

        // The controller that handles our component logic
        controller: caseCommentsController
    };

    app.component('ourComponent', ourComponent);

})(angular.module('MyApp'));




(function (app) {

    var busyIndicator = function ($rootScope) {
        return {
            restrict: 'E',
            template: "<div ng-if='$root.isBusy'><h3>Please wait.. <i class='fa fa-cog fa-spin'></i></h3></div><div id='blockUiBackdrop' ng-if='$root.isBusy'></div>",
            //link: function (scope, elem, attrs) {
            //    scope.isRouteLoading = false;

                

            //    //$rootScope.$on('$routeChangeStart', function () {
            //    //    scope.isRouteLoading = true;
            //    //});

            //    //$rootScope.$on('$routeChangeSuccess', function () {
            //    //    scope.isRouteLoading = false;
            //    //});
            //}
        };
    };
    busyIndicator.$inject = ['$rootScope'];

    app.directive('busyIndicator', busyIndicator);

})(angular.module('MyApp'));




(function (app) {

    var listForm = function ($compile) {

        var getTemplate = function (obj) {
            var strTemp = '';
            //var strTemp = '<div class="form-group"><label class="col-md-1 control-label">' + obj.ColumnType + '</label>';


            switch (obj.ColumnType) {

                case 'T': return '<div class="form-group"><label class="' + obj .LabelCols + ' control-label">' + obj.ColumnTitle + '</label><input type="text"/></div>';
                case 'D': return '<div class="form-group"><label class="' + obj.LabelCols + ' control-label">' + obj.ColumnTitle + '</label><select ng-model="obj.ColumnType" ng-options="option.Text as option.Text for option in obj.ListColumnOptions"><option value="">-- Select --</option></select></div>';
                //case 'D': return "<select><option value=''>-- Select --</option></select>";
            }

            //strTemp = strTemp + '</div>';

            //return strTemp;
        }

        return {
            restrict: 'E',
            scope: { column: '=listColumn' },
            link: function (scope, element, attrs) {
                var el = $compile(getTemplate(scope.column))(scope);
                element.replaceWith(el);
            }
            //template: "{{ column.ColumnTitle }} <input type='text' />",
            //link: function (scope, elem, attrs) {
            //    scope.isRouteLoading = false;



            //    //$rootScope.$on('$routeChangeStart', function () {
            //    //    scope.isRouteLoading = true;
            //    //});

            //    //$rootScope.$on('$routeChangeSuccess', function () {
            //    //    scope.isRouteLoading = false;
            //    //});
            //}
        };
    };
    listForm.$inject = ['$compile'];

    app.directive('listForm', listForm);

}(angular.module('MyApp')));


//(function (app) {

//    var listForm = function ($rootScope) {
//        return {
//            restrict: 'E',
//            //scope: { column: '=listColumn' },
//            template: function (element, attrs) {
//                //attrs.$observe('listColumn', function (listColumn) {
//                //    var lc = listColumn;
//                //});

//                if (attrs.listColumn == "D")
//                    return attrs.listColumn + "<input type='text' />";
//                else
//                    return attrs.listColumn + "<select type='text' ><option value=''>-- Select --</option></select>";
//            },
//            //template: "{{ column.ColumnTitle }} <input type='text' />",
//            //link: function (scope, elem, attrs) {
//            //    scope.isRouteLoading = false;



//            //    //$rootScope.$on('$routeChangeStart', function () {
//            //    //    scope.isRouteLoading = true;
//            //    //});

//            //    //$rootScope.$on('$routeChangeSuccess', function () {
//            //    //    scope.isRouteLoading = false;
//            //    //});
//            //}
//        };
//    };
//    listForm.$inject = ['$rootScope'];

//    app.directive('listForm', listForm);

//}(angular.module('MyApp')));


(function (app) {

    app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.datepicker({
                    dateFormat: 'mm/dd/yy',
                    onSelect: function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});
}(angular.module('MyApp')));
