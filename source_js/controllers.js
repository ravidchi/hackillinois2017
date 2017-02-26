/* Sample Controller */
app.controller('registerController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {

	$window.sessionStorage.addAccount = false;
	$window.sessionStorage.deposit = false;
	$window.sessionStorage.transfer = false;
	$window.sessionStorage.shop = false;

    //reinitialize foundation for abide to work
    $(document).foundation();

    $scope.SendData = function () {
       	//create user data
        var userData = {
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            address: {
	            street_number: $scope.street_number,
	            street_name: $scope.street_name,
	            city: $scope.city,
	            state: $scope.state,
	            zip: $scope.zip
	        }
        };
    	
    	$http.post('http://api.reimaginebanking.com/customers?key=56a14375bc82dcf2074006ec514249b3', userData).
		success(function(response) {
			//console.log(response);
			$location.url('/customer/' + response.objectCreated._id);
		}).error(function(err) {
			console.log(err);
		});
    };

}]);

app.controller('customerController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
	$scope.customerID = $routeParams.customerID;

	$scope.addAccount = $window.sessionStorage.addAccount;
	$scope.deposit = $window.sessionStorage.deposit;
	$scope.transfer = $window.sessionStorage.transfer;
	$scope.shop = $window.sessionStorage.shop;

	$http.get('http://api.reimaginebanking.com/customers/' +$scope.customerID+ '?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.customer = response
	  	//console.log($scope.customer);
	}).
	error(function(err) {
	  	console.log("error");
	});

	$http.get('http://api.reimaginebanking.com/customers/' +$scope.customerID+ '/accounts?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.accounts = response
	  	//console.log($scope.accounts);
	}).
	error(function(err) {
	  	console.log("error");
	});
	
}]);

app.controller('addController', ['$scope', '$http', '$routeParams', '$location', '$window', function($scope, $http, $routeParams, $location, $window) {
	$scope.customerID = $routeParams.customerID;

	//reinitialize foundation for abide to work
    $(document).foundation();

    $scope.addAccount = function () {
       	//create user data
        var accountData = {
            type: $scope.type,
            nickname: $scope.nickname,
            rewards: 0,
            balance: 0
        };

    	
    	$http.post('http://api.reimaginebanking.com/customers/' +$scope.customerID+ '/accounts?key=56a14375bc82dcf2074006ec514249b3', accountData).
		success(function(response) {
			//console.log(response);
			$window.sessionStorage.addAccount = true;
			$location.url('/customer/' + $scope.customerID);
		}).error(function(err) {
			console.log(err);
		});
    };
}]);

app.controller('accountController', ['$scope', '$http', '$routeParams', '$location', '$window', function($scope, $http, $routeParams, $location, $window) {
	$scope.customerID = $routeParams.customerID;
	$scope.accountID = $routeParams.accountID;

	//deposits
	$http.get('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '/purchases?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.purchases = response;
	}).
	error(function(err) {
	  	console.log("error");
	});

	//deposits
	$http.get('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '/deposits?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.deposits = response;
	}).
	error(function(err) {
	  	console.log("error");
	});

	//transfers
	$http.get('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '/transfers?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.transfers = response;
	}).
	error(function(err) {
	  	console.log("error");
	});	

	//account details
	$http.get('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.account = response
	}).
	error(function(err) {
	  	console.log("error");
	});

    $scope.deleteAccount = function () {
    	
    	$http.delete('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '?key=56a14375bc82dcf2074006ec514249b3')
    	.success(function(response) {
			$location.url('/customer/' + $scope.customerID);
		}).error(function(err) {
			console.log(err);
		});
    };	

}]);

app.controller('depositController', ['$scope', '$http', '$routeParams', '$location', '$window', function($scope, $http, $routeParams, $location, $window) {
	$scope.customerID = $routeParams.customerID;
	$scope.accountID = $routeParams.accountID;
	var d = new Date();

	//reinitialize foundation for abide to work
    $(document).foundation();	

	$http.get('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.account = response
	}).
	error(function(err) {
	  	console.log("error");
	});


    $scope.deposit = function () {
       	//create user data
        var depositData = {
            medium: "balance",
            transaction_date: d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(),
            amount: $scope.amount,
            description: $scope.description
        };
 	
    	$http.post('http://api.reimaginebanking.com/accounts/' +$scope.accountID+ '/deposits?key=56a14375bc82dcf2074006ec514249b3', depositData).
		success(function(response) {
			//console.log(response);
			$window.sessionStorage.deposit = true;
			$location.url('/customer/' + $scope.customerID + '/' + $scope.accountID);
		}).error(function(err) {
			console.log(err);
		});
    };

}]);

app.controller('transferController', ['$scope', '$http', '$routeParams', '$location', '$window', function($scope, $http, $routeParams, $location, $window) {
	$scope.customerID = $routeParams.customerID;
	$scope.accountID = $routeParams.accountID;
	var d = new Date();
	var curr_date = d.getDate();

	//reinitialize foundation for abide to work
    $(document).foundation();	

	$http.get('http://api.reimaginebanking.com/customers/' +$scope.customerID+ '/accounts?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.accounts = response;
		//console.log($scope.accounts);
	}).
	error(function(err) {
	  	console.log("error");
	});


	$scope.transfer = function () {
       	//create user data
        var transferData = {
            medium: "balance",
            payee_id: $scope.destination._id,
            amount: $scope.amount,
            description: $scope.description
        };
 
 	
    	$http.post('http://api.reimaginebanking.com/accounts/' +$scope.source._id+ '/transfers?key=56a14375bc82dcf2074006ec514249b3', transferData).
		success(function(response) {
			//console.log(response);
			$window.sessionStorage.transfer = true;
			$location.url('/customer/' + $scope.customerID);
		}).error(function(err) {
			console.log(err);
		});
    };
    

}]);

app.controller('shopController', ['$scope', '$http', '$routeParams', '$location', '$window', function($scope, $http, $routeParams, $location, $window) {
	$scope.customerID = $routeParams.customerID;
	var d = new Date();

	$http.get('http://api.reimaginebanking.com/customers/' +$scope.customerID+ '/accounts?key=56a14375bc82dcf2074006ec514249b3').
	success(function(response) {
		$scope.accounts = response;
	}).
	error(function(err) {
	  	console.log("error");
	});

    $scope.purchase = function (item, price) {
       	//create user data
        var purchaseData = {
            merchant_id: "58b257951756fc834d905d3d",
            medium: "balance",
            purchase_date: d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(),
            amount: price,
            description: item
        };


    	$http.post('http://api.reimaginebanking.com/accounts/' +$scope.source._id+ '/purchases?key=56a14375bc82dcf2074006ec514249b3', purchaseData).
		success(function(response) {
			//console.log(response);
			$window.sessionStorage.shop = true;
			$location.url('/customer/' + $scope.customerID);
		}).error(function(err) {
			console.log(err);
		});
    };

}]);