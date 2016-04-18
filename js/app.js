angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngSanitize'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
	$stateProvider
	.state('app', {
		cache: false,
		url: '/app',
//		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	.state('app.login', {
		cache: false,
		url: '/app/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
			}
		}
	})
	.state('checklogout', {
		cache: false,
		url: '/checklogout',
		templateUrl: 'templates/checklogout.html',
		controller: 'CheckLogoutCtrl'
	})
	.state('app.newuser', {
		url: '/newuser',
		cache: false,
		views: {
			'menuContent': {
				templateUrl: 'templates/newuser.html',
				controller: 'NewuserCtrl'
			}
		}
	})
	.state('app.profile', {
		cache: false,
		url: '/profile',
		views: {
			'menuContent': {
				templateUrl: 'templates/profile.html',
				controller: 'ProfileCtrl'
			}
		}
	})
	.state('app.about', {
		cache: false,
		url: '/about',
		views: {
			'menuContent': {
				templateUrl: 'templates/about.html'
			}
		}
	})
	.state('app.menuResto', {
		cache: false,
		url: '/menuResto',
		views: {
			'menuContent': {
				templateUrl: 'templates/menuResto.html',
				controller: 'menuRestoCtrl'
			}
		}
	})
	.state('app.menuID', {
		cache: false,
		url: '/menuResto/:menuID/:menuTitle/:menuPrice',
		views: {
			'menuContent': {
				templateUrl: 'templates/menuID.html',
				controller: 'menuIDCtrl'
			}
		}
	})
	.state('app.queue', {
		cache: false,
		url: '/queue',
		views: {
			'menuContent': {
				templateUrl: 'templates/queue.html',
				controller: 'queueCtrl'
			}
		}
	})
	.state('app.gallery', {
		cache: false,
		url: '/gallery',
		views: {
			'menuContent': {
				templateUrl: 'templates/gallery.html',
				controller: 'galleryCtrl'
			}
		}
	})
	.state('app.video', {
		cache: false,
		url: '/video',
		views: {
			'menuContent': {
				templateUrl: 'templates/video.html',
				controller: 'videoCtrl'
			}
		}
	})
	.state('app.restolists', {
		cache: false,
		url: '/restolists',
		views: {
			'menuContent': {
				templateUrl: 'templates/restolists.html',
				controller: 'restolistsCtrl'
			}
		}
	})
	.state('openResto', {
		cache: false,
		url: '/open',
		templateUrl: 'templates/openResto.html',
		controller: 'openCtrl'
	});
	// Thanks to Ben Noblet!
	$urlRouterProvider.otherwise(function ($injector, $location) {
		var $state = $injector.get("$state");
		$state.go("app");
	});
})
.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
});
var baseUrl = 'http://malesantri.onfinger.net/';
var session;var cekregion;var userdata;var codeItem;var position;var findR;var keyword;var keyregion;var orderQ;
var DEFAULT_PAGE_SIZE_STEP = 1;var dataLength;
function showModal($scope, $ionicModal, templateUrl, backButton) {
		$ionicModal.fromTemplateUrl(templateUrl, {
		  scope: $scope,
		  hardwareBackButtonClose: backButton
	}).then(function(modal) {
		if(templateUrl == 'one.html'){
			$scope.ModalMenu = modal;
			$scope.ModalMenu.show();
		}else if(templateUrl == 'two.html'){
			$scope.ModalMenuDetail = modal;
			$scope.ModalMenuDetail.show();
		}else if(templateUrl == 'galleryID.html'){
			$scope.ModalGallery = modal;
			$scope.ModalGallery.show();
		}else if(templateUrl == 'videoID.html'){
			$scope.ModalVideo = modal;
			$scope.ModalVideo.show();
		}else{
			$scope.Modal = modal;
			$scope.Modal.show();
		}
	});
}
function checkToken(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
function GetObjectKeyIndex(obj, keyToFind) {
    var i = 0, key;
    for (key in obj) {
        if (key == keyToFind) {
            return i;
        }
        i++;
    }
    return null;
}