'use strict';
angular.module('app', [])

.run(function($rootScope, $location){
    $rootScope.isActive = function (viewLocation) {
        var regex = new RegExp('^'+viewLocation+'$', 'g');
        return regex.test($location.path());
    };

    $rootScope.safeApply = function(fn){
        var phase = this.$root ? this.$root.$$phase : this.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});

