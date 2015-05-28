/**
 * This Module create a Service named auth and a directive named tdIsAuth
 * @param {Object} ngModule
 */
module.exports = function (ngModule) {

    /**
     * Service for handling auth
     */
    ngModule.factory('auth', ['$q', '$http', '$window', 'constants', function ($q, $http, $window, constants) {

        var currentuser;

        try {
            currentuser = JSON.parse($window.localStorage.getItem('user'));
        } catch(err) {
            currentuser = null;
        }

        return {
            login: function (username, password) {
                /**
                 * @return {Promise}
                 */
                return $q(function (resolve, reject) {

                    $http.post(constants.loginurl, {
                        username: username, password: password
                    }).success(function (data, status) {
                        console.log(data);
                        var isObject = angular.isObject(data);

                        if (!isObject || !angular.isArray(data.data) || data.data.length !== 1 || !angular.isNumber(data.data[0].id)) {
                            reject({
                                name: 'unkown', message: 'Invalid data received from server'
                            });
                            return;
                        } else {
                            currentuser = data.data[0];
                            console.log(currentuser);
                            $window.localStorage.setItem('user', JSON.stringify(currentuser));

                            resolve(currentuser);
                        }

                    }).error(function (data, status) {
                        if (status === 401 || status == 403) {
                            reject({
                                name: 'AuthError', message: 'Login failed. Please check your login data'
                            });
                        } else if (status === 500) {
                            reject({
                                name: 'ServerError', message: 'The anwser from the server was invalid. Please try again'
                            });
                        } else if (data && data.error) {
                            reject(data.error);
                        } else {
                            reject({
                                name: 'UnkownError',
                                message: 'Invalid data received from server or server did not respond'
                            });
                        }
                    });
                });
            }, /**
             * Logsout user
             * @returns {Promise}
             */
            logout: function () {
                return $q(function (resolve, reject) {

                    // ==========================================================================
                    // Remove user from localstorage in any case
                    // ==========================================================================
                    $window.localStorage.removeItem('user');

                    currentuser = null;

                    $http.post(constants.logouturl).success(function (data, status) {
                        // ==========================================================================
                        // If the was no logged in user we are good anyway
                        // ==========================================================================
                        if (status === 403) {
                            resolve();
                            return;
                        }

                        // ==========================================================================
                        // We are logged out
                        // ==========================================================================
                        if (angular.isObject(data) && data.success) {
                            resolve();
                            return;
                        }

                        reject({
                            name: 'unkown', message: 'Logging out from server failed'
                        });

                    }).error(function (data) {
                        if (data && data.error) {
                            reject(data.error);
                        } else {
                            reject({
                                name: 'unkown', message: 'Logging out from server failed. Because of a Server error'
                            });
                        }
                    });
                });
            }, currentUser: function () {
                return currentuser;
            }, isLoggedIn: function () {
                if (currentuser) {
                    return true;
                }
                return false;
            }
        }
    }]);

    /**
     * Depending on auth state this directive hides or shows an linked element
     */
    ngModule.directive('tdIsAuth', [ 'auth', function ( auth ) {

        function link ( $scope, $element, attributes ) {
            /**
             * Hides or shows the element
             * @param {boolean} show
             */
            function visisible(show){
                if (show) {
                    $element.removeClass('ng-hide');
                } else {
                    $element.addClass('ng-hide');
                }
            }

            visisible(auth.isLoggedIn());

            $scope.$watch(auth.isLoggedIn,
                function(newValue, oldValue){
                    visisible(newValue);
                }
            );
        }

        /**
         * Hides or shows the element
         * @param {boolean} show
         */
        function visisible(show){
            if (show) {
                element.hide();
            } else {
                element.show();
            }
        }

        // Return the directive configuration.
        return {
            link: link,
            restrict: "A"
        };
    }]);
};
