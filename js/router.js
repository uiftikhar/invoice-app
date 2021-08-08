'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.querySelector('#app-root');
    },
    init: function () {
        let r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                let current = window.location.hash.substr(1);
                // Use ? to pass parameters
                if(current.includes('?')) {
                    current = current.split('?')[0];
                }
                if(route.isActiveRoute(current)) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) {
            let url = 'views/' + htmlName,
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    const event = new Event('page-loaded');
                  // Listen for the event.
                    // elem.addEventListener('build', function (e) { /* ... */ }, false);

                    // Dispatch the event.
                    scope.rootElem.dispatchEvent(event);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};