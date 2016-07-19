var app = angular.module("mainApp", []);
app.controller("mainCtrl", function($scope, $http) {
	$http.get("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
	.then(function(response) {
		$scope.waluty = response.data;
		var zloty = {
			currency: "złoty polski",
			code: "PLN",
			mid: 1
		}
		$scope.waluty[0].rates.push(zloty);
	});
	$scope.calc = function() {
		if($scope.w1 != '' && $scope.w2 != '' && $scope.value != undefined) {
			var w1 = $scope.waluty[0].rates[$scope.w1];
			var w2 = $scope.waluty[0].rates[$scope.w2];
			var wartosc = (w1.mid * $scope.value / w2.mid).toFixed(3);
			$scope.wynik = Number($scope.value).toFixed(3) + " " + w1.code + " jest warte " + wartosc + " " + w2.code;
		} else {
			$scope.wynik = "Wypełnij wszystkie pola!";
		}
	}
	$scope.changePosition = function() {
		var temp = $scope.w1;
		$scope.w1 = $scope.w2;
		$scope.w2 = temp;
		$scope.calc();
	}
});
