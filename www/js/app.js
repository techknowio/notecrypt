angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$state,$ionicSideMenuDelegate,$http) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    //Let's check the login
    var request = $http({
        method: "post",
        url: "/api/api.php",
        data: {
            email: email,
            password: password,
            command: "login"
        },
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function (data, status, headers, config) {
        if (data.error == 1) {
            $ionicSideMenuDelegate.canDragContent(false);
            $state.go("app.login");
        } else {
            var storage = window.localStorage;
            storage.setItem("email", email);
            storage.setItem("password", password);
            $state.go("app.notebooks");
        }
        }).error(function (data, status, headers, config) {
            console.log(data + " " + status);
        });
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
