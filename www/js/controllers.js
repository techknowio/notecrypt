angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('loginController', function($scope,$state,$ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.create = function() {
        $state.go("app.createaccount");
     };
})

.controller('createAccount', function($scope,$state,$ionicPopup,$http) {
    $scope.loginData = {};
    $scope.cancel = function() {
        $state.go("app.login");
    };
    $scope.create = function() {
	var email = "";
	var password1 = "";
	var password2 = "";
	if ($scope.loginData.email === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid E-mail',
                template: 'The E-mail you requested is invalid'
            });
            return;
	} else {
		email = $scope.loginData.email;
	}
	if ($scope.loginData.password1 === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Password',
                template: 'The password you requested is invalid'
            });
            return;
	} else {
		password1 = $scope.loginData.password1;
	}
	if ($scope.loginData.password2 === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Password',
                template: 'The password you requested is invalid'
            });
            return;
	} else {
		password2 = $scope.loginData.password2;
	}
	if (password1 != password2) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Password',
                template: 'The passwords you requested do not match'
            });
            return;
	}
        var request = $http({
            method: "post",
            url: "/api/api.php",
            data: {
                email: email,
                password: password1,
                command: "createaccount"
            },
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function (data, status, headers, config) {
		if (data.error == 1) {
            		var alertPopup = $ionicPopup.alert({
                		title: data.errortitle,
                		template: data.errormsg
            		});
            		return;
		} else {
            		var alertPopup = $ionicPopup.alert({
                		title: "Account Created!",
                		template: "Your account has been created, please login now!"
            		});
			alertPopup.then(function(res) {
			        $state.go("app.login");
			});
            		return;
		}
	}).error(function (data, status, headers, config) {
		console.log(data + " " + status);
	});
    };
})

.controller('NotebooksCtrl', function($scope,$ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
});
