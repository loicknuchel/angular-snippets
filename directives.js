angular.module('app')


.directive('myPopover', function($compile, $http, $templateCache){
    function loadPopoverHtml(element, scope, html){
        if(scope.popoverData){
            loadPopover(element, scope, $compile(html)(scope), true);
        } else {
            loadPopover(element, scope, html, true);
        }
    }
    
    function loadPopover(element, scope, popoverContent, isHtml){
        var options = {
            title: scope.popoverTitle,
            html: isHtml,
            content: popoverContent,
            trigger: scope.popoverTrigger ? scope.popoverTrigger : 'hover',
            placement: scope.popoverPlacement ? scope.popoverPlacement : 'right'
        };
        $(element).popover(options);
    }

    return {
        restrict: "A",
        transclude: true,
        template: "<span ng-transclude></span>",
        link: function(scope, element, attrs){
            if(scope.popoverTemplateUrl){
                $http.get(scope.popoverTemplateUrl, {cache: $templateCache}).success(function(html){
                    loadPopoverHtml(element, scope, html);
                });
            } else if(scope.popoverTemplate){
                loadPopoverHtml(element, scope, scope.popoverTemplate);
            } else {
                loadPopover(element, scope, scope.popoverContent, false);
            }
        },
        scope: {
            popoverData: '=',
            popoverTemplateUrl: '@',
            popoverTemplate: '@',
            popoverContent: '@',
            popoverTitle: '@',
            popoverTrigger: '@',
            popoverPlacement: '@'
        }
    };
});
