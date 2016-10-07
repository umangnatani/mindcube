using System.Web;
using System.Web.Optimization;

namespace HealthForm.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/baseJS").Include(
                "~/Scripts/base/jquery.js",
                "~/Scripts/base/bootstrap.js",
                "~/Scripts/base/toastr.js",
                "~/Scripts/base/jquery.raty.js",
                "~/Scripts/base/respond.src.js",
                "~/Scripts/base/angular.min.js",
                "~/Scripts/base/angular-route.min.js",
                "~/Scripts/base/angular-resource.min.js",
                //"~/Scripts/base/angular-cookies.js",
                "~/Scripts/base/angular-validator.js",
                //"~/Scripts/base/angular-base64.js",
                //"~/Scripts/base/angular-file-upload.js",
                //"~/Scripts/base/angucomplete-alt.min.js",
                //"~/Scripts/base/ui-bootstrap-tpls-0.13.1.js",
                "~/Scripts/base/ui-bootstrap-tpls-2.1.3.min.js",
                //"~/Scripts/base/underscore.js",
                //"~/Scripts/base/raphael.js",
                //"~/Scripts/base/morris.js",
                //"~/Scripts/base/jquery.fancybox.js",
                //"~/Scripts/base/jquery.fancybox-media.js",
                "~/Scripts/base/loading-bar.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/pluginJS").Include(
               "~/Scripts/plugin/select2.min.js",
              "~/Scripts/plugin/bootbox.min.js",
              "~/Scripts/plugin/jquery.blockUI.js",
              "~/Scripts/plugin/jquery.inputmask.bundle.min.js",
              "~/Scripts/plugin/ag-grid.js",
              "~/Scripts/plugin/moment.min.js",
              "~/Scripts/plugin/toastr.min.js",
              "~/Scripts/plugin/bootstrap-notify.min.js",
              "~/Scripts/plugin/bootstrap-datetimepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/layoutJS").Include(
            "~/Scripts/layout/umang.js"));


            bundles.Add(new ScriptBundle("~/bundles/appJS").Include(
             "~/Scripts/app/app.js",
             "~/Scripts/app/modules/common.core.js",
             "~/Scripts/app/modules/common.ui.js",
             "~/Scripts/app/services/apiService.js",
             "~/Scripts/app/services/notificationService.js",
             "~/Scripts/app/home/rootController.js",
             "~/Scripts/app/client/clientController.js",
             "~/Scripts/app/list/listMaintController.js"
            ));



            bundles.Add(new StyleBundle("~/Content/base/baseCSS").Include(
                    "~/Content/base/bootstrap.css",
                    "~/Content/base/jquery-ui.css"
                    ));


            bundles.Add(new StyleBundle("~/Content/plugin/pluginCSS").Include(
                       "~/Content/plugin/select2.css",
                       "~/Content/plugin/bootstrap-datetimepicker.min.css",
                       "~/Content/plugin/toastr.min.css",
                        "~/Content/site.css"
                       //"~/Content/theme.css"
                       ));

            bundles.Add(new StyleBundle("~/Content/layout/layoutCSS").Include(
          "~/Content/layout/umang.css"));

            BundleTable.EnableOptimizations = false;

        }
    }
}


