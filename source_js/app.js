var app = angular.module('mp3',['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/register.html",
        controller : "registerController"
    })
    .when("/register", {
        templateUrl : "partials/register.html",
        controller : "registerController"
    })
    .when("/customer/:customerID", {
        templateUrl : "partials/customer.html",
        controller : "customerController"
    })
    .when("/customer/:customerID/add", {
        templateUrl : "partials/add.html",
        controller : "addController"
    })
    .when("/customer/:customerID/shop", {
        templateUrl : "partials/shop.html",
        controller : "shopController"
    })        
    .when("/customer/:customerID/transfer", {
        templateUrl : "partials/transfer.html",
        controller : "transferController"
    })       
    .when("/customer/:customerID/:accountID", {
        templateUrl : "partials/account.html",
        controller : "accountController"
    })
    .when("/customer/:customerID/:accountID/deposit", {
        templateUrl : "partials/deposit.html",
        controller : "depositController"
    })         
    .otherwise({
    	redirecTo: '/'
    })
});
