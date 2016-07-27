angular.module('myApp', [])
    .controller('mainController', function ($scope) {
        $scope.isValid = false;
        $scope.clr = '#e0e0e0';

        $scope.onBlur =function () {
            if($scope.isValid){
                $scope.clr = '#e0e0e0';
            }
            else{
                $scope.clr = '#F44336';
            }
        }
        $scope.onFocus = function() {
                $scope.clr = '#e0e0e0';
        }
    })
    .filter('validate', [function () {
        return function (ccnumber,scope) {
            var result,valid;
            if (!ccnumber) {
                return 'icons/d_c.png';
            }
            ccnumber = ccnumber.toString().replace(/\s+/g, '');
            var len = ccnumber.length;
            var cardType;
                mul = 0,
                prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                sum = 0;
            while (len--) {
                sum += prodArr[mul][parseInt(ccnumber.charAt(len), 10)];
                mul ^= 1;
            }
            if (sum % 10 === 0 && sum > 0) {
                scope.isValid = true;
            } else {
                scope.isValid =false;
            }

            if(/^(34)|^(37)/.test(ccnumber)) {
                cardType = "American Express";
                result = 'icons/a_e.png';
            }
            else if(/^(62)|^(88)/.test(ccnumber)) {
                cardType = "China UnionPay";
                result = 'icons/c_u_p.png';
            }
            else if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(ccnumber)) {
                cardType = "Maestro";
                result = 'icons/m.png';
            }
            else if(/^5[1-5]/.test(ccnumber)) {
                cardType = "MasterCard";
                result = 'icons/m_c.png';
            }
            else if (/^4/.test(ccnumber)) {
                cardType = "Visa"
                result = 'icons/v.png';
            }
            else{
                result = 'icons/d_c.png';
            }
            return result;
        };
    }]);