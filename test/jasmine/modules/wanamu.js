
describe('Test wanamu module', function(){
    beforeEach(module('wanamu'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('should exist wuCacheService', inject(function (wuCacheService) {
        expect(wuCacheService).toBeDefined();
    }));
});


describe('Lpad filter', function(){
    beforeEach(module('wanamu'));

    var $filter;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('should return ++++++test when given test, 10 and +', function() {
        var lpad = $filter('lpad');
        expect(lpad('test', 10, '+')).toEqual('++++++test');
    });

    it('should return input without change ', function() {
        var lpad = $filter('lpad');
        expect(lpad('test', 3, '+')).toEqual('test');
    });

    it('should return input without change ', function() {
        var lpad = $filter('lpad');
        expect(lpad('test', 3, '+')).toEqual('test');
    });
});

