/**
 * Created by Christian on 5/24/2015.
 */

module.exports = function(ngModule){

    ngModule.factory('auth', ['$q', '$http', '$window','constants', function($q, $http, $window, constants){

        var currentuser =  $window.localStorage.getItem('user');

        return {
            login: function(username, password) {
                /**
                 * @return {Promise}
                 */
                return $q(function(resolve, reject){

                    $http.post(constants.loginurl, {
                        username: username,
                        password: password
                    }).success(function(data){
                        console.log(data);

                        if (!angular.isObject(data) || !angular.isArray(data.data) || data.data.length !== 1 || !angular.isNumber(data.data[0].id)){
                            reject({
                                name: 'unkown',
                                message: 'Invalid data received from server'
                            });
                            return;
                        }

                        currentuser = data.data[0];

                        $window.localStorage.setItem('user', currentuser);

                        resolve(currentuser);

                    }).error(function(data) {
                        if (data && data.error) {
                            reject(data.error);
                        } else {
                            reject({
                                name: 'unkown',
                                message: 'Invalid data received from server'
                            });
                        }
                    });
                });
            },
            /**
             * Logsout user
             * @returns {Promise}
             */
            logout: function() {
                return $q(function(resolve, reject){

                    // ==========================================================================
                    // Remove user from localstorage in any case
                    // ==========================================================================
                    $window.localStorage.removeItem('user');

                    currentuser = null;

                    $http.post(constants.logouturl).success(function(data, status){
                        // ==========================================================================
                        // If the was no logged in user we are good anyway
                        // ==========================================================================
                        if (status === 403 ) {
                            resolve();
                            return;
                        }

                        // ==========================================================================
                        // We are logged out
                        // ==========================================================================
                        if (angular.isObject(data) && data.success ){
                            resolve();
                            return;
                        }

                        reject({
                            name: 'unkown',
                            message: 'Logging out from server failed'
                        });

                    }).error(function(data) {
                        if (data && data.error) {
                            reject(data.error);
                        } else {
                            reject({
                                name: 'unkown',
                                message: 'Logging out from server failed. Because of a Server error'
                            });
                        }
                    });
                });
            },
            currentUser: function(){
                return currentuser;
            },
            isLoggedIn: function() {
                if (currentuser){
                    return true;
                }
                return false;
            }
        }
    }]);
};
