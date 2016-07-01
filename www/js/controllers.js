angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {
    $scope.logout = function() {
        var storage = window.localStorage;
        storage.setItem("email", "");
        storage.setItem("password", "");
        $state.go("app.login");        
    };
})

.controller('loginController', function($scope,$state,$ionicSideMenuDelegate,$ionicPopup,$http) {
    $scope.loginData = {};
    var email= "";
    var password="";
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.create = function() {
        $state.go("app.createaccount");
     };
    $scope.login = function() {
        if ($scope.loginData.email === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Login',
                template: 'You Must Enter Your E-Mail Address'
            });
            return;
    	} else {
	    	email = $scope.loginData.email;
    	}
        if ($scope.loginData.password === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Login',
                template: 'You Must Enter Your Password'
            });
            return;
    	} else {
	    	password = $scope.loginData.password;
    	}

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
                var alertPopup = $ionicPopup.alert({
                	title: data.errortitle,
                	template: data.errormsg
            	});
            	return;
            } else {
                var storage = window.localStorage;
                storage.setItem("email", email);
                storage.setItem("password", password);
                $state.go("app.notebooks");
    		}
	    }).error(function (data, status, headers, config) {
		    console.log(data + " " + status);
	    });
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

.controller('NotebooksCtrl', function($scope,$ionicSideMenuDelegate,$ionicNavBarDelegate,$http,$ionicPopup) {
    $ionicSideMenuDelegate.canDragContent(true);
    $ionicNavBarDelegate.showBackButton(false);
    $scope.notebooks = [];

    $scope.addNoteBook = function() {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.newnotebookname">',
            title: 'Enter A Notebook Name',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.newnotebookname) {
                            e.preventDefault();
                        } else {
                            var notebookname = $scope.data.newnotebookname;
                            var request = $http({
                                method: "post",
                                url: "/api/api.php",
                                data: {
                                    email: email,
                                    password: password,
                            		notebookname: notebookname,
                                    command: "addnotebook"
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
                                $scope.notebooks=data.notebooks;
                    		}
	                        }).error(function (data, status, headers, config) {
                    		    console.log(data + " " + status);
                    	    });        
                        }
                    }
                }
            ]
        });
    };

    $scope.removeItem = function(item) {
        var request = $http({
            method: "post",
            url: "/api/api.php",
            data: {
                email: email,
                password: password,
		id: item,
                command: "deletenotebook"
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

		}
	    }).error(function (data, status, headers, config) {
		    console.log(data + " " + status);
	    });
        for(i = 0; i < $scope.notebooks.length; i++) {
            if($scope.notebooks[i].notebook.id == item){
                $scope.notebooks.splice(i, 1);
            }
        }
    }

    $scope.$watch('$viewContentLoading', function(){
        var request = $http({
            method: "post",
            url: "/api/api.php",
            data: {
                email: email,
                password: password,
                command: "getnotebooks"
            },
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data, status, headers, config) {
		    if (data.error == 1) {
                if (email !== null && password !== null) {
                    var alertPopup = $ionicPopup.alert({
                	    title: data.errortitle,
                    	template: data.errormsg
                	});
                }
            	return;
            } else {
                $scope.notebooks=data.notebooks;
		console.log($scope.notebooks);
                console.log(JSON.stringify(data));
                console.log(JSON.stringify(data.notebooks));
    		}
	    }).error(function (data, status, headers, config) {
		    console.log(data + " " + status);
	    });
    });
});
