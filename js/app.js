angular.module('myApp', [])
    .controller('mainController', function ($scope) {
        $scope.isValid = false;
        $scope.clr = '#e0e0e0';
        $scope.max_length = 19;
        $scope.card_number = '';
        // Setting the border of input box according to the valid status of card number entered
        $scope.onBlur =function () {
            if($scope.isValid){
                $scope.clr = '#e0e0e0';
            }
            else{
                $scope.clr = '#F44336'; // red for invalid card
            }
        };
        $scope.onFocus = function() {
                $scope.clr = '#e0e0e0';
        };
    })
    .filter('validate', [function () {
        return function (card_number,scope) {
            var result;
            if (!card_number) {
                return 'icons/d_c.png';
            }
            //restriction the input field to numbers only
            scope.card_number = card_number.toString().replace(/\D+|\s+/g, "");

            //luhn Algorithm
            var nCheck = 0, nDigit = 0, bEven = false;
            for (var n = card_number.length - 1; n >= 0; n--) {
                var cDigit = card_number.charAt(n),
                    nDigit = parseInt(cDigit, 10);

                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            scope.isValid = ((nCheck % 10) == 0);

            if(/^(34)|^(37)/.test(card_number)) {
                scope.max_length = 15;
                result = 'icons/a_e.png'; // American Express Card
            }
            else if(/^(62)|^(88)/.test(card_number)) {
                scope.max_length = 19;
                result = 'icons/c_u_p.png'; //China Union Pay card
            }
            else if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(card_number)) {
                scope.max_length = 19;
                result = 'icons/m.png'; //Maestro card
            }
            else if(/^5[1-5]/.test(card_number)) {
                scope.max_length = 16;
                result = 'icons/m_c.png'; // Master card
            }
            else if (/^4/.test(card_number)) {
                scope.max_length = 19;
                result = 'icons/v.png'; // Visa card
            }
            else{
                scope.max_length = 19;
                result = 'icons/d_c.png';
            }
            return result;
        };
    }]);