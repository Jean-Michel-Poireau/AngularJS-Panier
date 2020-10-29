(function(){

	var app = angular.module('store', ['ngCookies']);

	app.controller('StoreController', ['$scope','$cookies', function($scope,$cookies){
	
		$scope.products = productsData;
		$scope.cart = [];
	  $scope.total = 0;

		
		if(!angular.isUndefined($cookies.get('total'))){
		  $scope.total = parseFloat($cookies.get('total'));
		}

		if (!angular.isUndefined($cookies.get('cart'))) {
		 		$scope.cart =  $cookies.getObject('cart');
		}
		
		$scope.addItemToCart = function(product){
		  
		 	if ($scope.cart.length === 0){
		 		product.count = 1;
		 		$scope.cart.push(product);
		 	} else {
		 		var repeat = false;
		 		for(var i = 0; i< $scope.cart.length; i++){
		 			if($scope.cart[i].id === product.id){
		 				repeat = true;
		 				$scope.cart[i].count +=1;
		 			}
		 		}
		 		if (!repeat) {
		 			product.count = 1;
		 		 	$scope.cart.push(product);	
		 		}
		 	}
		 	var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
		 	$cookies.putObject('cart', $scope.cart,  {'expires': expireDate});
		 	$scope.cart = $cookies.getObject('cart');
		 
		  $scope.total += parseFloat(product.price);
      $cookies.put('total', $scope.total,  {'expires': expireDate});
		 };

		 $scope.removeItemCart = function(product){
		   
		   if(product.count > 1){
		     product.count -= 1;
		     var expireDate = new Date();
         expireDate.setDate(expireDate.getDate() + 1);
		     $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			   $scope.cart = $cookies.getObject('cart');
		   }
		   else if(product.count === 1){
		     var index = $scope.cart.indexOf(product);
 			 $scope.cart.splice(index, 1);
 			 expireDate = new Date();
       expireDate.setDate(expireDate.getDate() + 1);
 			 $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			 $scope.cart = $cookies.getObject('cart');
		     
		   }
		   
		   $scope.total -= parseFloat(product.price);
       $cookies.put('total', $scope.total,  {'expires': expireDate});
		   
		 };

	}]);

	var productsData = [{
		id: 1,
		name: 'Yaourt nature',
		price: 10.00,
	},{
		id: 2,
		name: 'Yaourt bio',
		price: 15.50,
	},{
		id: 3,
		name: 'Yaourt pimenté',
		price: 47.99,
		image: ''
	},{
		id: 4,
		name: 'Yaourt salé',
		price: 100.00,
	}];

})();