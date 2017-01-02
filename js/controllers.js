var regions = [
	{'code':'AC','name':'Aceh Darussalam'},
	{'code':'SMU','name':'Sumatra Utara'},
	{'code':'SMB','name':'Sumatra Barat'},
	{'code':'RI','name':'Riau'},
	{'code':'KRI','name':'Kepulauan Riau'},
	{'code':'BNK','name':'Bengkulu'},
	{'code':'JMB','name':'Jambi'},
	{'code':'BKB','name':'Bangka Belitung'},
	{'code':'SML','name':'Sumatra Selatan'},
	{'code':'LMP','name':'Lampung'},
	{'code':'BNT','name':'Banten'},
	{'code':'JKT','name':'DKI Jakarta'},
	{'code':'JWB','name':'Jawa Barat'},
	{'code':'JWH','name':'Jawa Tengah'},
	{'code':'YK','name':'DI Yogyakarta'},
	{'code':'JWR','name':'Jawa Timur'},
	{'code':'BL','name':'Bali'},
	{'code':'NTB','name':'Nusa Tenggara Barat'},
	{'code':'NTT','name':'Nusa Tenggara Timur'},
	{'code':'KLB','name':'Kalimantan Barat'},
	{'code':'KLT','name':'Kalimantan Timur'},
	{'code':'KLU','name':'Kalimantan Utara'},
	{'code':'KLS','name':'Kalimantan Selatan'},
	{'code':'KLH','name':'Kalimantan Tengah'},
	{'code':'SLB','name':'Sulawesi Barat'},
	{'code':'SLT','name':'Sulawesi Tenggara'},
	{'code':'SLS','name':'Sulawesi Selatan'},
	{'code':'SLU','name':'Sulawesi Utara'},
	{'code':'SLH','name':'Sulawesi Tengah'},
	{'code':'GRO','name':'Gorontalo'},
	{'code':'MLK','name':'Maluku'},
	{'code':'MLU','name':'Maluku Utara'},
	{'code':'PPA','name':'Papua'},
	{'code':'PPB','name':'Papua Barat'}
];

angular.module('starter.controllers', [])

.controller('startCtrl', function($scope, $timeout) {
		if(findR == '' || findR == 'undefined' || findR == null){
			$scope.splashApp = {'display': 'block'};
			$scope.splashImg = "img/logo.png";
			$timeout(function() {
				$scope.SImg = {'top':'45%'};
				$scope.splashImg = "img/slogan.png";
			}, 2000);
			$timeout(function() {
				$scope.splashApp = {'display': 'none'};
			}, 4000);
		}else{
			$scope.splashApp = {'display': 'none'};
		}
})
	
.controller('AppCtrl', function($scope, $state, $ionicModal, $ionicHistory, $timeout, $ionicPlatform, $ionicSideMenuDelegate) {
	$ionicPlatform.ready(function() {
		$scope.regions = regions;
		$scope.item={};
		$scope.item.region = {code:"YK"};
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		if(localStorage.getItem("Profile_Email") == 'undefined' || localStorage.getItem("Profile_Email") == null || localStorage.getItem("Profile_Email") == '' || localStorage.getItem("tokenemail") != checkToken(localStorage.getItem("Profile_Email"))){
			$scope.itemMenu1 = {'display':'block'};
			$scope.itemMenu2 = {'display':'none'};
			$scope.itemMenu3 = {'display':'none'};
			$scope.itemMenu4 = {'display':'none'};
			$scope.itemMenu5 = {'display':'none'};
			$scope.itemMenu6 = {'display':'none'};
			$scope.itemMenu7 = {'display':'none'};
			$scope.itemMenu8 = {'display':'none'};
			$scope.itemMenu9 = {'display':'none'};
			$state.go('app.login');
		}else{
 			if(localStorage.getItem("tokenregion") == checkToken(localStorage.getItem("Profile_Region"))){
				cekregion = localStorage.getItem("Profile_Region").split(" ").pop();
				ceksession = localStorage.getItem("Profile_Region").split(" ").shift();
				$scope.itemMenu1 = {'display':'none'};
				$scope.itemMenu2 = {'display':'block'};
				$scope.itemMenu7 = {'display':'block'};
				if(cekregion == 'u'){
					$scope.itemMenu3 = {'display':'none'};
					$scope.itemMenu4 = {'display':'none'};
					$scope.itemMenu5 = {'display':'none'};
					$scope.itemMenu9 = {'display':'none'};
					if(localStorage.getItem("Profile_Name") == "noname" || localStorage.getItem("Profile_Phone") == "unknown"){
						$scope.itemMenu6 = {'display':'none'};
						$scope.itemMenu8 = {'display':'none'};
						$state.go('app.profile'); 
					}else{
						$scope.itemMenu6 = {'display':'block'};
						$scope.itemMenu8 = {'display':'block'};
						$state.go('app.restolists'); 
					}
				}else{
					$scope.itemMenu6 = {'display':'none'};
					$scope.itemMenu8 = {'display':'none'};
					if(localStorage.getItem("Profile_Name") == "noname" || localStorage.getItem("verified") == checkToken("verifyr"+ ceksession)){
						$scope.itemMenu3 = {'display':'none'};
						$scope.itemMenu4 = {'display':'none'};
						$scope.itemMenu5 = {'display':'none'};
						$scope.itemMenu9 = {'display':'none'};
					}else{
						$scope.itemMenu3 = {'display':'block'};
						$scope.itemMenu4 = {'display':'block'};
						$scope.itemMenu5 = {'display':'block'};
						$scope.itemMenu9 = {'display':'block'};
					}
					$state.go('app.profile'); 
				}
			}
		}
	});
	$scope.browse = function(){
		findR = 'set';
		keyword = $scope.item.search;
		keyregion = $scope.item.region.code;
		$ionicSideMenuDelegate.toggleLeft(false);
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app', {}, {reload: true});
	}
	$scope.logout = function(){
		localStorage.removeItem("Profile_ID");
		localStorage.removeItem("Profile_Email");
		localStorage.removeItem("Profile_Name");
		localStorage.removeItem("Profile_Phone");
		localStorage.removeItem("Profile_Whatsapp");
		localStorage.removeItem("Profile_Region");
		localStorage.removeItem("Profile_Address");
		localStorage.removeItem("Profile_Open");
		localStorage.removeItem("tokenemail");
		localStorage.removeItem("tokenregion");
		localStorage.removeItem("verified");
		localStorage.removeItem("openResto");
		$timeout(function () {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true});
			$state.go('checklogout');
		}, 1000);
	}
})

.controller('LoginCtrl', function($scope, $state, $ionicHistory, $ionicModal, $ionicLoading, $ionicPopup, userService) {
	$scope.FBLogin = function() {
		FB.login(function(response) {
			console.log(response.authResponse.userID);
			FB.api('/me', { locale: 'en_US', fields: 'name, email'}, function(data) {
				console.log(data);console.log('http://graph.facebook.com/' + response.authResponse.userID + '/picture?type=normal');
 				if(data.email != ''){
//					$state.go('app.newuser', {userID: response.authResponse.userID, name: data.name, email: data.email, apiFrom: 'fb'});
				}
			});
		});
	}
	$scope.user = {};
	$scope.resetpw = {};
	$scope.login = function(statusForm){
		if(!statusForm){
  			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			userService.login({
				'data1': $scope.user.email,
				'data2': $scope.user.password
			}).success(function(userauth){
				$ionicLoading.hide();
				if(userauth == "a")$ionicPopup.alert({
					title: 'Information',
					template: 'Database connection failed'});
				else if(userauth == "b")$ionicPopup.alert({
					title: 'Information',
					template: 'Invalid User'});
				else {
					$scope.user = {};
					session = new Date().getTime();
 					localStorage.setItem("Profile_ID", userauth.id);
					localStorage.setItem("Profile_Email", userauth.email + ' ' +session);
					localStorage.setItem("tokenemail", checkToken(localStorage.getItem("Profile_Email")));
					localStorage.setItem("Profile_Name", userauth.name);
					localStorage.setItem("Profile_Phone", userauth.phone);
					localStorage.setItem("Profile_Whatsapp", userauth.whatsapp);
					localStorage.setItem("Profile_Region", session+ ' ' +userauth.region);
					localStorage.setItem("tokenregion", checkToken(localStorage.getItem("Profile_Region")));
					localStorage.setItem("verified", checkToken("verify"+ userauth.region + session));
					localStorage.setItem("Profile_Address", userauth.address);
					localStorage.setItem("Profile_Open", userauth.open + ' ' +session);
 					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('app', {}, {reload: true} );
				}
			});
		}
	}
	$scope.forgot = function(){
		showModal($scope, $ionicModal, 'forgot.html', true);
	}
	$scope.randpw = function(statusForm){
		if(!statusForm){
  			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			userService.resetpassword({
				'email': $scope.resetpw.email
			}).success(function(userpw){
				$ionicLoading.hide();
				if(userpw == "a")$ionicPopup.alert({
					title: 'Information',
					template: 'Database connection failed'});
				else if(userpw == "b")$ionicPopup.alert({
					title: 'Information',
					template: 'Email is not registered'});
				else if(userpw == "c")$ionicPopup.alert({
					title: 'Information',
					template: 'Database query failed'});
				else {
					$ionicPopup.alert({
					title: 'Information',
					template: 'Done!'});
					$scope.resetpw = {};
					$scope.Modal.hide();
					$scope.Modal.remove();
				}
			});
		}
	}
})

.controller('NewuserCtrl', function($scope, $ionicPlatform, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicLoading, $timeout, userService) {
	$ionicPlatform.ready(function() {
		$scope.user = {};
		if($stateParams.userID != ''){
			$scope.user.email = $stateParams.email;
			$scope.emailDisable = true;
		}
		$scope.typeUser = [
			{ 'value': 'Visitor' },
			{ 'value': 'Resto' }
		];
		$scope.user.type = 'Resto';
		$scope.finalUser = {'display':'none'};
	});
	$scope.typeChange = function(value){
		$scope.user.type = value;
	}
	$scope.send = function(statusForm){
		if(!statusForm){
			if($stateParams.userID != ''){
				$scope.name = $stateParams.name;
				$scope.apiFrom = $stateParams.apiFrom;
			}else{
				$scope.name = 'noname';
				$scope.apiFrom = 'ap';
			}
 			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			userService.create({
				'data1': $scope.user.email,
				'data2': $scope.user.type,
				'data3': $scope.name,
				'data4': $scope.apiFrom
			}).success(function(userd){
				$ionicLoading.hide();
				if(userd == "a"){
					$scope.alertResponse = "Database connection failed";
					$scope.alert = {'display':'block','color':'#ef473a'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alert = {'display':'none'};
					}, 3000);
				}
				else if(userd == "b"){
					$scope.alertResponse = "Choose another user email";
					$scope.alert = {'display':'block','color':'#ef473a'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alert = {'display':'none'};
					}, 3000);
				}
				else if(userd == "c"){
					$scope.alertResponse = "Database query failed";
					$scope.alert = {'display':'block','color':'#ef473a'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alert = {'display':'none'};
					}, 3000);
				}
				else {
					console.log(userd);
					session = new Date().getTime();
					localStorage.setItem("Profile_ID", userd);
					localStorage.setItem("Profile_Email", $scope.user.email + ' ' +session);
					localStorage.setItem("tokenemail", checkToken(localStorage.getItem("Profile_Email")));
					localStorage.setItem("Profile_Name", $scope.name);
					localStorage.setItem("Profile_Phone", 'unknown');
					localStorage.setItem("Profile_Whatsapp", 'unknown');
					if($scope.user.type == "Visitor"){
						localStorage.setItem("Profile_Region", session+ ' u');
						localStorage.setItem("verified", checkToken("verifyu" + session));
					}else{
						localStorage.setItem("Profile_Region", session+ ' r');
						localStorage.setItem("verified", checkToken("verifyr" + session));
					}
					localStorage.setItem("tokenregion", checkToken(localStorage.getItem("Profile_Region")));
					localStorage.setItem("Profile_Address", 'unknown');
					localStorage.setItem("Profile_Open", '0 ' +session);
					if($stateParams.userID != ''){
						$scope.emailDisable = false;
					}
					$scope.user = {};
					$scope.user.type = "Visitor";
					$scope.alertResponse = "";
					$scope.alert = {'display':'none'};
					$scope.formUser = {'display':'none'};
					$scope.finalUser = {'display':'block'};
					$timeout(function() {
						$scope.formUser = {'display':'block'};
						$scope.finalUser = {'display':'none'};
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$state.go('app', {}, {reload: true} );
					}, 3000);
				}
			});
		}
	}
	$scope.loginPage = function(){
		$scope.formUser = {'display':'block'};
		$scope.finalUser = {'display':'none'};
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app', {}, {reload: true} );
	}
})

.controller('CheckLogoutCtrl', function($scope, $state, $timeout, $ionicHistory) {
	$scope.$on('$ionicView.afterEnter', function() {
		$timeout(function () {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true});
			$state.go('app', {}, {reload: true});
		}, 30);
	})
})

.controller('ProfileCtrl', function($scope, $state, $timeout, $ionicModal, $ionicLoading, $ionicActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, userService) {
	if(localStorage.getItem("Profile_Name") == "noname" || localStorage.getItem("verified") == checkToken("verifyr"+ ceksession)){
		$scope.statusUser = 'not verified';
		$scope.statusLabel = {'color':'#ef473a'};
	}else{
		$scope.statusUser = 'verified';
		$scope.statusLabel = {'color':'#33cd5f'};
	}
	$scope.profile = "http://malesantri.onfinger.net/media/"+ localStorage.getItem("Profile_Email").split(" ").shift() +'/profile.jpg?'+ new Date().getTime();
	$scope.name = localStorage.getItem("Profile_Name");
	$scope.phone = localStorage.getItem("Profile_Phone");
	$scope.whatsapp = localStorage.getItem("Profile_Whatsapp");
	$scope.useraddress = localStorage.getItem("Profile_Address");
	if(localStorage.getItem("Profile_Region").split(" ").pop() == 'u'){
		$scope.type = 'ion-person';
		$scope.showData = {'display':'none'};
	}else{
		$scope.type = 'ion-coffee';
		if(localStorage.getItem("Profile_Region").split(" ").pop() == 'r'){
			$scope.region = 'unknown';
		}else{
			for (i = 0; i < regions.length; i++) {
				if(regions[i].code == localStorage.getItem("Profile_Region").split(" ").pop()){
					$scope.region = regions[i].name;break;
				}
			} 
		}
	}
	$scope.setPic = function(){
		var options = {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 800,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};

		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{
					text: 'Gallery'
				},
				{
					text: 'Camera'
				}
			],
			titleText: 'Image Source',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				if(index == 0)options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
				else options.sourceType = Camera.PictureSourceType.CAMERA;
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.changePic={'display':'none'};
					$scope.loadingPic={'display':'block'};
					var url = baseUrl +"upload.php";
					var targetPath = imageData.split("/").pop();
					if(index == 0)var targetFile = targetPath.split("jpg").shift()+"jpg";
					else var targetFile = targetPath;
					var optionsUpload = {
						fileKey: "file",
						fileName: targetFile,
						chunkedMode: false,
						params : {'user':localStorage.getItem("Profile_Email").split(" ").shift(), 'directory':'user', 'fileName':targetFile}
					};
					$cordovaFileTransfer.upload(url, imageData, optionsUpload).then(function (success) {
						$scope.loadingPic={'display':'none'};
						$scope.changePic={'display':'block'};
 						if(JSON.stringify(success.response) == '"ok"'){
							$scope.profile = imageData;
						} else {
							$scope.uploadAlert = {'display':'block'};
							$timeout(function() {
								$scope.uploadAlert = {'display':'none'};
							}, 3000);
						}
					});
				});
			}
		});
		$timeout(function() {
			hideSheet();
		}, 3000);
    }
	$scope.editProfile = function(){
		showModal($scope, $ionicModal, 'Profile.html', true);
		$scope.user = {};
		$scope.user.name = localStorage.getItem("Profile_Name");
		$scope.user.phone = localStorage.getItem("Profile_Phone");
		if(localStorage.getItem("Profile_Region").split(" ").pop() == 'u'){
			$scope.maxName = 10;
			$scope.address = '';
			$scope.WAUser = {'display':'none'};
			$scope.RegionUser = {'display':'none'};
			$scope.AddressUser = {'display':'none'};
		}else{
			$scope.maxName = 30;
			$scope.address = 'required';
			$scope.user.whatsapp = localStorage.getItem("Profile_Whatsapp");
			if(localStorage.getItem("Profile_Region").split(" ").pop() == 'r'){
				$scope.user.region = {code:"YK"};
			}else{
				for (i = 0; i < regions.length; i++) {
					if(regions[i].code == localStorage.getItem("Profile_Region").split(" ").pop()){
						$scope.user.region = {code:regions[i].code};break;
					}
				} 
			}
			$scope.user.address = localStorage.getItem("Profile_Address");
		}
	}
	$scope.changePassword = function(){
		$scope.user = {};
		showModal($scope, $ionicModal, 'Password.html', true);
	}
	$scope.closeModal = function(){
		$scope.Modal.hide();
		$scope.Modal.remove();
	}
    $scope.updateProfile = function (statusForm){
 		if(!statusForm){
 			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			if(localStorage.getItem("Profile_Region").split(" ").pop() == 'u'){
				userdata = {
					'data1': 'profile',
					'data2': $scope.user.name,
					'data3': $scope.user.phone,
					'data4': 'unknown',
					'data5': 'u',
					'data6': 'unknown',
					'data7': localStorage.getItem("Profile_ID"),
					'data8': localStorage.getItem("Profile_Email").split(" ").shift()
				};
			}else{
				userdata = {
					'data1': 'profile',
					'data2': $scope.user.name,
					'data3': $scope.user.phone,
					'data4': $scope.user.whatsapp,
					'data5': $scope.user.region.code,
					'data6': $scope.user.address,
					'data7': localStorage.getItem("Profile_ID"),
					'data8': localStorage.getItem("Profile_Email").split(" ").shift()
				};
			}
			userService.update(userdata).success(function(userd){
				$ionicLoading.hide();
 				if(userd == "a"){
					$scope.alertResponse = "Database connection failed";
					$scope.alert = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alert = {'display':'none'};
					}, 3000);
				}
				else if(userd == "b"){
					$scope.alertResponse = "Database query failed";
					$scope.alert = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alert = {'display':'none'};
					}, 3000);
				}
				else {
					$ionicLoading.hide();
					session = new Date().getTime();
					localStorage.setItem("Profile_Email", localStorage.getItem("Profile_Email").split(" ").shift() + ' ' +session);
					localStorage.setItem("tokenemail", checkToken(localStorage.getItem("Profile_Email")));
					localStorage.setItem("Profile_Name", $scope.user.name);
					localStorage.setItem("Profile_Phone", $scope.user.phone);
 					$scope.name = $scope.user.name;
					$scope.phone = $scope.user.phone;
					if(localStorage.getItem("Profile_Region").split(" ").pop() != 'u'){
						localStorage.setItem("Profile_Whatsapp", $scope.user.whatsapp);
						localStorage.setItem("Profile_Region", session+ ' ' +$scope.user.region.code);
						localStorage.setItem("tokenregion", checkToken(localStorage.getItem("Profile_Region")));
						localStorage.setItem("verified", checkToken("verify"+ $scope.user.region.code + session));
						localStorage.setItem("Profile_Address", $scope.user.address);
						$scope.whatsapp = $scope.user.whatsapp;
						$scope.region = $scope.user.region.name;
						$scope.useraddress = $scope.user.address;
					}
					$scope.Modal.hide();
					$scope.Modal.remove();
					$scope.user = {};
					$state.go('app', {}, {reload: true});
				}
			});
		}
	}
	$scope.updatePassword = function(statusForm){
		if(!statusForm){
 			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			userService.update({
				'data1': 'password',
				'data2': $scope.user.password,
				'data3': localStorage.getItem("Profile_ID"),
				'data4': localStorage.getItem("Profile_Email").split(" ").shift()
			}).success(function(userd){
				$ionicLoading.hide();
				if(userd == "a"){
					$scope.alertPassword = "Database connection failed";
					$scope.alertp = {'display':'block'};
					$timeout(function() {
						$scope.alertPassword = "";
						$scope.alertp = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else if(userd == "b"){
					$scope.alertPassword = "Database query failed";
					$scope.alertp = {'display':'block'};
					$timeout(function() {
						$scope.alertPassword = "";
						$scope.alertp = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else {
					$scope.alertPassword = "Done!";
					$scope.alertp = {'display':'block','color':'#33cd5f'};
					$timeout(function() {
						$scope.alertPassword = "";
						$scope.alertp = {'display':'none'};
						$scope.Modal.hide();
						$scope.Modal.remove();
						$scope.user = {};
					}, 3000);
				}
			});
		}
	}
})
.controller('menuRestoCtrl', function($scope, $ionicPlatform, $state, $ionicPopup, $timeout, $ionicModal, $ionicLoading, $ionicActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, menuService) {
    $scope.doRefresh = function() {
		menuService.getMenu("all", localStorage.getItem("Profile_ID"), localStorage.getItem("Profile_Email").split(" ").shift()).success(function(data){
			$scope.menulists = data;dataLength = data.length;
			if($scope.pageSizeM >= dataLength){
				$scope.loadBtn = {display:'none'};
			}
			for(i=0;i<data.length;i++){
				$scope.stockBind[i] = data[i].stock;
				$scope.stock[i] = data[i].checked;
				$scope.textClass[i] = data[i].textclass; 
				$scope.cover[i] = {'display':data[i].offCover};
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
	$ionicPlatform.ready(function() {
		$scope.currentPage = 1;
		$scope.pageSizeM = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
		$scope.cover = [];
		$scope.stock = [];
		$scope.stockBind = [];
		$scope.textClass = [];
		$scope.doRefresh();
	});
	$scope.loadNextPage = function(){
		$scope.currentPage++;
		$scope.pageSizeM = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageSizeM >= dataLength){
			$scope.loadBtn = {display:'none'};
		}
	}
	$scope.stockChange = function(value1,value2){
		menuService.getMenu('stock',value2,localStorage.getItem("Profile_ID")).success(function(stock){
  			if(stock == 0){
				$scope.cover[value1] = {display: 'block'};
				$scope.stockBind[value1] = "(not available)";
				$scope.textClass[value1] = "assertive";
				$scope.stock[value1] = false;
			}else{
				$scope.cover[value1] = {display: 'none'};
				$scope.stockBind[value1] = "(available)";
				$scope.textClass[value1] = "balanced";
				$scope.stock[value1] = true;
			}
		});
	}
	$scope.menuImg1 = "img/gallery.jpg";
	$scope.menuImg2 = "img/gallery.jpg";
	$scope.menuImg3 = "img/gallery.jpg";
	$scope.addMenu = function(){
		$ionicLoading.show({
			template: ''
		});
		var d = new Date();codeItem = d.getTime();
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': codeItem,
			'data3': 'cachefolder',
			'data4': 'add'
		}).success(function(){
			$scope.closeButton = {'display':'block'};
			$scope.menu = {};
			showModal($scope, $ionicModal, 'AddMenu.html', false);
			$ionicLoading.hide();
		});
	}
	$scope.closeModal = function(){
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': codeItem,
			'data3': 'delfolder'
		}).success(function(){
			codeItem = '';
			$scope.menu = {};
			$scope.Modal.hide();
			$scope.Modal.remove();
		});
	}
	$scope.setPic = function(img){
 		var options = {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 800,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{
					text: 'Gallery'
				},
				{
					text: 'Camera'
				}
			],
			titleText: 'Image Source',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				if(index == 0)options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
				else options.sourceType = Camera.PictureSourceType.CAMERA;
				$cordovaCamera.getPicture(options).then(function(imageData) {
					if(img == 1){
						$scope.changePic1 = {'display':'none'};
						$scope.loadingPic1 = {'display':'block'};
					}else if(img == 2){
						$scope.changePic2 = {'display':'none'};
						$scope.loadingPic2 = {'display':'block'};
					}else{
						$scope.changePic3 = {'display':'none'};
						$scope.loadingPic3 = {'display':'block'};
					}
					var url = baseUrl +"upload.php";
					var targetPath = imageData.split("/").pop();
					if(index == 0)var targetFile = targetPath.split("jpg").shift()+"jpg";
					else var targetFile = targetPath;
					var optionsUpload = {
						fileKey: "file",
						fileName: targetFile,
						chunkedMode: false,
						params : {'user':localStorage.getItem("Profile_Email").split(" ").shift(),'directory':'menu', 'target':img+'.jpg', 'codemenu':codeItem}
					};
					$cordovaFileTransfer.upload(url, imageData, optionsUpload).then(function (success) {
 						if(JSON.stringify(success.response) == '"ok"'){
							if(img == 1){
								$scope.menuImg1 = imageData;
								$scope.delPic1 = {'display':'block'};
								$scope.loadingPic1 = {'display':'none'};
							}else if(img == 2){
								$scope.menuImg2 = imageData;
								$scope.delPic2 = {'display':'block'};
								$scope.loadingPic2 = {'display':'none'};
							}else{
								$scope.menuImg3 = imageData;
								$scope.delPic3 = {'display':'block'};
								$scope.loadingPic3 = {'display':'none'};
							}
						} else {
							if(img == 1){
								$scope.changePic1 = {'display':'block'};
								$scope.loadingPic1 = {'display':'none'};
							}else if(img == 2){
								$scope.changePic2 = {'display':'block'};
								$scope.loadingPic2 = {'display':'none'};
							}else{
								$scope.changePic3 = {'display':'block'};
								$scope.loadingPic3 = {'display':'none'};
							}
							$scope.uploadAlert = {'display':'block'};
							$timeout(function() {
								$scope.uploadAlert = {'display':'none'};
							}, 3000);
						}
					});
				});
			}
		});
		$timeout(function() {
			hideSheet();
		}, 3000);
    }
	$scope.delPic = function(img){
		if(img == 1){
			$scope.delPic1 = {'display':'none'};
			$scope.loadingPic1 = {'display':'block'};
		}else if(img == 2){
			$scope.delPic2 = {'display':'none'};
			$scope.loadingPic2 = {'display':'block'};
		}else{
			$scope.delPic3 = {'display':'none'};
			$scope.loadingPic3 = {'display':'block'};
		}
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': codeItem,
			'data3': 'delimage',
			'data4': ''+img+'.jpg'
		}).success(function(result){
			if(img==1){$scope.loadingPic1 = {'display':'none'};$scope.changePic1={'display':'block'};$scope.menuImg1="img/gallery.jpg";}
			else if(img==2){$scope.loadingPic2 = {'display':'none'};$scope.changePic2={'display':'block'};$scope.menuImg2="img/gallery.jpg";}
			else{$scope.loadingPic3 = {'display':'none'};$scope.changePic3={'display':'block'};$scope.menuImg3="img/gallery.jpg";}
		});
	}
	$scope.saveMenu = function(statusForm){
		if(!statusForm){
 			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			menuService.insert({
				'data1': codeItem,
				'data2': localStorage.getItem("Profile_ID"),
				'data3': localStorage.getItem("Profile_Email").split(" ").shift(),
				'data4': $scope.menu.title,
				'data5': $scope.menu.price,
				'data6': 'insert'
			}).success(function(userd){
				$ionicLoading.hide();
				if(userd == "a"){
					$scope.alertResponse = "Database connection failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else if(userd == "b"){
					$scope.alertResponse = "Database query failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else if(userd == "c"){
					$scope.alertResponse = "File system failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else {
					$scope.closeButton = {'display':'none'};
					$scope.alertResponse = "Done!";
					$scope.alertMenu = {'display':'block','color':'#33cd5f'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none'};
						codeItem = '';
						$scope.Modal.hide();
						$scope.Modal.remove();
						$scope.doRefresh();
					}, 3000);
				}
			});
		}
	}
	$scope.delMenu = function(menu,title,folder){
		$ionicPopup.confirm({
			title: 'Delete Menu',
			template: 'Are you sure want to delete '+title+'?'
		}).then(function(res) {
			if(res) {
				$ionicLoading.show({
				  template: '<img src="img/loading.gif" width="150">'
				});
				menuService.delete({
					'data1': menu,
					'data2': localStorage.getItem("Profile_Email").split(" ").shift(),
					'data3': folder
				}).success(function(menud){
					$ionicLoading.hide();
					if(menud == "a")$ionicPopup.alert({
						title: 'Information',
						template: 'Database connection failed'});
					else if(menud == "b")$ionicPopup.alert({
						title: 'Information',
						template: 'Database query failed'});
					else if(menud == "c")$ionicPopup.alert({
						title: 'Information',
						template: 'File system failed'});
					else
						$scope.doRefresh();
				});
			}
		});
	}
})

.controller('menuIDCtrl', function($scope, $stateParams, $ionicHistory, $ionicModal, $timeout, $ionicLoading, $ionicSlideBoxDelegate, $ionicActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, menuService) {
	menuService.getMenu("detail", $stateParams.menuID, localStorage.getItem("Profile_ID"), localStorage.getItem("Profile_Email").split(" ").shift()).success(function(detail){
		$scope.images = detail.files;
		$scope.folder = detail.folder;
		$scope.files = [];
 		if(detail.numImage > 0){
			for(i=0; i<detail.numImage; i++){
				$scope.files.push({
					"src" : detail.files[i]
				})
			}
		} else {
			$scope.files.push({
				"src" : detail.files[0]
			})
		}
		$scope.mImages = detail.files;
		$scope.deletePic = [];
		$scope.changePic = [];
		$scope.loadingPic = [];
		for(i=0;i<3;i++){
			if($scope.mImages[i] == "img/gallery.jpg"){
				$scope.deletePic[i] = {'display':'none'};
				$scope.changePic[i] = {'display':'block'};
			}else{
				$scope.deletePic[i] = {'display':'block'};
				$scope.changePic[i] = {'display':'none'};
			}
		}
	});
	$scope.repeatDone = function() {
	  $ionicSlideBoxDelegate.update();
	  //$ionicSlideBoxDelegate.slide($scope.week.length - 1, 1);
	}
	$scope.menuTitle = $stateParams.menuTitle;
	$scope.menuPrice = $stateParams.menuPrice;
	$scope.editMenu = function(){
		$ionicLoading.show({
			template: ''
		});
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': $scope.folder,
			'data3': 'cachefolder',
			'data4': 'update'
		}).success(function(){
			$scope.closeButton = {'display':'block'};
			$scope.menu = {};
			$scope.menu.title = $stateParams.menuTitle;
			$scope.menu.price = Number($stateParams.menuPrice);
			showModal($scope, $ionicModal, 'EditMenu.html', false);
			$ionicLoading.hide();
		});
	}
	$scope.closeModal = function(){
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': $scope.folder,
			'data3': 'delfolder'
		}).success(function(){
			$scope.menu = {};
			$scope.Modal.hide();
			$scope.Modal.remove();
		});
	}
	$scope.updateMenu = function(statusForm){
		if(!statusForm){
 			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			menuService.insert({
				'data1': $scope.folder,
				'data2': $stateParams.menuID,
				'data3': localStorage.getItem("Profile_ID"),
				'data4': $scope.menu.title,
				'data5': $scope.menu.price,
				'data6': 'update',
				'data7': localStorage.getItem("Profile_Email").split(" ").shift()
			}).success(function(userd){
				$ionicLoading.hide();
				if(userd == "a"){
					$scope.alertResponse = "Database connection failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else if(userd == "b"){
					$scope.alertResponse = "Database query failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else if(userd == "c"){
					$scope.alertResponse = "File system failed";
					$scope.alertMenu = {'display':'block'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none','color':'#ef473a'};
					}, 3000);
				}
				else {
					$scope.closeButton = {'display':'none'};
					$scope.alertResponse = "Done!";
					$scope.alertMenu = {'display':'block','color':'#33cd5f'};
					$timeout(function() {
						$scope.alertResponse = "";
						$scope.alertMenu = {'display':'none'};
						$scope.Modal.hide();
						$scope.Modal.remove();
						$ionicHistory.goBack();
					}, 3000);
				}
			});
		}
	}
	$scope.delPic = function(index){
 		var img = index + 1;
		$scope.deletePic[index] = {'display':'none'};
		$scope.loadingPic[index] = {'display':'block'};
		menuService.cacheImage({
			'data1': localStorage.getItem("Profile_Email").split(" ").shift(),
			'data2': $scope.folder,
			'data3': 'delimage',
			'data4': ''+img+'.jpg'
		}).success(function(result){
			$scope.loadingPic[index]={'display':'none'};$scope.changePic[index]={'display':'block'};$scope.mImages[index]="img/gallery.jpg";
		});
	}
	$scope.setPic = function(indexImg){
 		var options = {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 800,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{
					text: 'Gallery'
				},
				{
					text: 'Camera'
				}
			],
			titleText: 'Image Source',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				if(index == 0)options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
				else options.sourceType = Camera.PictureSourceType.CAMERA;
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.changePic[indexImg] = {'display':'none'};
					$scope.loadingPic[indexImg] = {'display':'block'};img=indexImg+1;
					var url = baseUrl +"upload.php";
					var targetPath = imageData.split("/").pop();
					if(index == 0)var targetFile = targetPath.split("jpg").shift()+"jpg";
					else var targetFile = targetPath;
					var optionsUpload = {
						fileKey: "file",
						fileName: targetFile,
						chunkedMode: false,
						params : {'user':localStorage.getItem("Profile_Email").split(" ").shift(),'directory':'menu', 'target':img+'.jpg', 'codemenu':$scope.folder}
					};
					$cordovaFileTransfer.upload(url, imageData, optionsUpload).then(function (success) {
						$scope.loadingPic[indexImg] = {'display':'none'};
 						if(JSON.stringify(success.response) == '"ok"'){
							$scope.mImages[indexImg] = imageData;
							$scope.deletePic[indexImg] = {'display':'block'};
						} else {
							$scope.changePic[indexImg] = {'display':'block'};
							$scope.uploadAlert = {'display':'block'};
							$timeout(function() {
								$scope.uploadAlert = {'display':'none'};
							}, 3000);
						}
					});
				});
			}
		});
		$timeout(function() {
			hideSheet();
		}, 3000);
    }
})

.controller('restolistsCtrl', function($scope, $ionicPlatform, $state, $ionicPopup, $timeout, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, restoService) {
    $scope.doRefresh = function() {
		d = new Date();imagetime = d.getTime();
		restoService.getLists(keyword, keyregion).success(function(resto){
			$scope.restolists = resto;dataLength = resto.length;
			if($scope.pageSizeR >= dataLength){
				$scope.loadBtn = {display:'none'};
			}
			for(i=0;i<resto.length;i++){
				for (r = 0; r < regions.length; r++) {
					if(regions[r].code == resto[i]['region']){
						$scope.restolists[i]['Tregion'] = regions[r].name;break;
					}
				}
				$scope.restolists[i]['file'] = baseUrl+'media/'+resto[i]['email']+'/profile.jpg?'+imagetime;
				if(resto[i]['open'] == 0){
					$scope.off[i] = '(close)';
				}else{
					$scope.off[i] = '';
				}
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
	}
	$ionicPlatform.ready(function() {
		$scope.currentPage = 1;
		$scope.pageSizeR = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
		findR = "";
		var d;var imagetime;
		$scope.off = [];
		$scope.doRefresh();
	});
	$scope.loadNextPage = function(){
		$scope.currentPage++;
		$scope.pageSizeR = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageSizeR >= dataLength){
			$scope.loadBtn = {display:'none'};
		}
	}
	$scope.refreshIndex = function(value1,value2){
		d = new Date();imagetime = d.getTime();
		restoService.getLists('refresh', value2).success(function(resto){
			$scope.restolists[value1] = resto;
			for (r = 0; r < regions.length; r++) {
				if(regions[r].code == resto['region']){
					$scope.restolists[value1]['Tregion'] = regions[r].name;break;
				}
			}
			$scope.restolists[value1]['file'] = baseUrl+'media/'+resto['email']+'/profile.jpg?'+imagetime;
			if(resto['open'] == 0){
				$scope.off[value1] = '(close)';
			}else{
				$scope.off[value1] = '';
			}
		})
	}
	$scope.detailResto = function(value){
		if($scope.restolists[value]['open'] == 0){
			$scope.isclose = '(close)';
			$scope.isdisabled = 'disabled';
		}else{
			$scope.isclose = '';
			$scope.isdisabled = '';
		}
		$scope.restoID = $scope.restolists[value]['id'];
		$scope.email = $scope.restolists[value]['email'];
		$scope.title = $scope.restolists[value]['name'];
		$scope.photo = $scope.restolists[value]['file'];
		$scope.phone = $scope.restolists[value]['phone'];
		$scope.whatsapp = $scope.restolists[value]['whatsapp'];
		$scope.fulladdress = $scope.restolists[value]['address'];
		$scope.states = $scope.restolists[value]['Tregion'];
		showModal($scope, $ionicModal, 'restoID.html', true);
	}
	$scope.refreshG = function() {
		restoService.getAlbum("gallery",$scope.restoID,$scope.email).success(function(gallery){
			$scope.photos = gallery;dataLength = gallery.length;
			if($scope.pageG >= dataLength){
				$scope.loadG = {display:'none'};
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
		});
	}
	$scope.openGallery = function(){
		$scope.currentPage = 1;
		$scope.pageG = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		showModal($scope, $ionicModal, 'galleryID.html', true);
		$scope.refreshG();
	}
	$scope.nextGallery = function(){
		$scope.currentPage++;
		$scope.pageG = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageG >= dataLength){
			$scope.loadG = {display:'none'};
		}
	}
	$scope.refreshV = function() {
		restoService.getAlbum("video",$scope.restoID,$scope.email).success(function(video){
			$scope.videos = video;dataLength = video.length;
			if($scope.pageV >= dataLength){
				$scope.loadV = {display:'none'};
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
		});
	}
	$scope.openVideo = function(){
		$scope.currentPage = 1;
		$scope.pageV = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		showModal($scope, $ionicModal, 'videoID.html', true);
		$scope.refreshV();
	}
	$scope.nextVideo = function(){
		$scope.currentPage++;
		$scope.pageV = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageV >= dataLength){
			$scope.loadV = {display:'none'};
		}
	}
	$scope.closeModal = function(index){
		if(index == 1){
			$scope.Modal.hide();
			$scope.Modal.remove();
		}else if(index == 2){
			$scope.pickorder = [];
			for (i = 0; i < $scope.restomenus.length; i++) {
				$scope.restomenus[i]['filled'] = 'ion-ios-circle-outline';
			}
			$scope.ModalMenu.hide();
			$scope.ModalMenu.remove();
		}else if(index == 3){
			$scope.ModalGallery.hide();
			$scope.ModalGallery.remove();
		}else if(index == 4){
			$scope.ModalVideo.hide();
			$scope.ModalVideo.remove();
		}else{
			$scope.ModalMenuDetail.hide();
			$scope.ModalMenuDetail.remove();
		}
	}
	$scope.order = function(){
		restoService.getLists('menu', $scope.restoID, $scope.email).success(function(menu){
			$scope.restomenus = menu;
			$scope.pickorder = [];
			for (i = 0; i < menu.length; i++) {
				$scope.restomenus[i]['filled'] = 'ion-ios-circle-outline';
			}
			showModal($scope, $ionicModal, 'one.html', true);
        });
	}
	$scope.pickMenu = function(value1,value2){
		if($scope.restomenus[value1]['filled'] == 'ion-ios-circle-filled'){
			position = $scope.pickorder.indexOf(value2);
			$scope.pickorder.splice(position,1);
			$scope.restomenus[value1]['filled'] = 'ion-ios-circle-outline';
		}else{
			$scope.pickorder.push(value2);
			$scope.restomenus[value1]['filled'] = 'ion-ios-circle-filled';
		}
	}
	$scope.detailMenu = function(value){
		$scope.menufiles = [];
		$scope.indexTitle = $scope.restomenus[value]["name"];
		if($scope.restomenus[value]['numImage'] == 0)
			$scope.menufiles.push($scope.restomenus[value]["files"][0]);
		else{
			for(i=0;i<$scope.restomenus[value]['numImage'];i++){
				$scope.menufiles.push($scope.restomenus[value]["files"][i]);
			}
		}
		if($scope.restomenus[value]["description"] == null)
			$scope.indexDescription = 'nothing desctiption..';
		else
			$scope.indexDescription = $scope.restomenus[value]["description"];
		showModal($scope, $ionicModal, 'two.html', true);
	}
	$scope.repeatDone = function() {
	  $ionicSlideBoxDelegate.update();
	}
	$scope.orderNow = function(){
		if($scope.pickorder.length<1){
			$ionicPopup.alert({
				title: 'Information',
				template: 'You have not picked the menu'});
		}else{
  			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			restoService.createOrder('order', localStorage.getItem("Profile_ID"), $scope.restoID, $scope.pickorder).success(function(queue){
				$ionicLoading.hide();
				if(queue == 'q'){
					$ionicPopup.alert({
						title: 'Information',
						template: 'You have create order in these Resto, please check your order lists to update!'});
				}else{
					$ionicPopup.alert({
						title: 'Information',
						template: 'You are in the queue to '+queue});
				}
				$scope.pickorder = [];
				for (i = 0; i < $scope.restomenus.length; i++) {
					$scope.restomenus[i]['filled'] = 'ion-ios-circle-outline';
				}
				$scope.ModalMenu.hide();
				$scope.ModalMenu.remove();
			});
		}
	}
})

.controller('queueCtrl', function($scope, $ionicPlatform, $ionicModal, restoService) {
	$ionicPlatform.ready(function() {
		var d = new Date();var imagetime = d.getTime();
		restoService.queueLists(localStorage.getItem("Profile_ID")).success(function(queue){
   			$scope.queuelists = queue;
			for(i=0;i<queue.length;i++){
				$scope.queuelists[i]['file'] = baseUrl+'media/'+queue[i]['email']+'/profile.jpg?'+imagetime;
			}
		})
	});
	$scope.checkmenu = function(value){
		d = new Date();imagetime = d.getTime();
		$scope.orderlists = $scope.queuelists[value]['menu'];
		showModal($scope, $ionicModal, 'orderMenu.html', true);
	}
	$scope.closeModal = function(){
		$scope.Modal.hide();
		$scope.Modal.remove();
	}
	$scope.refreshIndex = function(index){
		restoService.queueID('queueID',localStorage.getItem("Profile_ID")).success(function(queue){
   			$scope.queuelists[index]['queue'] = queue['position'];
		})
	}
})
.controller('openCtrl', function($scope, $state, $ionicPlatform, $ionicHistory, restoService) {
	$ionicPlatform.ready(function() {
		restoService.setOpen("open",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift()).success(function(queue){
 			if(queue.length > 0){
				$scope.noQue = queue[0]['sumRow']+' queues';
				$scope.picQue = baseUrl+'media/'+queue[0]['email']+'/profile.jpg?'+ new Date().getTime();
				$scope.nameQue = queue[0]['name'];
				$scope.phoneQue = queue[0]['phone'];
				$scope.orderQue = queue[0]['menuorder'];
				$scope.orderID = queue[0]['id'];
				$scope.nextBtn = {'display':'block'};
			}else{
				$scope.noQue = "0 Queue";
				$scope.nameQue = "";
				$scope.phoneQue = "";
				$scope.orderQue = "";
				$scope.nextBtn = {'display':'none'};
			}
		});
	})
	$scope.nextQ = function(id){
 		restoService.nextQue("next",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift(),id).success(function(queue){
 			if(queue.length > 0){
				$scope.noQue = queue[0]['sumRow']+' queues';
				$scope.picQue = baseUrl+'media/'+queue[0]['email']+'/profile.jpg?'+ new Date().getTime();
				$scope.nameQue = queue[0]['name'];
				$scope.phoneQue = queue[0]['phone'];
				$scope.orderQue = queue[0]['menuorder'];
				$scope.orderID = queue[0]['id'];
				$scope.nextBtn = {'display':'block'};
			}else{
				$scope.noQue = "0 Queue";
				$scope.picQue = "";
				$scope.nameQue = "";
				$scope.phoneQue = "";
				$scope.orderQue = "";
				$scope.orderID = "";
				$scope.nextBtn = {'display':'none'};
			}
		})
	}
	$scope.refreshQue = function(){
		restoService.setOpen("open",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift()).success(function(queue){
 			if(queue.length > 0){
				$scope.noQue = queue[0]['sumRow']+' queues';
				$scope.picQue = baseUrl+'media/'+queue[0]['email']+'/profile.jpg?'+ new Date().getTime();
				$scope.nameQue = queue[0]['name'];
				$scope.phoneQue = queue[0]['phone'];
				$scope.orderQue = queue[0]['menuorder'];
				$scope.orderID = queue[0]['id'];
				$scope.nextBtn = {'display':'block'};
			}else{
				$scope.noQue = "0 Queue";
				$scope.nameQue = "";
				$scope.phoneQue = "";
				$scope.orderQue = "";
				$scope.nextBtn = {'display':'none'};
			}
		});		
	}
	$scope.closeQue = function(){
		restoService.setOpen("close",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift()).success(function(queue){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('app', {}, {reload:true});
		});
	}
})
.controller('galleryCtrl', function($scope, $state, $timeout, $ionicPlatform, $ionicPopup, $ionicModal, $ionicLoading, $ionicActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, restoService) {
    $scope.doRefresh = function() {
		restoService.getAlbum("gallery",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift()).success(function(gallery){
			$scope.photos = gallery;dataLength = gallery.length;
			if($scope.pageSizeG >= dataLength){
				$scope.loadBtn = {display:'none'};
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
	$ionicPlatform.ready(function() {
		$scope.currentPage = 1;
		$scope.pageSizeG = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
		$scope.doRefresh();
	});
	$scope.loadNextPage = function(){
		$scope.currentPage++;
		$scope.pageSizeG = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageSizeG >= dataLength){
			$scope.loadBtn = {display:'none'};
		}
	}
	$scope.addPhoto = function(){
		$scope.photo = {};
		$scope.photoImg = 'img/gallery.jpg';
		showModal($scope, $ionicModal, 'addPhoto.html', true);
	}
	$scope.closeModal = function(){
		$scope.Modal.hide();
		$scope.Modal.remove();
	}
	$scope.setPic = function(){
		var options = {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 800,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};

		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{
					text: 'Gallery'
				},
				{
					text: 'Camera'
				}
			],
			titleText: 'Image Source',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				if(index == 0)options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
				else options.sourceType = Camera.PictureSourceType.CAMERA;
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.changePic={'display':'none'};
					$scope.loadingPic={'display':'block'};
					var url = baseUrl +"upload.php";
					var targetPath = imageData.split("/").pop();
					if(index == 0)var targetFile = targetPath.split("jpg").shift()+"jpg";
					else var targetFile = targetPath;
					var optionsUpload = {
						fileKey: "file",
						fileName: targetFile,
						chunkedMode: false,
						params : {'user':localStorage.getItem("Profile_Email").split(" ").shift(), 'directory':'gallery', 'fileName':targetFile}
					};
					$cordovaFileTransfer.upload(url, imageData, optionsUpload).then(function (success) {
						$scope.loadingPic={'display':'none'};
						$scope.changePic={'display':'block'};
 						if(JSON.stringify(success.response) == '"error"'){
							$scope.uploadAlert = {'display':'block'};
							$timeout(function() {
								$scope.uploadAlert = {'display':'none'};
							}, 3000);
						} else {
							$scope.photoImg = imageData;
							$scope.photoFile = JSON.stringify(success.response).replace(/\"/g, "");
						}
					});
				});
			}
		});
		$timeout(function() {
			hideSheet();
		}, 3000);
    }
	$scope.savePhoto = function(file){
		if(file != '' && file != 'undefined' && file != null){
			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			restoService.saveAlbum("saveGallery",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift(),file,$scope.photo.title).success(function(gallery){
				$ionicLoading.hide();
				if(gallery == "a")$ionicPopup.alert({
					title: 'Information',
					template: 'Database connection failed'});
				else if(gallery == "b")$ionicPopup.alert({
					title: 'Information',
					template: 'Database query failed'});
				else if(gallery == "c")$ionicPopup.alert({
					title: 'Information',
					template: 'File system failed'});
				else{
					file = '';
					$ionicPopup.alert({
						title: 'Information',
						template: 'Done'});
					$scope.doRefresh();
					$scope.Modal.hide();
					$scope.Modal.remove();
				}
			});
		}
	}
 	$scope.delPic = function(index){
		restoService.delAlbum("delGallery",index).success(function(gallery){
			$scope.doRefresh();
		});
	}
})
.controller('videoCtrl', function($scope, $state, $ionicPlatform, $timeout, $ionicPopup, $ionicModal, $ionicLoading, restoService) {
	$scope.doRefresh = function() {
		$scope.url = {};
		restoService.getAlbum("video",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift()).success(function(video){
			$scope.videos = video;dataLength = video.length;
			if($scope.pageSizeV >= dataLength){
				$scope.loadBtn = {display:'none'};
			}
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
	$ionicPlatform.ready(function(){
		$scope.currentPage = 1;
		$scope.pageSizeV = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
		$scope.doRefresh();
	});
	$scope.loadNextPage = function(){
		$scope.currentPage++;
		$scope.pageSizeV = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
		if($scope.pageSizeV >= dataLength){
			$scope.loadBtn = {display:'none'};
		}
	}
	$scope.addVideo = function(){
		if($scope.url.video != '' && $scope.url.video != 'undefined' && $scope.url.video != null){
  			$ionicLoading.show({
			  template: '<img src="img/loading.gif" width="150">'
			});
			restoService.saveAlbum("saveVideo",localStorage.getItem("Profile_ID"),localStorage.getItem("Profile_Email").split(" ").shift(),$scope.url.video, '').success(function(video){
				$ionicLoading.hide();
 				if(video.substring(0,1) == "a")$ionicPopup.alert({
					title: 'Information',
					template: 'Database connection failed'});
				else if(video.substring(0,1) == "b")$ionicPopup.alert({
					title: 'Information',
					template: 'Video ID is undefined'});
				else if(video.substring(0,1) == "c")$ionicPopup.alert({
					title: 'Information',
					template: 'Database query failed'});
				else {
					$scope.url = {};
					$scope.doRefresh();
				}
			});
		}
	}
 	$scope.delVideo = function(index){
		restoService.delAlbum("delVideo",index).success(function(video){
			$scope.doRefresh();
		});
	}
})
