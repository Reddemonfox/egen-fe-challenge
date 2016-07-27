angular.module('myApp', [])
    .controller('mainController', function ($scope) {
        $scope.isValid = false;
        $scope.clr = '#e0e0e0';
        // Setting the border of input box according to the valid status of card number entered
        $scope.onBlur =function () {
            if($scope.isValid){
                $scope.clr = '#e0e0e0';
            }
            else{
                $scope.clr = '#F44336'; // red for invalid card
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
            //check the validity using luhn algo
            if (sum % 10 === 0 && sum > 0) {
                scope.isValid = true;
            } else {
                scope.isValid =false;
            }

            if(/^(34)|^(37)/.test(ccnumber)) {
                result = 'icons/a_e.png'; // American Express Card
            }
            else if(/^(62)|^(88)/.test(ccnumber)) {
                result = 'icons/c_u_p.png'; //China Union Pay card
            }
            else if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(ccnumber)) {
                result = 'icons/m.png'; //Maestro card
            }
            else if(/^5[1-5]/.test(ccnumber)) {
                result = 'icons/m_c.png'; // Master card
            }
            else if (/^4/.test(ccnumber)) {
                result = 'icons/v.png'; // Visa card
            }
            else{
                result = 'icons/d_c.png';
            }
            return result;
        };
    }]);