(function (app) {

    var busyIndicator = function ($rootScope) {
        return {
            restrict: 'E',
            template: "<div ng-if='$rootScope.isBusy'><h3>Please wait.. <i class='fa fa-cog fa-spin'></i></h3></div><div id='blockUiBackdrop' ng-if='$rootScope.isBusy'></div>",
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

})(angular.module('common.core'));




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

}(angular.module('common.core')));


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

//}(angular.module('common.core')));