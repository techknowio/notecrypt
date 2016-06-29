angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$state,$ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (isLoggedIn == false) {
        $ionicSideMenuDelegate.canDragContent(false);
        $state.go("app.login");
    } else {

    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
	controller: 'loginController'
      }
    }
  })
  .state('app.createaccount', {
    url: '/createaccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
	controller: 'createAccount'
      }
    }
  })
  .state('app.notebooks', {
      url: '/notebooks',
      views: {
        'menuContent': {
          templateUrl: 'templates/notebooks.html',
          controller: 'NotebooksCtrl'
        }
      }
  });
  $urlRouterProvider.otherwise('/app/notebooks');
});
