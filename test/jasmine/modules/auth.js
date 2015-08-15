describe('Test auth module', function(){
    beforeEach(module('wanamu'));
    beforeEach(module('ui.router'));
    beforeEach(module('auth'));

    var $controller, $httpBackend, $state, $rootScope, $compile;

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$state_, _$rootScope_, _$compile_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;

        // =============================================================================================
        // The locale file gets requested on startup of aplication
        // =============================================================================================
        $httpBackend.when('GET', 'l10n/locale-en.json')
            .respond({

            });
    }));

    it('should have a working loginform', inject(function () {
        var $scope = $rootScope.$new();
        var controller  = $controller('LoginController', {
            $scope : $scope
        });
        $state.go('panel.view.login');
        $rootScope.$digest();

        // attach controller to the scope with its alias
        $scope.Login = controller;
        // compile the main template of the current state which is located under @panel
        $compile($state.$current.views['@panel'].template)($scope);
        //Invalid user
        controller.loginScopeModel.username = 'test';
        $scope.$digest();

        expect(controller.loginScopeModel.loginform.$valid).toBe(false);
        expect(controller.loginScopeModel.loginform.username.$valid).toBe(false);
        expect(controller.loginScopeModel.loginform.password.$untouched).toBe(true);
        expect(controller.loginScopeModel.loginform.password.$valid).toBe(false);

        // Valid user invalid password
        controller.loginScopeModel.username = 'test@email.com';
        $scope.$digest();
        expect(controller.loginScopeModel.loginform.$valid).toBe(false);
        expect(controller.loginScopeModel.loginform.username.$valid).toBe(true);
        expect(controller.loginScopeModel.loginform.password.$untouched).toBe(true);
        expect(controller.loginScopeModel.loginform.password.$valid).toBe(false);

        // Valid user invalid password
        controller.loginScopeModel.username = 'test@email.com';
        controller.loginScopeModel.password = 'TestPassword';
        $scope.$digest();
        expect(controller.loginScopeModel.loginform.$valid).toBe(true);
        expect(controller.loginScopeModel.loginform.username.$valid).toBe(true);
        expect(controller.loginScopeModel.loginform.password.$valid).toBe(true);

        $authRequestHandler = $httpBackend.when('POST', /auth\/login/)
            .respond({
                success: true,
                data: [
                    {
                        id: 1
                    }
                ]
        });
        controller.login();
        $httpBackend.flush();
        $rootScope.$digest();
        expect($state.$current.name).toBe('panel.view.todos');

        expect(controller.auth.currentUser()).toBeDefined();
        expect(controller.auth.currentUser().id).toBe(1);
    }));
});


