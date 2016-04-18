angular.module('starter.services', [])

.factory('userService', function($http) {
    return {
        create: function (userdata){
            return $http.post(baseUrl+'submituser.php',userdata,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (datauser){
            return $http.post(baseUrl+'updateuser.php',datauser,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        resetpassword: function (email){
            return $http.post(baseUrl+'forgot.php',email,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        login: function (logindata){
            return $http.post(baseUrl+'login.php',logindata,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        }
    };    
})
.factory('menuService', function($http) {
    return {
        cacheImage: function (cache){
            return $http.post(baseUrl+'cacheimage.php',cache,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        insert: function (menu){
            return $http.post(baseUrl+'submitmenu.php',menu,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function (code){
            return $http.post(baseUrl+'delmenu.php',code,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        getMenu: function (data1, data2, data3, data4){
			return $http.get(baseUrl+'getmenu.php?data1='+data1+'&data2='+data2+'&data3='+data3+'&data4='+data4);
        }
    };    
})
.factory('restoService', function($http) {
    return {
        getLists: function (data1, data2, data3){
			return $http.get(baseUrl+'getresto.php?data1='+data1+'&data2='+data2+'&data3='+data3);
        },
        createOrder: function (data1, data2, data3, data4){
			return $http.get(baseUrl+'createorder.php?data1='+data1+'&data2='+data2+'&data3='+data3+'&data4='+data4);
        },
        queueLists: function (data1){
			return $http.get(baseUrl+'queue.php?data1='+data1);
        },
        queueID: function (data1,data2,data3){
			return $http.get(baseUrl+'queue.php?data1='+data1+'&data2='+data2);
        },
        setOpen: function (data1, data2, data3){
			return $http.get(baseUrl+'queue.php?data1='+data1+'&data2='+data2+'&data3='+data3);
        },
		getAlbum: function (data1, data2, data3){
			return $http.get(baseUrl+'getresto.php?data1='+data1+'&data2='+data2+'&data3='+data3);
        },
		saveAlbum: function (data1, data2, data3, data4, data5){
			return $http.get(baseUrl+'getresto.php?data1='+data1+'&data2='+data2+'&data3='+data3+'&data4='+data4+'&data5='+data5);
        },
		delAlbum: function (data1, data2){
			return $http.get(baseUrl+'getresto.php?data1='+data1+'&data2='+data2);
        },
        nextQue: function (data1, data2, data3, data4){
			return $http.get(baseUrl+'queue.php?data1='+data1+'&data2='+data2+'&data3='+data3+'&data4='+data4);
        }
    };    
})