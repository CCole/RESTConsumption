webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(7);
	__webpack_require__(4);
	__webpack_require__(8);
	__webpack_require__(10);


	//setting the staffWizard Module - Only set this once then retrieve from this point after if I want to add stuff to it
	angular.module('staffWizard', 
	['dataDisplay',
	'dataEntry',
	'ui.mask',
	'ui.bootstrap'

	]);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);

	module.exports =
	angular
	    .module('dataEntry',['staff'])
	    .controller('dataEntry.controller', enterData);

	function enterData(staffData, $sce){
	        var vm = this; 
	        
	        
	    
	        vm.placeMask = function() {
	            vm.npiMask = "9999999999";
	        };

	        vm.removeMask = function(){
	            //if there are no values in the form input then remove mask on blur
	            //not clear if angular-ui-mask implements a function that removes the placeholder if a user does not 
	            //finish entry and then clicks away. Definitly rethink this.
	          /* if(typeof vm.npiNumber !== "undefined") {
	               console.log(vm.npiNumber.length);
	           }*/
	            if(typeof vm.npiNumber === "undefined" || (vm.npiNumber.length == 0)){ 
	                vm.npiMask = "";
	            }
	        };


	        vm.postStaff = function() {

	            var newStaff = { 
	                staffType: vm.staffType,
	                npiNumber: vm.npiNumber,
	                firstName: vm.firstName,
	                lastName: vm.lastName,
	                middleName: vm.middleName     
	            };

	            console.log(newStaff); 
	            console.log(vm.staffType);

	            staffData.save(newStaff, function(response){
	                console.log(response.message);
	            });
	    };

	    vm.npiLink = $sce.trustAsHtml('<b>The National Provider Identifier</b>&nbsp;is a unique 10-digit identifier number issued to health care providers. <a target="_blank" href="https://npiregistry.cms.hhs.gov/">Learn more</a>');
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(5);

	module.exports = 
	angular
	    .module('staff', ['ngResource'])
	    .factory('staffData', staffInterface); 

	function staffInterface($resource){
	    return $resource("http://localhost:8080/staffWebService/rest/staff/:id");
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = 'ngResource';


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.5.8
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular) {'use strict';

	var $resourceMinErr = angular.$$minErr('$resource');

	// Helper functions and regex to lookup a dotted path on an object
	// stopping at undefined/null.  The path must be composed of ASCII
	// identifiers (just like $parse)
	var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

	function isValidDottedPath(path) {
	  return (path != null && path !== '' && path !== 'hasOwnProperty' &&
	      MEMBER_NAME_REGEX.test('.' + path));
	}

	function lookupDottedPath(obj, path) {
	  if (!isValidDottedPath(path)) {
	    throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
	  }
	  var keys = path.split('.');
	  for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj); i++) {
	    var key = keys[i];
	    obj = (obj !== null) ? obj[key] : undefined;
	  }
	  return obj;
	}

	/**
	 * Create a shallow copy of an object and clear other fields from the destination
	 */
	function shallowClearAndCopy(src, dst) {
	  dst = dst || {};

	  angular.forEach(dst, function(value, key) {
	    delete dst[key];
	  });

	  for (var key in src) {
	    if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
	      dst[key] = src[key];
	    }
	  }

	  return dst;
	}

	/**
	 * @ngdoc module
	 * @name ngResource
	 * @description
	 *
	 * # ngResource
	 *
	 * The `ngResource` module provides interaction support with RESTful services
	 * via the $resource service.
	 *
	 *
	 * <div doc-module-components="ngResource"></div>
	 *
	 * See {@link ngResource.$resourceProvider} and {@link ngResource.$resource} for usage.
	 */

	/**
	 * @ngdoc provider
	 * @name $resourceProvider
	 *
	 * @description
	 *
	 * Use `$resourceProvider` to change the default behavior of the {@link ngResource.$resource}
	 * service.
	 *
	 * ## Dependencies
	 * Requires the {@link ngResource } module to be installed.
	 *
	 */

	/**
	 * @ngdoc service
	 * @name $resource
	 * @requires $http
	 * @requires ng.$log
	 * @requires $q
	 * @requires ng.$timeout
	 *
	 * @description
	 * A factory which creates a resource object that lets you interact with
	 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
	 *
	 * The returned resource object has action methods which provide high-level behaviors without
	 * the need to interact with the low level {@link ng.$http $http} service.
	 *
	 * Requires the {@link ngResource `ngResource`} module to be installed.
	 *
	 * By default, trailing slashes will be stripped from the calculated URLs,
	 * which can pose problems with server backends that do not expect that
	 * behavior.  This can be disabled by configuring the `$resourceProvider` like
	 * this:
	 *
	 * ```js
	     app.config(['$resourceProvider', function($resourceProvider) {
	       // Don't strip trailing slashes from calculated URLs
	       $resourceProvider.defaults.stripTrailingSlashes = false;
	     }]);
	 * ```
	 *
	 * @param {string} url A parameterized URL template with parameters prefixed by `:` as in
	 *   `/user/:username`. If you are using a URL with a port number (e.g.
	 *   `http://example.com:8080/api`), it will be respected.
	 *
	 *   If you are using a url with a suffix, just add the suffix, like this:
	 *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
	 *   or even `$resource('http://example.com/resource/:resource_id.:format')`
	 *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
	 *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
	 *   can escape it with `/\.`.
	 *
	 * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
	 *   `actions` methods. If a parameter value is a function, it will be called every time
	 *   a param value needs to be obtained for a request (unless the param was overridden). The function
	 *   will be passed the current data value as an argument.
	 *
	 *   Each key value in the parameter object is first bound to url template if present and then any
	 *   excess keys are appended to the url search query after the `?`.
	 *
	 *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
	 *   URL `/path/greet?salutation=Hello`.
	 *
	 *   If the parameter value is prefixed with `@`, then the value for that parameter will be
	 *   extracted from the corresponding property on the `data` object (provided when calling a
	 *   "non-GET" action method).
	 *   For example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of
	 *   `someParam` will be `data.someProp`.
	 *   Note that the parameter will be ignored, when calling a "GET" action method (i.e. an action
	 *   method that does not accept a request body)
	 *
	 * @param {Object.<Object>=} actions Hash with declaration of custom actions that should extend
	 *   the default set of resource actions. The declaration should be created in the format of {@link
	 *   ng.$http#usage $http.config}:
	 *
	 *       {action1: {method:?, params:?, isArray:?, headers:?, ...},
	 *        action2: {method:?, params:?, isArray:?, headers:?, ...},
	 *        ...}
	 *
	 *   Where:
	 *
	 *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
	 *     your resource object.
	 *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
	 *     `DELETE`, `JSONP`, etc).
	 *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
	 *     the parameter value is a function, it will be called every time when a param value needs to
	 *     be obtained for a request (unless the param was overridden). The function will be passed the
	 *     current data value as an argument.
	 *   - **`url`** – {string} – action specific `url` override. The url templating is supported just
	 *     like for the resource-level urls.
	 *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
	 *     see `returns` section.
	 *   - **`transformRequest`** –
	 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
	 *     transform function or an array of such functions. The transform function takes the http
	 *     request body and headers and returns its transformed (typically serialized) version.
	 *     By default, transformRequest will contain one function that checks if the request data is
	 *     an object and serializes to using `angular.toJson`. To prevent this behavior, set
	 *     `transformRequest` to an empty array: `transformRequest: []`
	 *   - **`transformResponse`** –
	 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
	 *     transform function or an array of such functions. The transform function takes the http
	 *     response body and headers and returns its transformed (typically deserialized) version.
	 *     By default, transformResponse will contain one function that checks if the response looks
	 *     like a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior,
	 *     set `transformResponse` to an empty array: `transformResponse: []`
	 *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
	 *     GET request, otherwise if a cache instance built with
	 *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
	 *     caching.
	 *   - **`timeout`** – `{number}` – timeout in milliseconds.<br />
	 *     **Note:** In contrast to {@link ng.$http#usage $http.config}, {@link ng.$q promises} are
	 *     **not** supported in $resource, because the same value would be used for multiple requests.
	 *     If you are looking for a way to cancel requests, you should use the `cancellable` option.
	 *   - **`cancellable`** – `{boolean}` – if set to true, the request made by a "non-instance" call
	 *     will be cancelled (if not already completed) by calling `$cancelRequest()` on the call's
	 *     return value. Calling `$cancelRequest()` for a non-cancellable or an already
	 *     completed/cancelled request will have no effect.<br />
	 *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the
	 *     XHR object. See
	 *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)
	 *     for more information.
	 *   - **`responseType`** - `{string}` - see
	 *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
	 *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -
	 *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
	 *     with `http response` object. See {@link ng.$http $http interceptors}.
	 *
	 * @param {Object} options Hash with custom settings that should extend the
	 *   default `$resourceProvider` behavior.  The supported options are:
	 *
	 *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing
	 *   slashes from any calculated URL will be stripped. (Defaults to true.)
	 *   - **`cancellable`** – {boolean} – If true, the request made by a "non-instance" call will be
	 *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return value.
	 *   This can be overwritten per action. (Defaults to false.)
	 *
	 * @returns {Object} A resource "class" object with methods for the default set of resource actions
	 *   optionally extended with custom `actions`. The default set contains these actions:
	 *   ```js
	 *   { 'get':    {method:'GET'},
	 *     'save':   {method:'POST'},
	 *     'query':  {method:'GET', isArray:true},
	 *     'remove': {method:'DELETE'},
	 *     'delete': {method:'DELETE'} };
	 *   ```
	 *
	 *   Calling these methods invoke an {@link ng.$http} with the specified http method,
	 *   destination and parameters. When the data is returned from the server then the object is an
	 *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
	 *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
	 *   read, update, delete) on server-side data like this:
	 *   ```js
	 *   var User = $resource('/user/:userId', {userId:'@id'});
	 *   var user = User.get({userId:123}, function() {
	 *     user.abc = true;
	 *     user.$save();
	 *   });
	 *   ```
	 *
	 *   It is important to realize that invoking a $resource object method immediately returns an
	 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
	 *   server the existing reference is populated with the actual data. This is a useful trick since
	 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
	 *   object results in no rendering, once the data arrives from the server then the object is
	 *   populated with the data and the view automatically re-renders itself showing the new data. This
	 *   means that in most cases one never has to write a callback function for the action methods.
	 *
	 *   The action methods on the class object or instance object can be invoked with the following
	 *   parameters:
	 *
	 *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
	 *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
	 *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
	 *
	 *
	 *   Success callback is called with (value, responseHeaders) arguments, where the value is
	 *   the populated resource instance or collection object. The error callback is called
	 *   with (httpResponse) argument.
	 *
	 *   Class actions return empty instance (with additional properties below).
	 *   Instance actions return promise of the action.
	 *
	 *   The Resource instances and collections have these additional properties:
	 *
	 *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this
	 *     instance or collection.
	 *
	 *     On success, the promise is resolved with the same resource instance or collection object,
	 *     updated with data from server. This makes it easy to use in
	 *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view
	 *     rendering until the resource(s) are loaded.
	 *
	 *     On failure, the promise is rejected with the {@link ng.$http http response} object, without
	 *     the `resource` property.
	 *
	 *     If an interceptor object was provided, the promise will instead be resolved with the value
	 *     returned by the interceptor.
	 *
	 *   - `$resolved`: `true` after first server interaction is completed (either with success or
	 *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
	 *      data-binding.
	 *
	 *   The Resource instances and collections have these additional methods:
	 *
	 *   - `$cancelRequest`: If there is a cancellable, pending request related to the instance or
	 *      collection, calling this method will abort the request.
	 *
	 *   The Resource instances have these additional methods:
	 *
	 *   - `toJSON`: It returns a simple object without any of the extra properties added as part of
	 *     the Resource API. This object can be serialized through {@link angular.toJson} safely
	 *     without attaching Angular-specific fields. Notice that `JSON.stringify` (and
	 *     `angular.toJson`) automatically use this method when serializing a Resource instance
	 *     (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)).
	 *
	 * @example
	 *
	 * # Credit card resource
	 *
	 * ```js
	     // Define CreditCard class
	     var CreditCard = $resource('/user/:userId/card/:cardId',
	      {userId:123, cardId:'@id'}, {
	       charge: {method:'POST', params:{charge:true}}
	      });

	     // We can retrieve a collection from the server
	     var cards = CreditCard.query(function() {
	       // GET: /user/123/card
	       // server returns: [ {id:456, number:'1234', name:'Smith'} ];

	       var card = cards[0];
	       // each item is an instance of CreditCard
	       expect(card instanceof CreditCard).toEqual(true);
	       card.name = "J. Smith";
	       // non GET methods are mapped onto the instances
	       card.$save();
	       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
	       // server returns: {id:456, number:'1234', name: 'J. Smith'};

	       // our custom method is mapped as well.
	       card.$charge({amount:9.99});
	       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
	     });

	     // we can create an instance as well
	     var newCard = new CreditCard({number:'0123'});
	     newCard.name = "Mike Smith";
	     newCard.$save();
	     // POST: /user/123/card {number:'0123', name:'Mike Smith'}
	     // server returns: {id:789, number:'0123', name: 'Mike Smith'};
	     expect(newCard.id).toEqual(789);
	 * ```
	 *
	 * The object returned from this function execution is a resource "class" which has "static" method
	 * for each action in the definition.
	 *
	 * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
	 * `headers`.
	 *
	 * @example
	 *
	 * # User resource
	 *
	 * When the data is returned from the server then the object is an instance of the resource type and
	 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
	 * operations (create, read, update, delete) on server-side data.

	   ```js
	     var User = $resource('/user/:userId', {userId:'@id'});
	     User.get({userId:123}, function(user) {
	       user.abc = true;
	       user.$save();
	     });
	   ```
	 *
	 * It's worth noting that the success callback for `get`, `query` and other methods gets passed
	 * in the response that came from the server as well as $http header getter function, so one
	 * could rewrite the above example and get access to http headers as:
	 *
	   ```js
	     var User = $resource('/user/:userId', {userId:'@id'});
	     User.get({userId:123}, function(user, getResponseHeaders){
	       user.abc = true;
	       user.$save(function(user, putResponseHeaders) {
	         //user => saved user object
	         //putResponseHeaders => $http header getter
	       });
	     });
	   ```
	 *
	 * You can also access the raw `$http` promise via the `$promise` property on the object returned
	 *
	   ```
	     var User = $resource('/user/:userId', {userId:'@id'});
	     User.get({userId:123})
	         .$promise.then(function(user) {
	           $scope.user = user;
	         });
	   ```
	 *
	 * @example
	 *
	 * # Creating a custom 'PUT' request
	 *
	 * In this example we create a custom method on our resource to make a PUT request
	 * ```js
	 *    var app = angular.module('app', ['ngResource', 'ngRoute']);
	 *
	 *    // Some APIs expect a PUT request in the format URL/object/ID
	 *    // Here we are creating an 'update' method
	 *    app.factory('Notes', ['$resource', function($resource) {
	 *    return $resource('/notes/:id', null,
	 *        {
	 *            'update': { method:'PUT' }
	 *        });
	 *    }]);
	 *
	 *    // In our controller we get the ID from the URL using ngRoute and $routeParams
	 *    // We pass in $routeParams and our Notes factory along with $scope
	 *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
	                                      function($scope, $routeParams, Notes) {
	 *    // First get a note object from the factory
	 *    var note = Notes.get({ id:$routeParams.id });
	 *    $id = note.id;
	 *
	 *    // Now call update passing in the ID first then the object you are updating
	 *    Notes.update({ id:$id }, note);
	 *
	 *    // This will PUT /notes/ID with the note object in the request payload
	 *    }]);
	 * ```
	 *
	 * @example
	 *
	 * # Cancelling requests
	 *
	 * If an action's configuration specifies that it is cancellable, you can cancel the request related
	 * to an instance or collection (as long as it is a result of a "non-instance" call):
	 *
	   ```js
	     // ...defining the `Hotel` resource...
	     var Hotel = $resource('/api/hotel/:id', {id: '@id'}, {
	       // Let's make the `query()` method cancellable
	       query: {method: 'get', isArray: true, cancellable: true}
	     });

	     // ...somewhere in the PlanVacationController...
	     ...
	     this.onDestinationChanged = function onDestinationChanged(destination) {
	       // We don't care about any pending request for hotels
	       // in a different destination any more
	       this.availableHotels.$cancelRequest();

	       // Let's query for hotels in '<destination>'
	       // (calls: /api/hotel?location=<destination>)
	       this.availableHotels = Hotel.query({location: destination});
	     };
	   ```
	 *
	 */
	angular.module('ngResource', ['ng']).
	  provider('$resource', function() {
	    var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/;
	    var provider = this;

	    /**
	     * @ngdoc property
	     * @name $resourceProvider#defaults
	     * @description
	     * Object containing default options used when creating `$resource` instances.
	     *
	     * The default values satisfy a wide range of usecases, but you may choose to overwrite any of
	     * them to further customize your instances. The available properties are:
	     *
	     * - **stripTrailingSlashes** – `{boolean}` – If true, then the trailing slashes from any
	     *   calculated URL will be stripped.<br />
	     *   (Defaults to true.)
	     * - **cancellable** – `{boolean}` – If true, the request made by a "non-instance" call will be
	     *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return
	     *   value. For more details, see {@link ngResource.$resource}. This can be overwritten per
	     *   resource class or action.<br />
	     *   (Defaults to false.)
	     * - **actions** - `{Object.<Object>}` - A hash with default actions declarations. Actions are
	     *   high-level methods corresponding to RESTful actions/methods on resources. An action may
	     *   specify what HTTP method to use, what URL to hit, if the return value will be a single
	     *   object or a collection (array) of objects etc. For more details, see
	     *   {@link ngResource.$resource}. The actions can also be enhanced or overwritten per resource
	     *   class.<br />
	     *   The default actions are:
	     *   ```js
	     *   {
	     *     get: {method: 'GET'},
	     *     save: {method: 'POST'},
	     *     query: {method: 'GET', isArray: true},
	     *     remove: {method: 'DELETE'},
	     *     delete: {method: 'DELETE'}
	     *   }
	     *   ```
	     *
	     * #### Example
	     *
	     * For example, you can specify a new `update` action that uses the `PUT` HTTP verb:
	     *
	     * ```js
	     *   angular.
	     *     module('myApp').
	     *     config(['resourceProvider', function ($resourceProvider) {
	     *       $resourceProvider.defaults.actions.update = {
	     *         method: 'PUT'
	     *       };
	     *     });
	     * ```
	     *
	     * Or you can even overwrite the whole `actions` list and specify your own:
	     *
	     * ```js
	     *   angular.
	     *     module('myApp').
	     *     config(['resourceProvider', function ($resourceProvider) {
	     *       $resourceProvider.defaults.actions = {
	     *         create: {method: 'POST'}
	     *         get:    {method: 'GET'},
	     *         getAll: {method: 'GET', isArray:true},
	     *         update: {method: 'PUT'},
	     *         delete: {method: 'DELETE'}
	     *       };
	     *     });
	     * ```
	     *
	     */
	    this.defaults = {
	      // Strip slashes by default
	      stripTrailingSlashes: true,

	      // Make non-instance requests cancellable (via `$cancelRequest()`)
	      cancellable: false,

	      // Default actions configuration
	      actions: {
	        'get': {method: 'GET'},
	        'save': {method: 'POST'},
	        'query': {method: 'GET', isArray: true},
	        'remove': {method: 'DELETE'},
	        'delete': {method: 'DELETE'}
	      }
	    };

	    this.$get = ['$http', '$log', '$q', '$timeout', function($http, $log, $q, $timeout) {

	      var noop = angular.noop,
	        forEach = angular.forEach,
	        extend = angular.extend,
	        copy = angular.copy,
	        isFunction = angular.isFunction;

	      /**
	       * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
	       * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
	       * (pchar) allowed in path segments:
	       *    segment       = *pchar
	       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
	       *    pct-encoded   = "%" HEXDIG HEXDIG
	       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
	       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
	       *                     / "*" / "+" / "," / ";" / "="
	       */
	      function encodeUriSegment(val) {
	        return encodeUriQuery(val, true).
	          replace(/%26/gi, '&').
	          replace(/%3D/gi, '=').
	          replace(/%2B/gi, '+');
	      }


	      /**
	       * This method is intended for encoding *key* or *value* parts of query component. We need a
	       * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
	       * have to be encoded per http://tools.ietf.org/html/rfc3986:
	       *    query       = *( pchar / "/" / "?" )
	       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
	       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
	       *    pct-encoded   = "%" HEXDIG HEXDIG
	       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
	       *                     / "*" / "+" / "," / ";" / "="
	       */
	      function encodeUriQuery(val, pctEncodeSpaces) {
	        return encodeURIComponent(val).
	          replace(/%40/gi, '@').
	          replace(/%3A/gi, ':').
	          replace(/%24/g, '$').
	          replace(/%2C/gi, ',').
	          replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
	      }

	      function Route(template, defaults) {
	        this.template = template;
	        this.defaults = extend({}, provider.defaults, defaults);
	        this.urlParams = {};
	      }

	      Route.prototype = {
	        setUrlParams: function(config, params, actionUrl) {
	          var self = this,
	            url = actionUrl || self.template,
	            val,
	            encodedVal,
	            protocolAndDomain = '';

	          var urlParams = self.urlParams = {};
	          forEach(url.split(/\W/), function(param) {
	            if (param === 'hasOwnProperty') {
	              throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
	            }
	            if (!(new RegExp("^\\d+$").test(param)) && param &&
	              (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
	              urlParams[param] = {
	                isQueryParamValue: (new RegExp("\\?.*=:" + param + "(?:\\W|$)")).test(url)
	              };
	            }
	          });
	          url = url.replace(/\\:/g, ':');
	          url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function(match) {
	            protocolAndDomain = match;
	            return '';
	          });

	          params = params || {};
	          forEach(self.urlParams, function(paramInfo, urlParam) {
	            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
	            if (angular.isDefined(val) && val !== null) {
	              if (paramInfo.isQueryParamValue) {
	                encodedVal = encodeUriQuery(val, true);
	              } else {
	                encodedVal = encodeUriSegment(val);
	              }
	              url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
	                return encodedVal + p1;
	              });
	            } else {
	              url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
	                  leadingSlashes, tail) {
	                if (tail.charAt(0) == '/') {
	                  return tail;
	                } else {
	                  return leadingSlashes + tail;
	                }
	              });
	            }
	          });

	          // strip trailing slashes and set the url (unless this behavior is specifically disabled)
	          if (self.defaults.stripTrailingSlashes) {
	            url = url.replace(/\/+$/, '') || '/';
	          }

	          // then replace collapse `/.` if found in the last URL path segment before the query
	          // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
	          url = url.replace(/\/\.(?=\w+($|\?))/, '.');
	          // replace escaped `/\.` with `/.`
	          config.url = protocolAndDomain + url.replace(/\/\\\./, '/.');


	          // set params - delegate param encoding to $http
	          forEach(params, function(value, key) {
	            if (!self.urlParams[key]) {
	              config.params = config.params || {};
	              config.params[key] = value;
	            }
	          });
	        }
	      };


	      function resourceFactory(url, paramDefaults, actions, options) {
	        var route = new Route(url, options);

	        actions = extend({}, provider.defaults.actions, actions);

	        function extractParams(data, actionParams) {
	          var ids = {};
	          actionParams = extend({}, paramDefaults, actionParams);
	          forEach(actionParams, function(value, key) {
	            if (isFunction(value)) { value = value(data); }
	            ids[key] = value && value.charAt && value.charAt(0) == '@' ?
	              lookupDottedPath(data, value.substr(1)) : value;
	          });
	          return ids;
	        }

	        function defaultResponseInterceptor(response) {
	          return response.resource;
	        }

	        function Resource(value) {
	          shallowClearAndCopy(value || {}, this);
	        }

	        Resource.prototype.toJSON = function() {
	          var data = extend({}, this);
	          delete data.$promise;
	          delete data.$resolved;
	          return data;
	        };

	        forEach(actions, function(action, name) {
	          var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
	          var numericTimeout = action.timeout;
	          var cancellable = angular.isDefined(action.cancellable) ? action.cancellable :
	              (options && angular.isDefined(options.cancellable)) ? options.cancellable :
	              provider.defaults.cancellable;

	          if (numericTimeout && !angular.isNumber(numericTimeout)) {
	            $log.debug('ngResource:\n' +
	                       '  Only numeric values are allowed as `timeout`.\n' +
	                       '  Promises are not supported in $resource, because the same value would ' +
	                       'be used for multiple requests. If you are looking for a way to cancel ' +
	                       'requests, you should use the `cancellable` option.');
	            delete action.timeout;
	            numericTimeout = null;
	          }

	          Resource[name] = function(a1, a2, a3, a4) {
	            var params = {}, data, success, error;

	            /* jshint -W086 */ /* (purposefully fall through case statements) */
	            switch (arguments.length) {
	              case 4:
	                error = a4;
	                success = a3;
	              //fallthrough
	              case 3:
	              case 2:
	                if (isFunction(a2)) {
	                  if (isFunction(a1)) {
	                    success = a1;
	                    error = a2;
	                    break;
	                  }

	                  success = a2;
	                  error = a3;
	                  //fallthrough
	                } else {
	                  params = a1;
	                  data = a2;
	                  success = a3;
	                  break;
	                }
	              case 1:
	                if (isFunction(a1)) success = a1;
	                else if (hasBody) data = a1;
	                else params = a1;
	                break;
	              case 0: break;
	              default:
	                throw $resourceMinErr('badargs',
	                  "Expected up to 4 arguments [params, data, success, error], got {0} arguments",
	                  arguments.length);
	            }
	            /* jshint +W086 */ /* (purposefully fall through case statements) */

	            var isInstanceCall = this instanceof Resource;
	            var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
	            var httpConfig = {};
	            var responseInterceptor = action.interceptor && action.interceptor.response ||
	              defaultResponseInterceptor;
	            var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
	              undefined;
	            var timeoutDeferred;
	            var numericTimeoutPromise;

	            forEach(action, function(value, key) {
	              switch (key) {
	                default:
	                  httpConfig[key] = copy(value);
	                  break;
	                case 'params':
	                case 'isArray':
	                case 'interceptor':
	                case 'cancellable':
	                  break;
	              }
	            });

	            if (!isInstanceCall && cancellable) {
	              timeoutDeferred = $q.defer();
	              httpConfig.timeout = timeoutDeferred.promise;

	              if (numericTimeout) {
	                numericTimeoutPromise = $timeout(timeoutDeferred.resolve, numericTimeout);
	              }
	            }

	            if (hasBody) httpConfig.data = data;
	            route.setUrlParams(httpConfig,
	              extend({}, extractParams(data, action.params || {}), params),
	              action.url);

	            var promise = $http(httpConfig).then(function(response) {
	              var data = response.data;

	              if (data) {
	                // Need to convert action.isArray to boolean in case it is undefined
	                // jshint -W018
	                if (angular.isArray(data) !== (!!action.isArray)) {
	                  throw $resourceMinErr('badcfg',
	                      'Error in resource configuration for action `{0}`. Expected response to ' +
	                      'contain an {1} but got an {2} (Request: {3} {4})', name, action.isArray ? 'array' : 'object',
	                    angular.isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);
	                }
	                // jshint +W018
	                if (action.isArray) {
	                  value.length = 0;
	                  forEach(data, function(item) {
	                    if (typeof item === "object") {
	                      value.push(new Resource(item));
	                    } else {
	                      // Valid JSON values may be string literals, and these should not be converted
	                      // into objects. These items will not have access to the Resource prototype
	                      // methods, but unfortunately there
	                      value.push(item);
	                    }
	                  });
	                } else {
	                  var promise = value.$promise;     // Save the promise
	                  shallowClearAndCopy(data, value);
	                  value.$promise = promise;         // Restore the promise
	                }
	              }
	              response.resource = value;

	              return response;
	            }, function(response) {
	              (error || noop)(response);
	              return $q.reject(response);
	            });

	            promise['finally'](function() {
	              value.$resolved = true;
	              if (!isInstanceCall && cancellable) {
	                value.$cancelRequest = angular.noop;
	                $timeout.cancel(numericTimeoutPromise);
	                timeoutDeferred = numericTimeoutPromise = httpConfig.timeout = null;
	              }
	            });

	            promise = promise.then(
	              function(response) {
	                var value = responseInterceptor(response);
	                (success || noop)(value, response.headers);
	                return value;
	              },
	              responseErrorInterceptor);

	            if (!isInstanceCall) {
	              // we are creating instance / collection
	              // - set the initial promise
	              // - return the instance / collection
	              value.$promise = promise;
	              value.$resolved = false;
	              if (cancellable) value.$cancelRequest = timeoutDeferred.resolve;

	              return value;
	            }

	            // instance call
	            return promise;
	          };


	          Resource.prototype['$' + name] = function(params, success, error) {
	            if (isFunction(params)) {
	              error = success; success = params; params = {};
	            }
	            var result = Resource[name].call(this, params, this, success, error);
	            return result.$promise || result;
	          };
	        });

	        Resource.bind = function(additionalParamDefaults) {
	          return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
	        };

	        return Resource;
	      }

	      return resourceFactory;
	    }];
	  });


	})(window, window.angular);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);

	module.exports =
	angular
	    .module('dataDisplay',['staff'])
	    .controller('dataDisplay.controller', displayData);

	function displayData(staffData){
	    var vm = this; 
	    vm.btnGrp = false;
	    
	    staffData.query(function(data){
	        vm.staff = data; 
	    });

	    vm.selectStaff = function(s){
	        console.log(s.SQUIRE_STAFF_ID);
	        vm.btnGrp = !vm.btnGrp; 
	        return s.SQUIRE_STAFF_ID; 
	    };

	    vm.delStaff = function(){

	    };

	    vm.editStaff = function(){
	        
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//https://github.com/angular/angular.js/pull/10732

	var angular = __webpack_require__(1);
	var mask = __webpack_require__(9);

	module.exports = 'ui.mask';


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * angular-ui-mask
	 * https://github.com/angular-ui/ui-mask
	 * Version: 1.8.7 - 2016-07-26T16:01:23.393Z
	 * License: MIT
	 */


	(function () { 
	'use strict';
	/*
	 Attaches input mask onto input element
	 */
	angular.module('ui.mask', [])
	        .value('uiMaskConfig', {
	            maskDefinitions: {
	                '9': /\d/,
	                'A': /[a-zA-Z]/,
	                '*': /[a-zA-Z0-9]/
	            },
	            clearOnBlur: true,
	            clearOnBlurPlaceholder: false,
	            escChar: '\\',
	            eventsToHandle: ['input', 'keyup', 'click', 'focus'],
	            addDefaultPlaceholder: true,
	            allowInvalidValue: false
	        })
	        .provider('uiMask.Config', function() {
	            var options = {};

	            this.maskDefinitions = function(maskDefinitions) {
	                return options.maskDefinitions = maskDefinitions;
	            };
	            this.clearOnBlur = function(clearOnBlur) {
	                return options.clearOnBlur = clearOnBlur;
	            };
	            this.clearOnBlurPlaceholder = function(clearOnBlurPlaceholder) {
	                return options.clearOnBlurPlaceholder = clearOnBlurPlaceholder;
	            };
	            this.eventsToHandle = function(eventsToHandle) {
	                return options.eventsToHandle = eventsToHandle;
	            };
	            this.addDefaultPlaceholder = function(addDefaultPlaceholder) {
	                return options.addDefaultPlaceholder = addDefaultPlaceholder;
	            };
	            this.allowInvalidValue = function(allowInvalidValue) {
	                return options.allowInvalidValue = allowInvalidValue;
	            };
	            this.$get = ['uiMaskConfig', function(uiMaskConfig) {
	                var tempOptions = uiMaskConfig;
	                for(var prop in options) {
	                    if (angular.isObject(options[prop]) && !angular.isArray(options[prop])) {
	                        angular.extend(tempOptions[prop], options[prop]);
	                    } else {
	                        tempOptions[prop] = options[prop];
	                    }
	                }

	                return tempOptions;
	            }];
	        })
	        .directive('uiMask', ['uiMask.Config', function(maskConfig) {
	                function isFocused (elem) {
	                  return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	                }

	                return {
	                    priority: 100,
	                    require: 'ngModel',
	                    restrict: 'A',
	                    compile: function uiMaskCompilingFunction() {
	                        var options = angular.copy(maskConfig);

	                        return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller) {
	                            var maskProcessed = false, eventsBound = false,
	                                    maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
	                                    // Minimum required length of the value to be considered valid
	                                    minRequiredLength,
	                                    value, valueMasked, isValid,
	                                    // Vars for initializing/uninitializing
	                                    originalPlaceholder = iAttrs.placeholder,
	                                    originalMaxlength = iAttrs.maxlength,
	                                    // Vars used exclusively in eventHandler()
	                                    oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength,
	                                    // Used for communicating if a backspace operation should be allowed between
	                                    // keydownHandler and eventHandler
	                                    preventBackspace;

	                            var originalIsEmpty = controller.$isEmpty;
	                            controller.$isEmpty = function(value) {
	                                if (maskProcessed) {
	                                    return originalIsEmpty(unmaskValue(value || ''));
	                                } else {
	                                    return originalIsEmpty(value);
	                                }
	                            };

	                            function initialize(maskAttr) {
	                                if (!angular.isDefined(maskAttr)) {
	                                    return uninitialize();
	                                }
	                                processRawMask(maskAttr);
	                                if (!maskProcessed) {
	                                    return uninitialize();
	                                }
	                                initializeElement();
	                                bindEventListeners();
	                                return true;
	                            }

	                            function initPlaceholder(placeholderAttr) {
	                                if ( ! placeholderAttr) {
	                                    return;
	                                }

	                                maskPlaceholder = placeholderAttr;

	                                // If the mask is processed, then we need to update the value
	                                // but don't set the value if there is nothing entered into the element
	                                // and there is a placeholder attribute on the element because that
	                                // will only set the value as the blank maskPlaceholder
	                                // and override the placeholder on the element
	                                if (maskProcessed && !(iElement.val().length === 0 && angular.isDefined(iAttrs.placeholder))) {
	                                    iElement.val(maskValue(unmaskValue(iElement.val())));
	                                }
	                            }

	                            function initPlaceholderChar() {
	                                return initialize(iAttrs.uiMask);
	                            }

	                            var modelViewValue = false;
	                            iAttrs.$observe('modelViewValue', function(val) {
	                                if (val === 'true') {
	                                    modelViewValue = true;
	                                }
	                            });

	                            iAttrs.$observe('allowInvalidValue', function(val) {
	                                linkOptions.allowInvalidValue = val === ''
	                                    ? true
	                                    : !!val;
	                                formatter(controller.$modelValue);
	                            });

	                            function formatter(fromModelValue) {
	                                if (!maskProcessed) {
	                                    return fromModelValue;
	                                }
	                                value = unmaskValue(fromModelValue || '');
	                                isValid = validateValue(value);
	                                controller.$setValidity('mask', isValid);

	                                if (!value.length) return undefined;
	                                if (isValid || linkOptions.allowInvalidValue) {
	                                    return maskValue(value);
	                                } else {
	                                    return undefined;
	                                }
	                            }

	                            function parser(fromViewValue) {
	                                if (!maskProcessed) {
	                                    return fromViewValue;
	                                }
	                                value = unmaskValue(fromViewValue || '');
	                                isValid = validateValue(value);
	                                // We have to set viewValue manually as the reformatting of the input
	                                // value performed by eventHandler() doesn't happen until after
	                                // this parser is called, which causes what the user sees in the input
	                                // to be out-of-sync with what the controller's $viewValue is set to.
	                                controller.$viewValue = value.length ? maskValue(value) : '';
	                                controller.$setValidity('mask', isValid);

	                                if (isValid || linkOptions.allowInvalidValue) {
	                                    return modelViewValue ? controller.$viewValue : value;
	                                }
	                            }

	                            var linkOptions = {};

	                            if (iAttrs.uiOptions) {
	                                linkOptions = scope.$eval('[' + iAttrs.uiOptions + ']');
	                                if (angular.isObject(linkOptions[0])) {
	                                    // we can't use angular.copy nor angular.extend, they lack the power to do a deep merge
	                                    linkOptions = (function(original, current) {
	                                        for (var i in original) {
	                                            if (Object.prototype.hasOwnProperty.call(original, i)) {
	                                                if (current[i] === undefined) {
	                                                    current[i] = angular.copy(original[i]);
	                                                } else {
	                                                    if (angular.isObject(current[i]) && !angular.isArray(current[i])) {
	                                                        current[i] = angular.extend({}, original[i], current[i]);
	                                                    }
	                                                }
	                                            }
	                                        }
	                                        return current;
	                                    })(options, linkOptions[0]);
	                                } else {
	                                    linkOptions = options;  //gotta be a better way to do this..
	                                }
	                            } else {
	                                linkOptions = options;
	                            }

	                            iAttrs.$observe('uiMask', initialize);
	                            if (angular.isDefined(iAttrs.uiMaskPlaceholder)) {
	                                iAttrs.$observe('uiMaskPlaceholder', initPlaceholder);
	                            }
	                            else {
	                                iAttrs.$observe('placeholder', initPlaceholder);
	                            }
	                            if (angular.isDefined(iAttrs.uiMaskPlaceholderChar)) {
	                                iAttrs.$observe('uiMaskPlaceholderChar', initPlaceholderChar);
	                            }

	                            controller.$formatters.unshift(formatter);
	                            controller.$parsers.unshift(parser);

	                            function uninitialize() {
	                                maskProcessed = false;
	                                unbindEventListeners();

	                                if (angular.isDefined(originalPlaceholder)) {
	                                    iElement.attr('placeholder', originalPlaceholder);
	                                } else {
	                                    iElement.removeAttr('placeholder');
	                                }

	                                if (angular.isDefined(originalMaxlength)) {
	                                    iElement.attr('maxlength', originalMaxlength);
	                                } else {
	                                    iElement.removeAttr('maxlength');
	                                }

	                                iElement.val(controller.$modelValue);
	                                controller.$viewValue = controller.$modelValue;
	                                return false;
	                            }

	                            function initializeElement() {
	                                value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
	                                valueMasked = oldValue = maskValue(value);
	                                isValid = validateValue(value);
	                                if (iAttrs.maxlength) { // Double maxlength to allow pasting new val at end of mask
	                                    iElement.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
	                                }
	                                if ( ! originalPlaceholder && linkOptions.addDefaultPlaceholder) {
	                                    iElement.attr('placeholder', maskPlaceholder);
	                                }
	                                var viewValue = controller.$modelValue;
	                                var idx = controller.$formatters.length;
	                                while(idx--) {
	                                    viewValue = controller.$formatters[idx](viewValue);
	                                }
	                                controller.$viewValue = viewValue || '';
	                                controller.$render();
	                                // Not using $setViewValue so we don't clobber the model value and dirty the form
	                                // without any kind of user interaction.
	                            }

	                            function bindEventListeners() {
	                                if (eventsBound) {
	                                    return;
	                                }
	                                iElement.bind('blur', blurHandler);
	                                iElement.bind('mousedown mouseup', mouseDownUpHandler);
	                                iElement.bind('keydown', keydownHandler);
	                                iElement.bind(linkOptions.eventsToHandle.join(' '), eventHandler);
	                                eventsBound = true;
	                            }

	                            function unbindEventListeners() {
	                                if (!eventsBound) {
	                                    return;
	                                }
	                                iElement.unbind('blur', blurHandler);
	                                iElement.unbind('mousedown', mouseDownUpHandler);
	                                iElement.unbind('mouseup', mouseDownUpHandler);
	                                iElement.unbind('keydown', keydownHandler);
	                                iElement.unbind('input', eventHandler);
	                                iElement.unbind('keyup', eventHandler);
	                                iElement.unbind('click', eventHandler);
	                                iElement.unbind('focus', eventHandler);
	                                eventsBound = false;
	                            }

	                            function validateValue(value) {
	                                // Zero-length value validity is ngRequired's determination
	                                return value.length ? value.length >= minRequiredLength : true;
	                            }

	                            function unmaskValue(value) {
	                                var valueUnmasked = '',
	                                    input = iElement[0],
	                                    maskPatternsCopy = maskPatterns.slice(),
	                                    selectionStart = oldCaretPosition,
	                                    selectionEnd = selectionStart + getSelectionLength(input),
	                                    valueOffset, valueDelta, tempValue = '';
	                                // Preprocess by stripping mask components from value
	                                value = value.toString();
	                                valueOffset = 0;
	                                valueDelta = value.length - maskPlaceholder.length;
	                                angular.forEach(maskComponents, function(component) {
	                                    var position = component.position;
	                                    //Only try and replace the component if the component position is not within the selected range
	                                    //If component was in selected range then it was removed with the user input so no need to try and remove that component
	                                    if (!(position >= selectionStart && position < selectionEnd)) {
	                                        if (position >= selectionStart) {
	                                            position += valueDelta;
	                                        }
	                                        if (value.substring(position, position + component.value.length) === component.value) {
	                                            tempValue += value.slice(valueOffset, position);// + value.slice(position + component.value.length);
	                                            valueOffset = position + component.value.length;
	                                        }
	                                    }
	                                });
	                                value = tempValue + value.slice(valueOffset);
	                                angular.forEach(value.split(''), function(chr) {
	                                    if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
	                                        valueUnmasked += chr;
	                                        maskPatternsCopy.shift();
	                                    }
	                                });

	                                return valueUnmasked;
	                            }

	                            function maskValue(unmaskedValue) {
	                                var valueMasked = '',
	                                        maskCaretMapCopy = maskCaretMap.slice();

	                                angular.forEach(maskPlaceholder.split(''), function(chr, i) {
	                                    if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
	                                        valueMasked += unmaskedValue.charAt(0) || '_';
	                                        unmaskedValue = unmaskedValue.substr(1);
	                                        maskCaretMapCopy.shift();
	                                    }
	                                    else {
	                                        valueMasked += chr;
	                                    }
	                                });
	                                return valueMasked;
	                            }

	                            function getPlaceholderChar(i) {
	                                var placeholder = angular.isDefined(iAttrs.uiMaskPlaceholder) ? iAttrs.uiMaskPlaceholder : iAttrs.placeholder,
	                                    defaultPlaceholderChar;

	                                if (angular.isDefined(placeholder) && placeholder[i]) {
	                                    return placeholder[i];
	                                } else {
	                                    defaultPlaceholderChar = angular.isDefined(iAttrs.uiMaskPlaceholderChar) && iAttrs.uiMaskPlaceholderChar ? iAttrs.uiMaskPlaceholderChar : '_';
	                                    return (defaultPlaceholderChar.toLowerCase() === 'space') ? ' ' : defaultPlaceholderChar[0];
	                                }
	                            }

	                            // Generate array of mask components that will be stripped from a masked value
	                            // before processing to prevent mask components from being added to the unmasked value.
	                            // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
	                            function getMaskComponents() {
	                                var maskPlaceholderChars = maskPlaceholder.split(''),
	                                        maskPlaceholderCopy, components;

	                                //maskCaretMap can have bad values if the input has the ui-mask attribute implemented as an obversable property, e.g. the demo page
	                                if (maskCaretMap && !isNaN(maskCaretMap[0])) {
	                                    //Instead of trying to manipulate the RegEx based on the placeholder characters
	                                    //we can simply replace the placeholder characters based on the already built
	                                    //maskCaretMap to underscores and leave the original working RegEx to get the proper
	                                    //mask components
	                                    angular.forEach(maskCaretMap, function(value) {
	                                        maskPlaceholderChars[value] = '_';
	                                    });
	                                }
	                                maskPlaceholderCopy = maskPlaceholderChars.join('');
	                                components = maskPlaceholderCopy.replace(/[_]+/g, '_').split('_');
	                                components = components.filter(function(s) {
	                                    return s !== '';
	                                });

	                                // need a string search offset in cases where the mask contains multiple identical components
	                                // E.g., a mask of 99.99.99-999.99
	                                var offset = 0;
	                                return components.map(function(c) {
	                                    var componentPosition = maskPlaceholderCopy.indexOf(c, offset);
	                                    offset = componentPosition + 1;
	                                    return {
	                                        value: c,
	                                        position: componentPosition
	                                    };
	                                });
	                            }

	                            function processRawMask(mask) {
	                                var characterCount = 0;

	                                maskCaretMap = [];
	                                maskPatterns = [];
	                                maskPlaceholder = '';

	                                if (angular.isString(mask)) {
	                                    minRequiredLength = 0;

	                                    var isOptional = false,
	                                            numberOfOptionalCharacters = 0,
	                                            splitMask = mask.split('');

	                                    var inEscape = false;
	                                    angular.forEach(splitMask, function(chr, i) {
	                                        if (inEscape) {
	                                            inEscape = false;
	                                            maskPlaceholder += chr;
	                                            characterCount++;
	                                        }
	                                        else if (linkOptions.escChar === chr) {
	                                            inEscape = true;
	                                        }
	                                        else if (linkOptions.maskDefinitions[chr]) {
	                                            maskCaretMap.push(characterCount);

	                                            maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
	                                            maskPatterns.push(linkOptions.maskDefinitions[chr]);

	                                            characterCount++;
	                                            if (!isOptional) {
	                                                minRequiredLength++;
	                                            }

	                                            isOptional = false;
	                                        }
	                                        else if (chr === '?') {
	                                            isOptional = true;
	                                            numberOfOptionalCharacters++;
	                                        }
	                                        else {
	                                            maskPlaceholder += chr;
	                                            characterCount++;
	                                        }
	                                    });
	                                }
	                                // Caret position immediately following last position is valid.
	                                maskCaretMap.push(maskCaretMap.slice().pop() + 1);

	                                maskComponents = getMaskComponents();
	                                maskProcessed = maskCaretMap.length > 1 ? true : false;
	                            }

	                            var prevValue = iElement.val();
	                            function blurHandler() {
	                                if (linkOptions.clearOnBlur || ((linkOptions.clearOnBlurPlaceholder) && (value.length === 0) && iAttrs.placeholder)) {
	                                    oldCaretPosition = 0;
	                                    oldSelectionLength = 0;
	                                    if (!isValid || value.length === 0) {
	                                        valueMasked = '';
	                                        iElement.val('');
	                                        scope.$apply(function() {
	                                            //only $setViewValue when not $pristine to avoid changing $pristine state.
	                                            if (!controller.$pristine) {
	                                                controller.$setViewValue('');
	                                            }
	                                        });
	                                    }
	                                }
	                                //Check for different value and trigger change.
	                                //Check for different value and trigger change.
	                                if (value !== prevValue) {
	                                    // #157 Fix the bug from the trigger when backspacing exactly on the first letter (emptying the field)
	                                    // and then blurring out.
	                                    // Angular uses html element and calls setViewValue(element.value.trim()), setting it to the trimmed mask
	                                    // when it should be empty
	                                    var currentVal = iElement.val();
	                                    var isTemporarilyEmpty = value === '' && currentVal && angular.isDefined(iAttrs.uiMaskPlaceholderChar) && iAttrs.uiMaskPlaceholderChar === 'space'; 
	                                    if(isTemporarilyEmpty) {
	                                        iElement.val('');
	                                    }
	                                    triggerChangeEvent(iElement[0]);
	                                    if(isTemporarilyEmpty) {
	                                        iElement.val(currentVal);
	                                    }
	                                }
	                                prevValue = value;
	                            }

	                            function triggerChangeEvent(element) {
	                                var change;
	                                if (angular.isFunction(window.Event) && !element.fireEvent) {
	                                    // modern browsers and Edge
	                                    change = new Event('change', {
	                                        view: window,
	                                        bubbles: true,
	                                        cancelable: false
	                                    });
	                                    element.dispatchEvent(change);
	                                } else if ('createEvent' in document) {
	                                    // older browsers
	                                    change = document.createEvent('HTMLEvents');
	                                    change.initEvent('change', false, true);
	                                    element.dispatchEvent(change);
	                                }
	                                else if (element.fireEvent) {
	                                    // IE <= 11
	                                    element.fireEvent('onchange');
	                                }
	                            }

	                            function mouseDownUpHandler(e) {
	                                if (e.type === 'mousedown') {
	                                    iElement.bind('mouseout', mouseoutHandler);
	                                } else {
	                                    iElement.unbind('mouseout', mouseoutHandler);
	                                }
	                            }

	                            iElement.bind('mousedown mouseup', mouseDownUpHandler);

	                            function mouseoutHandler() {
	                                /*jshint validthis: true */
	                                oldSelectionLength = getSelectionLength(this);
	                                iElement.unbind('mouseout', mouseoutHandler);
	                            }

	                            function keydownHandler(e) {
			              	/*jshint validthis: true */
					var isKeyBackspace = e.which === 8,
					caretPos = getCaretPosition(this) - 1 || 0, //value in keydown is pre change so bump caret position back to simulate post change
					isCtrlZ = e.which === 90 && e.ctrlKey; //ctrl+z pressed
			
					if (isKeyBackspace) {
						while(caretPos >= 0) {
							if (isValidCaretPosition(caretPos)) {
							//re-adjust the caret position.
							//Increment to account for the initial decrement to simulate post change caret position
							setCaretPosition(this, caretPos + 1);
							break;
							}
						caretPos--;
						}
					preventBackspace = caretPos === -1;
					}
					
					if (isCtrlZ) {
						// prevent IE bug - value should be returned to initial state
						iElement.val('');
						e.preventDefault();
					}
				}

	                            function eventHandler(e) {
	                                /*jshint validthis: true */
	                                e = e || {};
	                                // Allows more efficient minification
	                                var eventWhich = e.which,
	                                        eventType = e.type;

	                                // Prevent shift and ctrl from mucking with old values
	                                if (eventWhich === 16 || eventWhich === 91) {
	                                    return;
	                                }

	                                var val = iElement.val(),
	                                        valOld = oldValue,
	                                        valMasked,
	                                        valAltered = false,
	                                        valUnmasked = unmaskValue(val),
	                                        valUnmaskedOld = oldValueUnmasked,
	                                        caretPos = getCaretPosition(this) || 0,
	                                        caretPosOld = oldCaretPosition || 0,
	                                        caretPosDelta = caretPos - caretPosOld,
	                                        caretPosMin = maskCaretMap[0],
	                                        caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),
	                                        selectionLenOld = oldSelectionLength || 0,
	                                        isSelected = getSelectionLength(this) > 0,
	                                        wasSelected = selectionLenOld > 0,
	                                        // Case: Typing a character to overwrite a selection
	                                        isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
	                                        // Case: Delete and backspace behave identically on a selection
	                                        isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
	                                        isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

	                                        isKeyLeftArrow = eventWhich === 37,
	                                        // Necessary due to "input" event not providing a key code
	                                        isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
	                                        isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0) && !wasSelected),
	                                        // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
	                                        // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
	                                        // non-mask character. Also applied to click since users are (arguably) more likely to backspace
	                                        // a character when clicking within a filled input.
	                                        caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;

	                                oldSelectionLength = getSelectionLength(this);

	                                // These events don't require any action
	                                if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup' || eventType === 'focus'))) {
	                                    return;
	                                }

	                                if (isKeyBackspace && preventBackspace) {
	                                    iElement.val(maskPlaceholder);
	                                    // This shouldn't be needed but for some reason after aggressive backspacing the controller $viewValue is incorrect.
	                                    // This keeps the $viewValue updated and correct.
	                                    scope.$apply(function () {
	                                        controller.$setViewValue(''); // $setViewValue should be run in angular context, otherwise the changes will be invisible to angular and user code.
	                                    });
	                                    setCaretPosition(this, caretPosOld);
	                                    return;
	                                }

	                                // Value Handling
	                                // ==============

	                                // User attempted to delete but raw value was unaffected--correct this grievous offense
	                                if ((eventType === 'input') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
	                                    while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
	                                        caretPos--;
	                                    }
	                                    while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
	                                        caretPos++;
	                                    }
	                                    var charIndex = maskCaretMap.indexOf(caretPos);
	                                    // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
	                                    valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);

	                                    // If value has not changed, don't want to call $setViewValue, may be caused by IE raising input event due to placeholder
	                                    if (valUnmasked !== valUnmaskedOld)
	                                        valAltered = true;
	                                }

	                                // Update values
	                                valMasked = maskValue(valUnmasked);

	                                oldValue = valMasked;
	                                oldValueUnmasked = valUnmasked;

	                                //additional check to fix the problem where the viewValue is out of sync with the value of the element.
	                                //better fix for commit 2a83b5fb8312e71d220a497545f999fc82503bd9 (I think)
	                                if (!valAltered && val.length > valMasked.length)
	                                    valAltered = true;

	                                iElement.val(valMasked);

	                                //we need this check.  What could happen if you don't have it is that you'll set the model value without the user
	                                //actually doing anything.  Meaning, things like pristine and touched will be set.
	                                if (valAltered) {
	                                    scope.$apply(function () {
	                                        controller.$setViewValue(valMasked); // $setViewValue should be run in angular context, otherwise the changes will be invisible to angular and user code.
	                                    });
	                                }

	                                // Caret Repositioning
	                                // ===================

	                                // Ensure that typing always places caret ahead of typed character in cases where the first char of
	                                // the input is a mask char and the caret is placed at the 0 position.
	                                if (isAddition && (caretPos <= caretPosMin)) {
	                                    caretPos = caretPosMin + 1;
	                                }

	                                if (caretBumpBack) {
	                                    caretPos--;
	                                }

	                                // Make sure caret is within min and max position limits
	                                caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

	                                // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
	                                while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
	                                    caretPos += caretBumpBack ? -1 : 1;
	                                }

	                                if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld))) {
	                                    caretPos++;
	                                }
	                                oldCaretPosition = caretPos;
	                                setCaretPosition(this, caretPos);
	                            }

	                            function isValidCaretPosition(pos) {
	                                return maskCaretMap.indexOf(pos) > -1;
	                            }

	                            function getCaretPosition(input) {
	                                if (!input)
	                                    return 0;
	                                if (input.selectionStart !== undefined) {
	                                    return input.selectionStart;
	                                } else if (document.selection) {
	                                    if (isFocused(iElement[0])) {
	                                        // Curse you IE
	                                        input.focus();
	                                        var selection = document.selection.createRange();
	                                        selection.moveStart('character', input.value ? -input.value.length : 0);
	                                        return selection.text.length;
	                                    }
	                                }
	                                return 0;
	                            }

	                            function setCaretPosition(input, pos) {
	                                if (!input)
	                                    return 0;
	                                if (input.offsetWidth === 0 || input.offsetHeight === 0) {
	                                    return; // Input's hidden
	                                }
	                                if (input.setSelectionRange) {
	                                    if (isFocused(iElement[0])) {
	                                        input.focus();
	                                        input.setSelectionRange(pos, pos);
	                                    }
	                                }
	                                else if (input.createTextRange) {
	                                    // Curse you IE
	                                    var range = input.createTextRange();
	                                    range.collapse(true);
	                                    range.moveEnd('character', pos);
	                                    range.moveStart('character', pos);
	                                    range.select();
	                                }
	                            }

	                            function getSelectionLength(input) {
	                                if (!input)
	                                    return 0;
	                                if (input.selectionStart !== undefined) {
	                                    return (input.selectionEnd - input.selectionStart);
	                                }
	                                if (window.getSelection) {
	                                    return (window.getSelection().toString().length);
	                                }
	                                if (document.selection) {
	                                    return (document.selection.createRange().text.length);
	                                }
	                                return 0;
	                            }

	                            // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
	                            if (!Array.prototype.indexOf) {
	                                Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
	                                    if (this === null) {
	                                        throw new TypeError();
	                                    }
	                                    var t = Object(this);
	                                    var len = t.length >>> 0;
	                                    if (len === 0) {
	                                        return -1;
	                                    }
	                                    var n = 0;
	                                    if (arguments.length > 1) {
	                                        n = Number(arguments[1]);
	                                        if (n !== n) { // shortcut for verifying if it's NaN
	                                            n = 0;
	                                        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
	                                            n = (n > 0 || -1) * Math.floor(Math.abs(n));
	                                        }
	                                    }
	                                    if (n >= len) {
	                                        return -1;
	                                    }
	                                    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
	                                    for (; k < len; k++) {
	                                        if (k in t && t[k] === searchElement) {
	                                            return k;
	                                        }
	                                    }
	                                    return -1;
	                                };
	                            }

	                        };
	                    }
	                };
	            }
	        ]);

	}());

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);

	module.exports = 'ui.bootstrap';


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	 * angular-ui-bootstrap
	 * http://angular-ui.github.io/bootstrap/

	 * Version: 2.1.4 - 2016-09-23
	 * License: MIT
	 */angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
	angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]);
	angular.module('ui.bootstrap.collapse', [])

	  .directive('uibCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
	    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
	    return {
	      link: function(scope, element, attrs) {
	        var expandingExpr = $parse(attrs.expanding),
	          expandedExpr = $parse(attrs.expanded),
	          collapsingExpr = $parse(attrs.collapsing),
	          collapsedExpr = $parse(attrs.collapsed),
	          horizontal = false,
	          css = {},
	          cssTo = {};

	        init();

	        function init() {
	          horizontal = !!('horizontal' in attrs);
	          if (horizontal) {
	            css = {
	              width: ''
	            };
	            cssTo = {width: '0'};
	          } else {
	            css = {
	              height: ''
	            };
	            cssTo = {height: '0'};
	          }
	          if (!scope.$eval(attrs.uibCollapse)) {
	            element.addClass('in')
	              .addClass('collapse')
	              .attr('aria-expanded', true)
	              .attr('aria-hidden', false)
	              .css(css);
	          }
	        }

	        function getScrollFromElement(element) {
	          if (horizontal) {
	            return {width: element.scrollWidth + 'px'};
	          }
	          return {height: element.scrollHeight + 'px'};
	        }

	        function expand() {
	          if (element.hasClass('collapse') && element.hasClass('in')) {
	            return;
	          }

	          $q.resolve(expandingExpr(scope))
	            .then(function() {
	              element.removeClass('collapse')
	                .addClass('collapsing')
	                .attr('aria-expanded', true)
	                .attr('aria-hidden', false);

	              if ($animateCss) {
	                $animateCss(element, {
	                  addClass: 'in',
	                  easing: 'ease',
	                  css: {
	                    overflow: 'hidden'
	                  },
	                  to: getScrollFromElement(element[0])
	                }).start()['finally'](expandDone);
	              } else {
	                $animate.addClass(element, 'in', {
	                  css: {
	                    overflow: 'hidden'
	                  },
	                  to: getScrollFromElement(element[0])
	                }).then(expandDone);
	              }
	            });
	        }

	        function expandDone() {
	          element.removeClass('collapsing')
	            .addClass('collapse')
	            .css(css);
	          expandedExpr(scope);
	        }

	        function collapse() {
	          if (!element.hasClass('collapse') && !element.hasClass('in')) {
	            return collapseDone();
	          }

	          $q.resolve(collapsingExpr(scope))
	            .then(function() {
	              element
	              // IMPORTANT: The width must be set before adding "collapsing" class.
	              // Otherwise, the browser attempts to animate from width 0 (in
	              // collapsing class) to the given width here.
	                .css(getScrollFromElement(element[0]))
	                // initially all panel collapse have the collapse class, this removal
	                // prevents the animation from jumping to collapsed state
	                .removeClass('collapse')
	                .addClass('collapsing')
	                .attr('aria-expanded', false)
	                .attr('aria-hidden', true);

	              if ($animateCss) {
	                $animateCss(element, {
	                  removeClass: 'in',
	                  to: cssTo
	                }).start()['finally'](collapseDone);
	              } else {
	                $animate.removeClass(element, 'in', {
	                  to: cssTo
	                }).then(collapseDone);
	              }
	            });
	        }

	        function collapseDone() {
	          element.css(cssTo); // Required so that collapse works when animation is disabled
	          element.removeClass('collapsing')
	            .addClass('collapse');
	          collapsedExpr(scope);
	        }

	        scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
	          if (shouldCollapse) {
	            collapse();
	          } else {
	            expand();
	          }
	        });
	      }
	    };
	  }]);

	angular.module('ui.bootstrap.tabindex', [])

	.directive('uibTabindexToggle', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, elem, attrs) {
	      attrs.$observe('disabled', function(disabled) {
	        attrs.$set('tabindex', disabled ? -1 : null);
	      });
	    }
	  };
	});

	angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse', 'ui.bootstrap.tabindex'])

	.constant('uibAccordionConfig', {
	  closeOthers: true
	})

	.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
	  // This array keeps track of the accordion groups
	  this.groups = [];

	  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
	  this.closeOthers = function(openGroup) {
	    var closeOthers = angular.isDefined($attrs.closeOthers) ?
	      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
	    if (closeOthers) {
	      angular.forEach(this.groups, function(group) {
	        if (group !== openGroup) {
	          group.isOpen = false;
	        }
	      });
	    }
	  };

	  // This is called from the accordion-group directive to add itself to the accordion
	  this.addGroup = function(groupScope) {
	    var that = this;
	    this.groups.push(groupScope);

	    groupScope.$on('$destroy', function(event) {
	      that.removeGroup(groupScope);
	    });
	  };

	  // This is called from the accordion-group directive when to remove itself
	  this.removeGroup = function(group) {
	    var index = this.groups.indexOf(group);
	    if (index !== -1) {
	      this.groups.splice(index, 1);
	    }
	  };
	}])

	// The accordion directive simply sets up the directive controller
	// and adds an accordion CSS class to itself element.
	.directive('uibAccordion', function() {
	  return {
	    controller: 'UibAccordionController',
	    controllerAs: 'accordion',
	    transclude: true,
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/accordion/accordion.html';
	    }
	  };
	})

	// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
	.directive('uibAccordionGroup', function() {
	  return {
	    require: '^uibAccordion',         // We need this directive to be inside an accordion
	    transclude: true,              // It transcludes the contents of the directive into the template
	    restrict: 'A',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
	    },
	    scope: {
	      heading: '@',               // Interpolate the heading attribute onto this scope
	      panelClass: '@?',           // Ditto with panelClass
	      isOpen: '=?',
	      isDisabled: '=?'
	    },
	    controller: function() {
	      this.setHeading = function(element) {
	        this.heading = element;
	      };
	    },
	    link: function(scope, element, attrs, accordionCtrl) {
	      element.addClass('panel');
	      accordionCtrl.addGroup(scope);

	      scope.openClass = attrs.openClass || 'panel-open';
	      scope.panelClass = attrs.panelClass || 'panel-default';
	      scope.$watch('isOpen', function(value) {
	        element.toggleClass(scope.openClass, !!value);
	        if (value) {
	          accordionCtrl.closeOthers(scope);
	        }
	      });

	      scope.toggleOpen = function($event) {
	        if (!scope.isDisabled) {
	          if (!$event || $event.which === 32) {
	            scope.isOpen = !scope.isOpen;
	          }
	        }
	      };

	      var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
	      scope.headingId = id + '-tab';
	      scope.panelId = id + '-panel';
	    }
	  };
	})

	// Use accordion-heading below an accordion-group to provide a heading containing HTML
	.directive('uibAccordionHeading', function() {
	  return {
	    transclude: true,   // Grab the contents to be used as the heading
	    template: '',       // In effect remove this element!
	    replace: true,
	    require: '^uibAccordionGroup',
	    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
	      // Pass the heading to the accordion-group controller
	      // so that it can be transcluded into the right place in the template
	      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
	      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
	    }
	  };
	})

	// Use in the accordion-group template to indicate where you want the heading to be transcluded
	// You must provide the property on the accordion-group controller that will hold the transcluded element
	.directive('uibAccordionTransclude', function() {
	  return {
	    require: '^uibAccordionGroup',
	    link: function(scope, element, attrs, controller) {
	      scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
	        if (heading) {
	          var elem = angular.element(element[0].querySelector(getHeaderSelectors()));
	          elem.html('');
	          elem.append(heading);
	        }
	      });
	    }
	  };

	  function getHeaderSelectors() {
	      return 'uib-accordion-header,' +
	          'data-uib-accordion-header,' +
	          'x-uib-accordion-header,' +
	          'uib\\:accordion-header,' +
	          '[uib-accordion-header],' +
	          '[data-uib-accordion-header],' +
	          '[x-uib-accordion-header]';
	  }
	});

	angular.module('ui.bootstrap.alert', [])

	.controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
	  $scope.closeable = !!$attrs.close;
	  $element.addClass('alert');
	  $attrs.$set('role', 'alert');
	  if ($scope.closeable) {
	    $element.addClass('alert-dismissible');
	  }

	  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
	    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

	  if (dismissOnTimeout) {
	    $timeout(function() {
	      $scope.close();
	    }, parseInt(dismissOnTimeout, 10));
	  }
	}])

	.directive('uibAlert', function() {
	  return {
	    controller: 'UibAlertController',
	    controllerAs: 'alert',
	    restrict: 'A',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/alert/alert.html';
	    },
	    transclude: true,
	    scope: {
	      close: '&'
	    }
	  };
	});

	angular.module('ui.bootstrap.buttons', [])

	.constant('uibButtonConfig', {
	  activeClass: 'active',
	  toggleEvent: 'click'
	})

	.controller('UibButtonsController', ['uibButtonConfig', function(buttonConfig) {
	  this.activeClass = buttonConfig.activeClass || 'active';
	  this.toggleEvent = buttonConfig.toggleEvent || 'click';
	}])

	.directive('uibBtnRadio', ['$parse', function($parse) {
	  return {
	    require: ['uibBtnRadio', 'ngModel'],
	    controller: 'UibButtonsController',
	    controllerAs: 'buttons',
	    link: function(scope, element, attrs, ctrls) {
	      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
	      var uncheckableExpr = $parse(attrs.uibUncheckable);

	      element.find('input').css({display: 'none'});

	      //model -> UI
	      ngModelCtrl.$render = function() {
	        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.uibBtnRadio)));
	      };

	      //ui->model
	      element.on(buttonsCtrl.toggleEvent, function() {
	        if (attrs.disabled) {
	          return;
	        }

	        var isActive = element.hasClass(buttonsCtrl.activeClass);

	        if (!isActive || angular.isDefined(attrs.uncheckable)) {
	          scope.$apply(function() {
	            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.uibBtnRadio));
	            ngModelCtrl.$render();
	          });
	        }
	      });

	      if (attrs.uibUncheckable) {
	        scope.$watch(uncheckableExpr, function(uncheckable) {
	          attrs.$set('uncheckable', uncheckable ? '' : undefined);
	        });
	      }
	    }
	  };
	}])

	.directive('uibBtnCheckbox', function() {
	  return {
	    require: ['uibBtnCheckbox', 'ngModel'],
	    controller: 'UibButtonsController',
	    controllerAs: 'button',
	    link: function(scope, element, attrs, ctrls) {
	      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      element.find('input').css({display: 'none'});

	      function getTrueValue() {
	        return getCheckboxValue(attrs.btnCheckboxTrue, true);
	      }

	      function getFalseValue() {
	        return getCheckboxValue(attrs.btnCheckboxFalse, false);
	      }

	      function getCheckboxValue(attribute, defaultValue) {
	        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
	      }

	      //model -> UI
	      ngModelCtrl.$render = function() {
	        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
	      };

	      //ui->model
	      element.on(buttonsCtrl.toggleEvent, function() {
	        if (attrs.disabled) {
	          return;
	        }

	        scope.$apply(function() {
	          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
	          ngModelCtrl.$render();
	        });
	      });
	    }
	  };
	});

	angular.module('ui.bootstrap.carousel', [])

	.controller('UibCarouselController', ['$scope', '$element', '$interval', '$timeout', '$animate', function($scope, $element, $interval, $timeout, $animate) {
	  var self = this,
	    slides = self.slides = $scope.slides = [],
	    SLIDE_DIRECTION = 'uib-slideDirection',
	    currentIndex = $scope.active,
	    currentInterval, isPlaying, bufferedTransitions = [];

	  var destroyed = false;
	  $element.addClass('carousel');

	  self.addSlide = function(slide, element) {
	    slides.push({
	      slide: slide,
	      element: element
	    });
	    slides.sort(function(a, b) {
	      return +a.slide.index - +b.slide.index;
	    });
	    //if this is the first slide or the slide is set to active, select it
	    if (slide.index === $scope.active || slides.length === 1 && !angular.isNumber($scope.active)) {
	      if ($scope.$currentTransition) {
	        $scope.$currentTransition = null;
	      }

	      currentIndex = slide.index;
	      $scope.active = slide.index;
	      setActive(currentIndex);
	      self.select(slides[findSlideIndex(slide)]);
	      if (slides.length === 1) {
	        $scope.play();
	      }
	    }
	  };

	  self.getCurrentIndex = function() {
	    for (var i = 0; i < slides.length; i++) {
	      if (slides[i].slide.index === currentIndex) {
	        return i;
	      }
	    }
	  };

	  self.next = $scope.next = function() {
	    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

	    if (newIndex === 0 && $scope.noWrap()) {
	      $scope.pause();
	      return;
	    }

	    return self.select(slides[newIndex], 'next');
	  };

	  self.prev = $scope.prev = function() {
	    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

	    if ($scope.noWrap() && newIndex === slides.length - 1) {
	      $scope.pause();
	      return;
	    }

	    return self.select(slides[newIndex], 'prev');
	  };

	  self.removeSlide = function(slide) {
	    var index = findSlideIndex(slide);

	    var bufferedIndex = bufferedTransitions.indexOf(slides[index]);
	    if (bufferedIndex !== -1) {
	      bufferedTransitions.splice(bufferedIndex, 1);
	    }

	    //get the index of the slide inside the carousel
	    slides.splice(index, 1);
	    if (slides.length > 0 && currentIndex === index) {
	      if (index >= slides.length) {
	        currentIndex = slides.length - 1;
	        $scope.active = currentIndex;
	        setActive(currentIndex);
	        self.select(slides[slides.length - 1]);
	      } else {
	        currentIndex = index;
	        $scope.active = currentIndex;
	        setActive(currentIndex);
	        self.select(slides[index]);
	      }
	    } else if (currentIndex > index) {
	      currentIndex--;
	      $scope.active = currentIndex;
	    }

	    //clean the active value when no more slide
	    if (slides.length === 0) {
	      currentIndex = null;
	      $scope.active = null;
	      clearBufferedTransitions();
	    }
	  };

	  /* direction: "prev" or "next" */
	  self.select = $scope.select = function(nextSlide, direction) {
	    var nextIndex = findSlideIndex(nextSlide.slide);
	    //Decide direction if it's not given
	    if (direction === undefined) {
	      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
	    }
	    //Prevent this user-triggered transition from occurring if there is already one in progress
	    if (nextSlide.slide.index !== currentIndex &&
	      !$scope.$currentTransition) {
	      goNext(nextSlide.slide, nextIndex, direction);
	    } else if (nextSlide && nextSlide.slide.index !== currentIndex && $scope.$currentTransition) {
	      bufferedTransitions.push(slides[nextIndex]);
	    }
	  };

	  /* Allow outside people to call indexOf on slides array */
	  $scope.indexOfSlide = function(slide) {
	    return +slide.slide.index;
	  };

	  $scope.isActive = function(slide) {
	    return $scope.active === slide.slide.index;
	  };

	  $scope.isPrevDisabled = function() {
	    return $scope.active === 0 && $scope.noWrap();
	  };

	  $scope.isNextDisabled = function() {
	    return $scope.active === slides.length - 1 && $scope.noWrap();
	  };

	  $scope.pause = function() {
	    if (!$scope.noPause) {
	      isPlaying = false;
	      resetTimer();
	    }
	  };

	  $scope.play = function() {
	    if (!isPlaying) {
	      isPlaying = true;
	      restartTimer();
	    }
	  };

	  $element.on('mouseenter', $scope.pause);
	  $element.on('mouseleave', $scope.play);

	  $scope.$on('$destroy', function() {
	    destroyed = true;
	    resetTimer();
	  });

	  $scope.$watch('noTransition', function(noTransition) {
	    $animate.enabled($element, !noTransition);
	  });

	  $scope.$watch('interval', restartTimer);

	  $scope.$watchCollection('slides', resetTransition);

	  $scope.$watch('active', function(index) {
	    if (angular.isNumber(index) && currentIndex !== index) {
	      for (var i = 0; i < slides.length; i++) {
	        if (slides[i].slide.index === index) {
	          index = i;
	          break;
	        }
	      }

	      var slide = slides[index];
	      if (slide) {
	        setActive(index);
	        self.select(slides[index]);
	        currentIndex = index;
	      }
	    }
	  });

	  function clearBufferedTransitions() {
	    while (bufferedTransitions.length) {
	      bufferedTransitions.shift();
	    }
	  }

	  function getSlideByIndex(index) {
	    for (var i = 0, l = slides.length; i < l; ++i) {
	      if (slides[i].index === index) {
	        return slides[i];
	      }
	    }
	  }

	  function setActive(index) {
	    for (var i = 0; i < slides.length; i++) {
	      slides[i].slide.active = i === index;
	    }
	  }

	  function goNext(slide, index, direction) {
	    if (destroyed) {
	      return;
	    }

	    angular.extend(slide, {direction: direction});
	    angular.extend(slides[currentIndex].slide || {}, {direction: direction});
	    if ($animate.enabled($element) && !$scope.$currentTransition &&
	      slides[index].element && self.slides.length > 1) {
	      slides[index].element.data(SLIDE_DIRECTION, slide.direction);
	      var currentIdx = self.getCurrentIndex();

	      if (angular.isNumber(currentIdx) && slides[currentIdx].element) {
	        slides[currentIdx].element.data(SLIDE_DIRECTION, slide.direction);
	      }

	      $scope.$currentTransition = true;
	      $animate.on('addClass', slides[index].element, function(element, phase) {
	        if (phase === 'close') {
	          $scope.$currentTransition = null;
	          $animate.off('addClass', element);
	          if (bufferedTransitions.length) {
	            var nextSlide = bufferedTransitions.pop().slide;
	            var nextIndex = nextSlide.index;
	            var nextDirection = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
	            clearBufferedTransitions();

	            goNext(nextSlide, nextIndex, nextDirection);
	          }
	        }
	      });
	    }

	    $scope.active = slide.index;
	    currentIndex = slide.index;
	    setActive(index);

	    //every time you change slides, reset the timer
	    restartTimer();
	  }

	  function findSlideIndex(slide) {
	    for (var i = 0; i < slides.length; i++) {
	      if (slides[i].slide === slide) {
	        return i;
	      }
	    }
	  }

	  function resetTimer() {
	    if (currentInterval) {
	      $interval.cancel(currentInterval);
	      currentInterval = null;
	    }
	  }

	  function resetTransition(slides) {
	    if (!slides.length) {
	      $scope.$currentTransition = null;
	      clearBufferedTransitions();
	    }
	  }

	  function restartTimer() {
	    resetTimer();
	    var interval = +$scope.interval;
	    if (!isNaN(interval) && interval > 0) {
	      currentInterval = $interval(timerFn, interval);
	    }
	  }

	  function timerFn() {
	    var interval = +$scope.interval;
	    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
	      $scope.next();
	    } else {
	      $scope.pause();
	    }
	  }
	}])

	.directive('uibCarousel', function() {
	  return {
	    transclude: true,
	    controller: 'UibCarouselController',
	    controllerAs: 'carousel',
	    restrict: 'A',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/carousel/carousel.html';
	    },
	    scope: {
	      active: '=',
	      interval: '=',
	      noTransition: '=',
	      noPause: '=',
	      noWrap: '&'
	    }
	  };
	})

	.directive('uibSlide', ['$animate', function($animate) {
	  return {
	    require: '^uibCarousel',
	    restrict: 'A',
	    transclude: true,
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/carousel/slide.html';
	    },
	    scope: {
	      actual: '=?',
	      index: '=?'
	    },
	    link: function (scope, element, attrs, carouselCtrl) {
	      element.addClass('item');
	      carouselCtrl.addSlide(scope, element);
	      //when the scope is destroyed then remove the slide from the current slides array
	      scope.$on('$destroy', function() {
	        carouselCtrl.removeSlide(scope);
	      });

	      scope.$watch('active', function(active) {
	        $animate[active ? 'addClass' : 'removeClass'](element, 'active');
	      });
	    }
	  };
	}])

	.animation('.item', ['$animateCss',
	function($animateCss) {
	  var SLIDE_DIRECTION = 'uib-slideDirection';

	  function removeClass(element, className, callback) {
	    element.removeClass(className);
	    if (callback) {
	      callback();
	    }
	  }

	  return {
	    beforeAddClass: function(element, className, done) {
	      if (className === 'active') {
	        var stopped = false;
	        var direction = element.data(SLIDE_DIRECTION);
	        var directionClass = direction === 'next' ? 'left' : 'right';
	        var removeClassFn = removeClass.bind(this, element,
	          directionClass + ' ' + direction, done);
	        element.addClass(direction);

	        $animateCss(element, {addClass: directionClass})
	          .start()
	          .done(removeClassFn);

	        return function() {
	          stopped = true;
	        };
	      }
	      done();
	    },
	    beforeRemoveClass: function (element, className, done) {
	      if (className === 'active') {
	        var stopped = false;
	        var direction = element.data(SLIDE_DIRECTION);
	        var directionClass = direction === 'next' ? 'left' : 'right';
	        var removeClassFn = removeClass.bind(this, element, directionClass, done);

	        $animateCss(element, {addClass: directionClass})
	          .start()
	          .done(removeClassFn);

	        return function() {
	          stopped = true;
	        };
	      }
	      done();
	    }
	  };
	}]);

	angular.module('ui.bootstrap.dateparser', [])

	.service('uibDateParser', ['$log', '$locale', 'dateFilter', 'orderByFilter', function($log, $locale, dateFilter, orderByFilter) {
	  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
	  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

	  var localeId;
	  var formatCodeToRegex;

	  this.init = function() {
	    localeId = $locale.id;

	    this.parsers = {};
	    this.formatters = {};

	    formatCodeToRegex = [
	      {
	        key: 'yyyy',
	        regex: '\\d{4}',
	        apply: function(value) { this.year = +value; },
	        formatter: function(date) {
	          var _date = new Date();
	          _date.setFullYear(Math.abs(date.getFullYear()));
	          return dateFilter(_date, 'yyyy');
	        }
	      },
	      {
	        key: 'yy',
	        regex: '\\d{2}',
	        apply: function(value) { value = +value; this.year = value < 69 ? value + 2000 : value + 1900; },
	        formatter: function(date) {
	          var _date = new Date();
	          _date.setFullYear(Math.abs(date.getFullYear()));
	          return dateFilter(_date, 'yy');
	        }
	      },
	      {
	        key: 'y',
	        regex: '\\d{1,4}',
	        apply: function(value) { this.year = +value; },
	        formatter: function(date) {
	          var _date = new Date();
	          _date.setFullYear(Math.abs(date.getFullYear()));
	          return dateFilter(_date, 'y');
	        }
	      },
	      {
	        key: 'M!',
	        regex: '0?[1-9]|1[0-2]',
	        apply: function(value) { this.month = value - 1; },
	        formatter: function(date) {
	          var value = date.getMonth();
	          if (/^[0-9]$/.test(value)) {
	            return dateFilter(date, 'MM');
	          }

	          return dateFilter(date, 'M');
	        }
	      },
	      {
	        key: 'MMMM',
	        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
	        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); },
	        formatter: function(date) { return dateFilter(date, 'MMMM'); }
	      },
	      {
	        key: 'MMM',
	        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
	        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); },
	        formatter: function(date) { return dateFilter(date, 'MMM'); }
	      },
	      {
	        key: 'MM',
	        regex: '0[1-9]|1[0-2]',
	        apply: function(value) { this.month = value - 1; },
	        formatter: function(date) { return dateFilter(date, 'MM'); }
	      },
	      {
	        key: 'M',
	        regex: '[1-9]|1[0-2]',
	        apply: function(value) { this.month = value - 1; },
	        formatter: function(date) { return dateFilter(date, 'M'); }
	      },
	      {
	        key: 'd!',
	        regex: '[0-2]?[0-9]{1}|3[0-1]{1}',
	        apply: function(value) { this.date = +value; },
	        formatter: function(date) {
	          var value = date.getDate();
	          if (/^[1-9]$/.test(value)) {
	            return dateFilter(date, 'dd');
	          }

	          return dateFilter(date, 'd');
	        }
	      },
	      {
	        key: 'dd',
	        regex: '[0-2][0-9]{1}|3[0-1]{1}',
	        apply: function(value) { this.date = +value; },
	        formatter: function(date) { return dateFilter(date, 'dd'); }
	      },
	      {
	        key: 'd',
	        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
	        apply: function(value) { this.date = +value; },
	        formatter: function(date) { return dateFilter(date, 'd'); }
	      },
	      {
	        key: 'EEEE',
	        regex: $locale.DATETIME_FORMATS.DAY.join('|'),
	        formatter: function(date) { return dateFilter(date, 'EEEE'); }
	      },
	      {
	        key: 'EEE',
	        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
	        formatter: function(date) { return dateFilter(date, 'EEE'); }
	      },
	      {
	        key: 'HH',
	        regex: '(?:0|1)[0-9]|2[0-3]',
	        apply: function(value) { this.hours = +value; },
	        formatter: function(date) { return dateFilter(date, 'HH'); }
	      },
	      {
	        key: 'hh',
	        regex: '0[0-9]|1[0-2]',
	        apply: function(value) { this.hours = +value; },
	        formatter: function(date) { return dateFilter(date, 'hh'); }
	      },
	      {
	        key: 'H',
	        regex: '1?[0-9]|2[0-3]',
	        apply: function(value) { this.hours = +value; },
	        formatter: function(date) { return dateFilter(date, 'H'); }
	      },
	      {
	        key: 'h',
	        regex: '[0-9]|1[0-2]',
	        apply: function(value) { this.hours = +value; },
	        formatter: function(date) { return dateFilter(date, 'h'); }
	      },
	      {
	        key: 'mm',
	        regex: '[0-5][0-9]',
	        apply: function(value) { this.minutes = +value; },
	        formatter: function(date) { return dateFilter(date, 'mm'); }
	      },
	      {
	        key: 'm',
	        regex: '[0-9]|[1-5][0-9]',
	        apply: function(value) { this.minutes = +value; },
	        formatter: function(date) { return dateFilter(date, 'm'); }
	      },
	      {
	        key: 'sss',
	        regex: '[0-9][0-9][0-9]',
	        apply: function(value) { this.milliseconds = +value; },
	        formatter: function(date) { return dateFilter(date, 'sss'); }
	      },
	      {
	        key: 'ss',
	        regex: '[0-5][0-9]',
	        apply: function(value) { this.seconds = +value; },
	        formatter: function(date) { return dateFilter(date, 'ss'); }
	      },
	      {
	        key: 's',
	        regex: '[0-9]|[1-5][0-9]',
	        apply: function(value) { this.seconds = +value; },
	        formatter: function(date) { return dateFilter(date, 's'); }
	      },
	      {
	        key: 'a',
	        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
	        apply: function(value) {
	          if (this.hours === 12) {
	            this.hours = 0;
	          }

	          if (value === 'PM') {
	            this.hours += 12;
	          }
	        },
	        formatter: function(date) { return dateFilter(date, 'a'); }
	      },
	      {
	        key: 'Z',
	        regex: '[+-]\\d{4}',
	        apply: function(value) {
	          var matches = value.match(/([+-])(\d{2})(\d{2})/),
	            sign = matches[1],
	            hours = matches[2],
	            minutes = matches[3];
	          this.hours += toInt(sign + hours);
	          this.minutes += toInt(sign + minutes);
	        },
	        formatter: function(date) {
	          return dateFilter(date, 'Z');
	        }
	      },
	      {
	        key: 'ww',
	        regex: '[0-4][0-9]|5[0-3]',
	        formatter: function(date) { return dateFilter(date, 'ww'); }
	      },
	      {
	        key: 'w',
	        regex: '[0-9]|[1-4][0-9]|5[0-3]',
	        formatter: function(date) { return dateFilter(date, 'w'); }
	      },
	      {
	        key: 'GGGG',
	        regex: $locale.DATETIME_FORMATS.ERANAMES.join('|').replace(/\s/g, '\\s'),
	        formatter: function(date) { return dateFilter(date, 'GGGG'); }
	      },
	      {
	        key: 'GGG',
	        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
	        formatter: function(date) { return dateFilter(date, 'GGG'); }
	      },
	      {
	        key: 'GG',
	        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
	        formatter: function(date) { return dateFilter(date, 'GG'); }
	      },
	      {
	        key: 'G',
	        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
	        formatter: function(date) { return dateFilter(date, 'G'); }
	      }
	    ];
	  };

	  this.init();

	  function createParser(format) {
	    var map = [], regex = format.split('');

	    // check for literal values
	    var quoteIndex = format.indexOf('\'');
	    if (quoteIndex > -1) {
	      var inLiteral = false;
	      format = format.split('');
	      for (var i = quoteIndex; i < format.length; i++) {
	        if (inLiteral) {
	          if (format[i] === '\'') {
	            if (i + 1 < format.length && format[i+1] === '\'') { // escaped single quote
	              format[i+1] = '$';
	              regex[i+1] = '';
	            } else { // end of literal
	              regex[i] = '';
	              inLiteral = false;
	            }
	          }
	          format[i] = '$';
	        } else {
	          if (format[i] === '\'') { // start of literal
	            format[i] = '$';
	            regex[i] = '';
	            inLiteral = true;
	          }
	        }
	      }

	      format = format.join('');
	    }

	    angular.forEach(formatCodeToRegex, function(data) {
	      var index = format.indexOf(data.key);

	      if (index > -1) {
	        format = format.split('');

	        regex[index] = '(' + data.regex + ')';
	        format[index] = '$'; // Custom symbol to define consumed part of format
	        for (var i = index + 1, n = index + data.key.length; i < n; i++) {
	          regex[i] = '';
	          format[i] = '$';
	        }
	        format = format.join('');

	        map.push({
	          index: index,
	          key: data.key,
	          apply: data.apply,
	          matcher: data.regex
	        });
	      }
	    });

	    return {
	      regex: new RegExp('^' + regex.join('') + '$'),
	      map: orderByFilter(map, 'index')
	    };
	  }

	  function createFormatter(format) {
	    var formatters = [];
	    var i = 0;
	    var formatter, literalIdx;
	    while (i < format.length) {
	      if (angular.isNumber(literalIdx)) {
	        if (format.charAt(i) === '\'') {
	          if (i + 1 >= format.length || format.charAt(i + 1) !== '\'') {
	            formatters.push(constructLiteralFormatter(format, literalIdx, i));
	            literalIdx = null;
	          }
	        } else if (i === format.length) {
	          while (literalIdx < format.length) {
	            formatter = constructFormatterFromIdx(format, literalIdx);
	            formatters.push(formatter);
	            literalIdx = formatter.endIdx;
	          }
	        }

	        i++;
	        continue;
	      }

	      if (format.charAt(i) === '\'') {
	        literalIdx = i;
	        i++;
	        continue;
	      }

	      formatter = constructFormatterFromIdx(format, i);

	      formatters.push(formatter.parser);
	      i = formatter.endIdx;
	    }

	    return formatters;
	  }

	  function constructLiteralFormatter(format, literalIdx, endIdx) {
	    return function() {
	      return format.substr(literalIdx + 1, endIdx - literalIdx - 1);
	    };
	  }

	  function constructFormatterFromIdx(format, i) {
	    var currentPosStr = format.substr(i);
	    for (var j = 0; j < formatCodeToRegex.length; j++) {
	      if (new RegExp('^' + formatCodeToRegex[j].key).test(currentPosStr)) {
	        var data = formatCodeToRegex[j];
	        return {
	          endIdx: i + data.key.length,
	          parser: data.formatter
	        };
	      }
	    }

	    return {
	      endIdx: i + 1,
	      parser: function() {
	        return currentPosStr.charAt(0);
	      }
	    };
	  }

	  this.filter = function(date, format) {
	    if (!angular.isDate(date) || isNaN(date) || !format) {
	      return '';
	    }

	    format = $locale.DATETIME_FORMATS[format] || format;

	    if ($locale.id !== localeId) {
	      this.init();
	    }

	    if (!this.formatters[format]) {
	      this.formatters[format] = createFormatter(format);
	    }

	    var formatters = this.formatters[format];

	    return formatters.reduce(function(str, formatter) {
	      return str + formatter(date);
	    }, '');
	  };

	  this.parse = function(input, format, baseDate) {
	    if (!angular.isString(input) || !format) {
	      return input;
	    }

	    format = $locale.DATETIME_FORMATS[format] || format;
	    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

	    if ($locale.id !== localeId) {
	      this.init();
	    }

	    if (!this.parsers[format]) {
	      this.parsers[format] = createParser(format, 'apply');
	    }

	    var parser = this.parsers[format],
	        regex = parser.regex,
	        map = parser.map,
	        results = input.match(regex),
	        tzOffset = false;
	    if (results && results.length) {
	      var fields, dt;
	      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
	        fields = {
	          year: baseDate.getFullYear(),
	          month: baseDate.getMonth(),
	          date: baseDate.getDate(),
	          hours: baseDate.getHours(),
	          minutes: baseDate.getMinutes(),
	          seconds: baseDate.getSeconds(),
	          milliseconds: baseDate.getMilliseconds()
	        };
	      } else {
	        if (baseDate) {
	          $log.warn('dateparser:', 'baseDate is not a valid date');
	        }
	        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
	      }

	      for (var i = 1, n = results.length; i < n; i++) {
	        var mapper = map[i - 1];
	        if (mapper.matcher === 'Z') {
	          tzOffset = true;
	        }

	        if (mapper.apply) {
	          mapper.apply.call(fields, results[i]);
	        }
	      }

	      var datesetter = tzOffset ? Date.prototype.setUTCFullYear :
	        Date.prototype.setFullYear;
	      var timesetter = tzOffset ? Date.prototype.setUTCHours :
	        Date.prototype.setHours;

	      if (isValid(fields.year, fields.month, fields.date)) {
	        if (angular.isDate(baseDate) && !isNaN(baseDate.getTime()) && !tzOffset) {
	          dt = new Date(baseDate);
	          datesetter.call(dt, fields.year, fields.month, fields.date);
	          timesetter.call(dt, fields.hours, fields.minutes,
	            fields.seconds, fields.milliseconds);
	        } else {
	          dt = new Date(0);
	          datesetter.call(dt, fields.year, fields.month, fields.date);
	          timesetter.call(dt, fields.hours || 0, fields.minutes || 0,
	            fields.seconds || 0, fields.milliseconds || 0);
	        }
	      }

	      return dt;
	    }
	  };

	  // Check if date is valid for specific month (and year for February).
	  // Month: 0 = Jan, 1 = Feb, etc
	  function isValid(year, month, date) {
	    if (date < 1) {
	      return false;
	    }

	    if (month === 1 && date > 28) {
	      return date === 29 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
	    }

	    if (month === 3 || month === 5 || month === 8 || month === 10) {
	      return date < 31;
	    }

	    return true;
	  }

	  function toInt(str) {
	    return parseInt(str, 10);
	  }

	  this.toTimezone = toTimezone;
	  this.fromTimezone = fromTimezone;
	  this.timezoneToOffset = timezoneToOffset;
	  this.addDateMinutes = addDateMinutes;
	  this.convertTimezoneToLocal = convertTimezoneToLocal;

	  function toTimezone(date, timezone) {
	    return date && timezone ? convertTimezoneToLocal(date, timezone) : date;
	  }

	  function fromTimezone(date, timezone) {
	    return date && timezone ? convertTimezoneToLocal(date, timezone, true) : date;
	  }

	  //https://github.com/angular/angular.js/blob/622c42169699ec07fc6daaa19fe6d224e5d2f70e/src/Angular.js#L1207
	  function timezoneToOffset(timezone, fallback) {
	    timezone = timezone.replace(/:/g, '');
	    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
	    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
	  }

	  function addDateMinutes(date, minutes) {
	    date = new Date(date.getTime());
	    date.setMinutes(date.getMinutes() + minutes);
	    return date;
	  }

	  function convertTimezoneToLocal(date, timezone, reverse) {
	    reverse = reverse ? -1 : 1;
	    var dateTimezoneOffset = date.getTimezoneOffset();
	    var timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
	    return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset));
	  }
	}]);

	// Avoiding use of ng-class as it creates a lot of watchers when a class is to be applied to
	// at most one element.
	angular.module('ui.bootstrap.isClass', [])
	.directive('uibIsClass', [
	         '$animate',
	function ($animate) {
	  //                    11111111          22222222
	  var ON_REGEXP = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
	  //                    11111111           22222222
	  var IS_REGEXP = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;

	  var dataPerTracked = {};

	  return {
	    restrict: 'A',
	    compile: function(tElement, tAttrs) {
	      var linkedScopes = [];
	      var instances = [];
	      var expToData = {};
	      var lastActivated = null;
	      var onExpMatches = tAttrs.uibIsClass.match(ON_REGEXP);
	      var onExp = onExpMatches[2];
	      var expsStr = onExpMatches[1];
	      var exps = expsStr.split(',');

	      return linkFn;

	      function linkFn(scope, element, attrs) {
	        linkedScopes.push(scope);
	        instances.push({
	          scope: scope,
	          element: element
	        });

	        exps.forEach(function(exp, k) {
	          addForExp(exp, scope);
	        });

	        scope.$on('$destroy', removeScope);
	      }

	      function addForExp(exp, scope) {
	        var matches = exp.match(IS_REGEXP);
	        var clazz = scope.$eval(matches[1]);
	        var compareWithExp = matches[2];
	        var data = expToData[exp];
	        if (!data) {
	          var watchFn = function(compareWithVal) {
	            var newActivated = null;
	            instances.some(function(instance) {
	              var thisVal = instance.scope.$eval(onExp);
	              if (thisVal === compareWithVal) {
	                newActivated = instance;
	                return true;
	              }
	            });
	            if (data.lastActivated !== newActivated) {
	              if (data.lastActivated) {
	                $animate.removeClass(data.lastActivated.element, clazz);
	              }
	              if (newActivated) {
	                $animate.addClass(newActivated.element, clazz);
	              }
	              data.lastActivated = newActivated;
	            }
	          };
	          expToData[exp] = data = {
	            lastActivated: null,
	            scope: scope,
	            watchFn: watchFn,
	            compareWithExp: compareWithExp,
	            watcher: scope.$watch(compareWithExp, watchFn)
	          };
	        }
	        data.watchFn(scope.$eval(compareWithExp));
	      }

	      function removeScope(e) {
	        var removedScope = e.targetScope;
	        var index = linkedScopes.indexOf(removedScope);
	        linkedScopes.splice(index, 1);
	        instances.splice(index, 1);
	        if (linkedScopes.length) {
	          var newWatchScope = linkedScopes[0];
	          angular.forEach(expToData, function(data) {
	            if (data.scope === removedScope) {
	              data.watcher = newWatchScope.$watch(data.compareWithExp, data.watchFn);
	              data.scope = newWatchScope;
	            }
	          });
	        } else {
	          expToData = {};
	        }
	      }
	    }
	  };
	}]);
	angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.isClass'])

	.value('$datepickerSuppressError', false)

	.value('$datepickerLiteralWarning', true)

	.constant('uibDatepickerConfig', {
	  datepickerMode: 'day',
	  formatDay: 'dd',
	  formatMonth: 'MMMM',
	  formatYear: 'yyyy',
	  formatDayHeader: 'EEE',
	  formatDayTitle: 'MMMM yyyy',
	  formatMonthTitle: 'yyyy',
	  maxDate: null,
	  maxMode: 'year',
	  minDate: null,
	  minMode: 'day',
	  monthColumns: 3,
	  ngModelOptions: {},
	  shortcutPropagation: false,
	  showWeeks: true,
	  yearColumns: 5,
	  yearRows: 4
	})

	.controller('UibDatepickerController', ['$scope', '$element', '$attrs', '$parse', '$interpolate', '$locale', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerLiteralWarning', '$datepickerSuppressError', 'uibDateParser',
	  function($scope, $element, $attrs, $parse, $interpolate, $locale, $log, dateFilter, datepickerConfig, $datepickerLiteralWarning, $datepickerSuppressError, dateParser) {
	  var self = this,
	      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl;
	      ngModelOptions = {},
	      watchListeners = [];

	  $element.addClass('uib-datepicker');
	  $attrs.$set('role', 'application');

	  if (!$scope.datepickerOptions) {
	    $scope.datepickerOptions = {};
	  }

	  // Modes chain
	  this.modes = ['day', 'month', 'year'];

	  [
	    'customClass',
	    'dateDisabled',
	    'datepickerMode',
	    'formatDay',
	    'formatDayHeader',
	    'formatDayTitle',
	    'formatMonth',
	    'formatMonthTitle',
	    'formatYear',
	    'maxDate',
	    'maxMode',
	    'minDate',
	    'minMode',
	    'monthColumns',
	    'showWeeks',
	    'shortcutPropagation',
	    'startingDay',
	    'yearColumns',
	    'yearRows'
	  ].forEach(function(key) {
	    switch (key) {
	      case 'customClass':
	      case 'dateDisabled':
	        $scope[key] = $scope.datepickerOptions[key] || angular.noop;
	        break;
	      case 'datepickerMode':
	        $scope.datepickerMode = angular.isDefined($scope.datepickerOptions.datepickerMode) ?
	          $scope.datepickerOptions.datepickerMode : datepickerConfig.datepickerMode;
	        break;
	      case 'formatDay':
	      case 'formatDayHeader':
	      case 'formatDayTitle':
	      case 'formatMonth':
	      case 'formatMonthTitle':
	      case 'formatYear':
	        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
	          $interpolate($scope.datepickerOptions[key])($scope.$parent) :
	          datepickerConfig[key];
	        break;
	      case 'monthColumns':
	      case 'showWeeks':
	      case 'shortcutPropagation':
	      case 'yearColumns':
	      case 'yearRows':
	        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
	          $scope.datepickerOptions[key] : datepickerConfig[key];
	        break;
	      case 'startingDay':
	        if (angular.isDefined($scope.datepickerOptions.startingDay)) {
	          self.startingDay = $scope.datepickerOptions.startingDay;
	        } else if (angular.isNumber(datepickerConfig.startingDay)) {
	          self.startingDay = datepickerConfig.startingDay;
	        } else {
	          self.startingDay = ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
	        }

	        break;
	      case 'maxDate':
	      case 'minDate':
	        $scope.$watch('datepickerOptions.' + key, function(value) {
	          if (value) {
	            if (angular.isDate(value)) {
	              self[key] = dateParser.fromTimezone(new Date(value), ngModelOptions.timezone);
	            } else {
	              if ($datepickerLiteralWarning) {
	                $log.warn('Literal date support has been deprecated, please switch to date object usage');
	              }

	              self[key] = new Date(dateFilter(value, 'medium'));
	            }
	          } else {
	            self[key] = datepickerConfig[key] ?
	              dateParser.fromTimezone(new Date(datepickerConfig[key]), ngModelOptions.timezone) :
	              null;
	          }

	          self.refreshView();
	        });

	        break;
	      case 'maxMode':
	      case 'minMode':
	        if ($scope.datepickerOptions[key]) {
	          $scope.$watch(function() { return $scope.datepickerOptions[key]; }, function(value) {
	            self[key] = $scope[key] = angular.isDefined(value) ? value : $scope.datepickerOptions[key];
	            if (key === 'minMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) < self.modes.indexOf(self[key]) ||
	              key === 'maxMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) > self.modes.indexOf(self[key])) {
	              $scope.datepickerMode = self[key];
	              $scope.datepickerOptions.datepickerMode = self[key];
	            }
	          });
	        } else {
	          self[key] = $scope[key] = datepickerConfig[key] || null;
	        }

	        break;
	    }
	  });

	  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

	  $scope.disabled = angular.isDefined($attrs.disabled) || false;
	  if (angular.isDefined($attrs.ngDisabled)) {
	    watchListeners.push($scope.$parent.$watch($attrs.ngDisabled, function(disabled) {
	      $scope.disabled = disabled;
	      self.refreshView();
	    }));
	  }

	  $scope.isActive = function(dateObject) {
	    if (self.compare(dateObject.date, self.activeDate) === 0) {
	      $scope.activeDateId = dateObject.uid;
	      return true;
	    }
	    return false;
	  };

	  this.init = function(ngModelCtrl_) {
	    ngModelCtrl = ngModelCtrl_;
	    ngModelOptions = ngModelCtrl_.$options ||
	      $scope.datepickerOptions.ngModelOptions ||
	      datepickerConfig.ngModelOptions;
	    if ($scope.datepickerOptions.initDate) {
	      self.activeDate = dateParser.fromTimezone($scope.datepickerOptions.initDate, ngModelOptions.timezone) || new Date();
	      $scope.$watch('datepickerOptions.initDate', function(initDate) {
	        if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
	          self.activeDate = dateParser.fromTimezone(initDate, ngModelOptions.timezone);
	          self.refreshView();
	        }
	      });
	    } else {
	      self.activeDate = new Date();
	    }

	    var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date();
	    this.activeDate = !isNaN(date) ?
	      dateParser.fromTimezone(date, ngModelOptions.timezone) :
	      dateParser.fromTimezone(new Date(), ngModelOptions.timezone);

	    ngModelCtrl.$render = function() {
	      self.render();
	    };
	  };

	  this.render = function() {
	    if (ngModelCtrl.$viewValue) {
	      var date = new Date(ngModelCtrl.$viewValue),
	          isValid = !isNaN(date);

	      if (isValid) {
	        this.activeDate = dateParser.fromTimezone(date, ngModelOptions.timezone);
	      } else if (!$datepickerSuppressError) {
	        $log.error('Datepicker directive: "ng-model" value must be a Date object');
	      }
	    }
	    this.refreshView();
	  };

	  this.refreshView = function() {
	    if (this.element) {
	      $scope.selectedDt = null;
	      this._refreshView();
	      if ($scope.activeDt) {
	        $scope.activeDateId = $scope.activeDt.uid;
	      }

	      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
	      date = dateParser.fromTimezone(date, ngModelOptions.timezone);
	      ngModelCtrl.$setValidity('dateDisabled', !date ||
	        this.element && !this.isDisabled(date));
	    }
	  };

	  this.createDateObject = function(date, format) {
	    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
	    model = dateParser.fromTimezone(model, ngModelOptions.timezone);
	    var today = new Date();
	    today = dateParser.fromTimezone(today, ngModelOptions.timezone);
	    var time = this.compare(date, today);
	    var dt = {
	      date: date,
	      label: dateParser.filter(date, format),
	      selected: model && this.compare(date, model) === 0,
	      disabled: this.isDisabled(date),
	      past: time < 0,
	      current: time === 0,
	      future: time > 0,
	      customClass: this.customClass(date) || null
	    };

	    if (model && this.compare(date, model) === 0) {
	      $scope.selectedDt = dt;
	    }

	    if (self.activeDate && this.compare(dt.date, self.activeDate) === 0) {
	      $scope.activeDt = dt;
	    }

	    return dt;
	  };

	  this.isDisabled = function(date) {
	    return $scope.disabled ||
	      this.minDate && this.compare(date, this.minDate) < 0 ||
	      this.maxDate && this.compare(date, this.maxDate) > 0 ||
	      $scope.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode});
	  };

	  this.customClass = function(date) {
	    return $scope.customClass({date: date, mode: $scope.datepickerMode});
	  };

	  // Split array into smaller arrays
	  this.split = function(arr, size) {
	    var arrays = [];
	    while (arr.length > 0) {
	      arrays.push(arr.splice(0, size));
	    }
	    return arrays;
	  };

	  $scope.select = function(date) {
	    if ($scope.datepickerMode === self.minMode) {
	      var dt = ngModelCtrl.$viewValue ? dateParser.fromTimezone(new Date(ngModelCtrl.$viewValue), ngModelOptions.timezone) : new Date(0, 0, 0, 0, 0, 0, 0);
	      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
	      dt = dateParser.toTimezone(dt, ngModelOptions.timezone);
	      ngModelCtrl.$setViewValue(dt);
	      ngModelCtrl.$render();
	    } else {
	      self.activeDate = date;
	      setMode(self.modes[self.modes.indexOf($scope.datepickerMode) - 1]);

	      $scope.$emit('uib:datepicker.mode');
	    }

	    $scope.$broadcast('uib:datepicker.focus');
	  };

	  $scope.move = function(direction) {
	    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
	        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
	    self.activeDate.setFullYear(year, month, 1);
	    self.refreshView();
	  };

	  $scope.toggleMode = function(direction) {
	    direction = direction || 1;

	    if ($scope.datepickerMode === self.maxMode && direction === 1 ||
	      $scope.datepickerMode === self.minMode && direction === -1) {
	      return;
	    }

	    setMode(self.modes[self.modes.indexOf($scope.datepickerMode) + direction]);

	    $scope.$emit('uib:datepicker.mode');
	  };

	  // Key event mapper
	  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

	  var focusElement = function() {
	    self.element[0].focus();
	  };

	  // Listen for focus requests from popup directive
	  $scope.$on('uib:datepicker.focus', focusElement);

	  $scope.keydown = function(evt) {
	    var key = $scope.keys[evt.which];

	    if (!key || evt.shiftKey || evt.altKey || $scope.disabled) {
	      return;
	    }

	    evt.preventDefault();
	    if (!self.shortcutPropagation) {
	      evt.stopPropagation();
	    }

	    if (key === 'enter' || key === 'space') {
	      if (self.isDisabled(self.activeDate)) {
	        return; // do nothing
	      }
	      $scope.select(self.activeDate);
	    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
	      $scope.toggleMode(key === 'up' ? 1 : -1);
	    } else {
	      self.handleKeyDown(key, evt);
	      self.refreshView();
	    }
	  };

	  $element.on('keydown', function(evt) {
	    $scope.$apply(function() {
	      $scope.keydown(evt);
	    });
	  });

	  $scope.$on('$destroy', function() {
	    //Clear all watch listeners on destroy
	    while (watchListeners.length) {
	      watchListeners.shift()();
	    }
	  });

	  function setMode(mode) {
	    $scope.datepickerMode = mode;
	    $scope.datepickerOptions.datepickerMode = mode;
	  }
	}])

	.controller('UibDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
	  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	  this.step = { months: 1 };
	  this.element = $element;
	  function getDaysInMonth(year, month) {
	    return month === 1 && year % 4 === 0 &&
	      (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
	  }

	  this.init = function(ctrl) {
	    angular.extend(ctrl, this);
	    scope.showWeeks = ctrl.showWeeks;
	    ctrl.refreshView();
	  };

	  this.getDates = function(startDate, n) {
	    var dates = new Array(n), current = new Date(startDate), i = 0, date;
	    while (i < n) {
	      date = new Date(current);
	      dates[i++] = date;
	      current.setDate(current.getDate() + 1);
	    }
	    return dates;
	  };

	  this._refreshView = function() {
	    var year = this.activeDate.getFullYear(),
	      month = this.activeDate.getMonth(),
	      firstDayOfMonth = new Date(this.activeDate);

	    firstDayOfMonth.setFullYear(year, month, 1);

	    var difference = this.startingDay - firstDayOfMonth.getDay(),
	      numDisplayedFromPreviousMonth = difference > 0 ?
	        7 - difference : - difference,
	      firstDate = new Date(firstDayOfMonth);

	    if (numDisplayedFromPreviousMonth > 0) {
	      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
	    }

	    // 42 is the number of days on a six-week calendar
	    var days = this.getDates(firstDate, 42);
	    for (var i = 0; i < 42; i ++) {
	      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
	        secondary: days[i].getMonth() !== month,
	        uid: scope.uniqueId + '-' + i
	      });
	    }

	    scope.labels = new Array(7);
	    for (var j = 0; j < 7; j++) {
	      scope.labels[j] = {
	        abbr: dateFilter(days[j].date, this.formatDayHeader),
	        full: dateFilter(days[j].date, 'EEEE')
	      };
	    }

	    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
	    scope.rows = this.split(days, 7);

	    if (scope.showWeeks) {
	      scope.weekNumbers = [];
	      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
	          numWeeks = scope.rows.length;
	      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
	        scope.weekNumbers.push(
	          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
	      }
	    }
	  };

	  this.compare = function(date1, date2) {
	    var _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
	    var _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
	    _date1.setFullYear(date1.getFullYear());
	    _date2.setFullYear(date2.getFullYear());
	    return _date1 - _date2;
	  };

	  function getISO8601WeekNumber(date) {
	    var checkDate = new Date(date);
	    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
	    var time = checkDate.getTime();
	    checkDate.setMonth(0); // Compare with Jan 1
	    checkDate.setDate(1);
	    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	  }

	  this.handleKeyDown = function(key, evt) {
	    var date = this.activeDate.getDate();

	    if (key === 'left') {
	      date = date - 1;
	    } else if (key === 'up') {
	      date = date - 7;
	    } else if (key === 'right') {
	      date = date + 1;
	    } else if (key === 'down') {
	      date = date + 7;
	    } else if (key === 'pageup' || key === 'pagedown') {
	      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
	      this.activeDate.setMonth(month, 1);
	      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
	    } else if (key === 'home') {
	      date = 1;
	    } else if (key === 'end') {
	      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
	    }
	    this.activeDate.setDate(date);
	  };
	}])

	.controller('UibMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
	  this.step = { years: 1 };
	  this.element = $element;

	  this.init = function(ctrl) {
	    angular.extend(ctrl, this);
	    ctrl.refreshView();
	  };

	  this._refreshView = function() {
	    var months = new Array(12),
	        year = this.activeDate.getFullYear(),
	        date;

	    for (var i = 0; i < 12; i++) {
	      date = new Date(this.activeDate);
	      date.setFullYear(year, i, 1);
	      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
	        uid: scope.uniqueId + '-' + i
	      });
	    }

	    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
	    scope.rows = this.split(months, this.monthColumns);
	    scope.yearHeaderColspan = this.monthColumns > 3 ? this.monthColumns - 2 : 1;
	  };

	  this.compare = function(date1, date2) {
	    var _date1 = new Date(date1.getFullYear(), date1.getMonth());
	    var _date2 = new Date(date2.getFullYear(), date2.getMonth());
	    _date1.setFullYear(date1.getFullYear());
	    _date2.setFullYear(date2.getFullYear());
	    return _date1 - _date2;
	  };

	  this.handleKeyDown = function(key, evt) {
	    var date = this.activeDate.getMonth();

	    if (key === 'left') {
	      date = date - 1;
	    } else if (key === 'up') {
	      date = date - this.monthColumns;
	    } else if (key === 'right') {
	      date = date + 1;
	    } else if (key === 'down') {
	      date = date + this.monthColumns;
	    } else if (key === 'pageup' || key === 'pagedown') {
	      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
	      this.activeDate.setFullYear(year);
	    } else if (key === 'home') {
	      date = 0;
	    } else if (key === 'end') {
	      date = 11;
	    }
	    this.activeDate.setMonth(date);
	  };
	}])

	.controller('UibYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
	  var columns, range;
	  this.element = $element;

	  function getStartingYear(year) {
	    return parseInt((year - 1) / range, 10) * range + 1;
	  }

	  this.yearpickerInit = function() {
	    columns = this.yearColumns;
	    range = this.yearRows * columns;
	    this.step = { years: range };
	  };

	  this._refreshView = function() {
	    var years = new Array(range), date;

	    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
	      date = new Date(this.activeDate);
	      date.setFullYear(start + i, 0, 1);
	      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
	        uid: scope.uniqueId + '-' + i
	      });
	    }

	    scope.title = [years[0].label, years[range - 1].label].join(' - ');
	    scope.rows = this.split(years, columns);
	    scope.columns = columns;
	  };

	  this.compare = function(date1, date2) {
	    return date1.getFullYear() - date2.getFullYear();
	  };

	  this.handleKeyDown = function(key, evt) {
	    var date = this.activeDate.getFullYear();

	    if (key === 'left') {
	      date = date - 1;
	    } else if (key === 'up') {
	      date = date - columns;
	    } else if (key === 'right') {
	      date = date + 1;
	    } else if (key === 'down') {
	      date = date + columns;
	    } else if (key === 'pageup' || key === 'pagedown') {
	      date += (key === 'pageup' ? - 1 : 1) * range;
	    } else if (key === 'home') {
	      date = getStartingYear(this.activeDate.getFullYear());
	    } else if (key === 'end') {
	      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
	    }
	    this.activeDate.setFullYear(date);
	  };
	}])

	.directive('uibDatepicker', function() {
	  return {
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/datepicker/datepicker.html';
	    },
	    scope: {
	      datepickerOptions: '=?'
	    },
	    require: ['uibDatepicker', '^ngModel'],
	    restrict: 'A',
	    controller: 'UibDatepickerController',
	    controllerAs: 'datepicker',
	    link: function(scope, element, attrs, ctrls) {
	      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      datepickerCtrl.init(ngModelCtrl);
	    }
	  };
	})

	.directive('uibDaypicker', function() {
	  return {
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/datepicker/day.html';
	    },
	    require: ['^uibDatepicker', 'uibDaypicker'],
	    restrict: 'A',
	    controller: 'UibDaypickerController',
	    link: function(scope, element, attrs, ctrls) {
	      var datepickerCtrl = ctrls[0],
	        daypickerCtrl = ctrls[1];

	      daypickerCtrl.init(datepickerCtrl);
	    }
	  };
	})

	.directive('uibMonthpicker', function() {
	  return {
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/datepicker/month.html';
	    },
	    require: ['^uibDatepicker', 'uibMonthpicker'],
	    restrict: 'A',
	    controller: 'UibMonthpickerController',
	    link: function(scope, element, attrs, ctrls) {
	      var datepickerCtrl = ctrls[0],
	        monthpickerCtrl = ctrls[1];

	      monthpickerCtrl.init(datepickerCtrl);
	    }
	  };
	})

	.directive('uibYearpicker', function() {
	  return {
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/datepicker/year.html';
	    },
	    require: ['^uibDatepicker', 'uibYearpicker'],
	    restrict: 'A',
	    controller: 'UibYearpickerController',
	    link: function(scope, element, attrs, ctrls) {
	      var ctrl = ctrls[0];
	      angular.extend(ctrl, ctrls[1]);
	      ctrl.yearpickerInit();

	      ctrl.refreshView();
	    }
	  };
	});

	angular.module('ui.bootstrap.position', [])

	/**
	 * A set of utility methods for working with the DOM.
	 * It is meant to be used where we need to absolute-position elements in
	 * relation to another element (this is the case for tooltips, popovers,
	 * typeahead suggestions etc.).
	 */
	  .factory('$uibPosition', ['$document', '$window', function($document, $window) {
	    /**
	     * Used by scrollbarWidth() function to cache scrollbar's width.
	     * Do not access this variable directly, use scrollbarWidth() instead.
	     */
	    var SCROLLBAR_WIDTH;
	    /**
	     * scrollbar on body and html element in IE and Edge overlay
	     * content and should be considered 0 width.
	     */
	    var BODY_SCROLLBAR_WIDTH;
	    var OVERFLOW_REGEX = {
	      normal: /(auto|scroll)/,
	      hidden: /(auto|scroll|hidden)/
	    };
	    var PLACEMENT_REGEX = {
	      auto: /\s?auto?\s?/i,
	      primary: /^(top|bottom|left|right)$/,
	      secondary: /^(top|bottom|left|right|center)$/,
	      vertical: /^(top|bottom)$/
	    };
	    var BODY_REGEX = /(HTML|BODY)/;

	    return {

	      /**
	       * Provides a raw DOM element from a jQuery/jQLite element.
	       *
	       * @param {element} elem - The element to convert.
	       *
	       * @returns {element} A HTML element.
	       */
	      getRawNode: function(elem) {
	        return elem.nodeName ? elem : elem[0] || elem;
	      },

	      /**
	       * Provides a parsed number for a style property.  Strips
	       * units and casts invalid numbers to 0.
	       *
	       * @param {string} value - The style value to parse.
	       *
	       * @returns {number} A valid number.
	       */
	      parseStyle: function(value) {
	        value = parseFloat(value);
	        return isFinite(value) ? value : 0;
	      },

	      /**
	       * Provides the closest positioned ancestor.
	       *
	       * @param {element} element - The element to get the offest parent for.
	       *
	       * @returns {element} The closest positioned ancestor.
	       */
	      offsetParent: function(elem) {
	        elem = this.getRawNode(elem);

	        var offsetParent = elem.offsetParent || $document[0].documentElement;

	        function isStaticPositioned(el) {
	          return ($window.getComputedStyle(el).position || 'static') === 'static';
	        }

	        while (offsetParent && offsetParent !== $document[0].documentElement && isStaticPositioned(offsetParent)) {
	          offsetParent = offsetParent.offsetParent;
	        }

	        return offsetParent || $document[0].documentElement;
	      },

	      /**
	       * Provides the scrollbar width, concept from TWBS measureScrollbar()
	       * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
	       * In IE and Edge, scollbar on body and html element overlay and should
	       * return a width of 0.
	       *
	       * @returns {number} The width of the browser scollbar.
	       */
	      scrollbarWidth: function(isBody) {
	        if (isBody) {
	          if (angular.isUndefined(BODY_SCROLLBAR_WIDTH)) {
	            var bodyElem = $document.find('body');
	            bodyElem.addClass('uib-position-body-scrollbar-measure');
	            BODY_SCROLLBAR_WIDTH = $window.innerWidth - bodyElem[0].clientWidth;
	            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
	            bodyElem.removeClass('uib-position-body-scrollbar-measure');
	          }
	          return BODY_SCROLLBAR_WIDTH;
	        }

	        if (angular.isUndefined(SCROLLBAR_WIDTH)) {
	          var scrollElem = angular.element('<div class="uib-position-scrollbar-measure"></div>');
	          $document.find('body').append(scrollElem);
	          SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
	          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
	          scrollElem.remove();
	        }

	        return SCROLLBAR_WIDTH;
	      },

	      /**
	       * Provides the padding required on an element to replace the scrollbar.
	       *
	       * @returns {object} An object with the following properties:
	       *   <ul>
	       *     <li>**scrollbarWidth**: the width of the scrollbar</li>
	       *     <li>**widthOverflow**: whether the the width is overflowing</li>
	       *     <li>**right**: the amount of right padding on the element needed to replace the scrollbar</li>
	       *     <li>**rightOriginal**: the amount of right padding currently on the element</li>
	       *     <li>**heightOverflow**: whether the the height is overflowing</li>
	       *     <li>**bottom**: the amount of bottom padding on the element needed to replace the scrollbar</li>
	       *     <li>**bottomOriginal**: the amount of bottom padding currently on the element</li>
	       *   </ul>
	       */
	      scrollbarPadding: function(elem) {
	        elem = this.getRawNode(elem);

	        var elemStyle = $window.getComputedStyle(elem);
	        var paddingRight = this.parseStyle(elemStyle.paddingRight);
	        var paddingBottom = this.parseStyle(elemStyle.paddingBottom);
	        var scrollParent = this.scrollParent(elem, false, true);
	        var scrollbarWidth = this.scrollbarWidth(scrollParent, BODY_REGEX.test(scrollParent.tagName));

	        return {
	          scrollbarWidth: scrollbarWidth,
	          widthOverflow: scrollParent.scrollWidth > scrollParent.clientWidth,
	          right: paddingRight + scrollbarWidth,
	          originalRight: paddingRight,
	          heightOverflow: scrollParent.scrollHeight > scrollParent.clientHeight,
	          bottom: paddingBottom + scrollbarWidth,
	          originalBottom: paddingBottom
	         };
	      },

	      /**
	       * Checks to see if the element is scrollable.
	       *
	       * @param {element} elem - The element to check.
	       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
	       *   default is false.
	       *
	       * @returns {boolean} Whether the element is scrollable.
	       */
	      isScrollable: function(elem, includeHidden) {
	        elem = this.getRawNode(elem);

	        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
	        var elemStyle = $window.getComputedStyle(elem);
	        return overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
	      },

	      /**
	       * Provides the closest scrollable ancestor.
	       * A port of the jQuery UI scrollParent method:
	       * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
	       *
	       * @param {element} elem - The element to find the scroll parent of.
	       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
	       *   default is false.
	       * @param {boolean=} [includeSelf=false] - Should the element being passed be
	       * included in the scrollable llokup.
	       *
	       * @returns {element} A HTML element.
	       */
	      scrollParent: function(elem, includeHidden, includeSelf) {
	        elem = this.getRawNode(elem);

	        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
	        var documentEl = $document[0].documentElement;
	        var elemStyle = $window.getComputedStyle(elem);
	        if (includeSelf && overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
	          return elem;
	        }
	        var excludeStatic = elemStyle.position === 'absolute';
	        var scrollParent = elem.parentElement || documentEl;

	        if (scrollParent === documentEl || elemStyle.position === 'fixed') {
	          return documentEl;
	        }

	        while (scrollParent.parentElement && scrollParent !== documentEl) {
	          var spStyle = $window.getComputedStyle(scrollParent);
	          if (excludeStatic && spStyle.position !== 'static') {
	            excludeStatic = false;
	          }

	          if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
	            break;
	          }
	          scrollParent = scrollParent.parentElement;
	        }

	        return scrollParent;
	      },

	      /**
	       * Provides read-only equivalent of jQuery's position function:
	       * http://api.jquery.com/position/ - distance to closest positioned
	       * ancestor.  Does not account for margins by default like jQuery position.
	       *
	       * @param {element} elem - The element to caclulate the position on.
	       * @param {boolean=} [includeMargins=false] - Should margins be accounted
	       * for, default is false.
	       *
	       * @returns {object} An object with the following properties:
	       *   <ul>
	       *     <li>**width**: the width of the element</li>
	       *     <li>**height**: the height of the element</li>
	       *     <li>**top**: distance to top edge of offset parent</li>
	       *     <li>**left**: distance to left edge of offset parent</li>
	       *   </ul>
	       */
	      position: function(elem, includeMagins) {
	        elem = this.getRawNode(elem);

	        var elemOffset = this.offset(elem);
	        if (includeMagins) {
	          var elemStyle = $window.getComputedStyle(elem);
	          elemOffset.top -= this.parseStyle(elemStyle.marginTop);
	          elemOffset.left -= this.parseStyle(elemStyle.marginLeft);
	        }
	        var parent = this.offsetParent(elem);
	        var parentOffset = {top: 0, left: 0};

	        if (parent !== $document[0].documentElement) {
	          parentOffset = this.offset(parent);
	          parentOffset.top += parent.clientTop - parent.scrollTop;
	          parentOffset.left += parent.clientLeft - parent.scrollLeft;
	        }

	        return {
	          width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
	          height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
	          top: Math.round(elemOffset.top - parentOffset.top),
	          left: Math.round(elemOffset.left - parentOffset.left)
	        };
	      },

	      /**
	       * Provides read-only equivalent of jQuery's offset function:
	       * http://api.jquery.com/offset/ - distance to viewport.  Does
	       * not account for borders, margins, or padding on the body
	       * element.
	       *
	       * @param {element} elem - The element to calculate the offset on.
	       *
	       * @returns {object} An object with the following properties:
	       *   <ul>
	       *     <li>**width**: the width of the element</li>
	       *     <li>**height**: the height of the element</li>
	       *     <li>**top**: distance to top edge of viewport</li>
	       *     <li>**right**: distance to bottom edge of viewport</li>
	       *   </ul>
	       */
	      offset: function(elem) {
	        elem = this.getRawNode(elem);

	        var elemBCR = elem.getBoundingClientRect();
	        return {
	          width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
	          height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
	          top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
	          left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
	        };
	      },

	      /**
	       * Provides offset distance to the closest scrollable ancestor
	       * or viewport.  Accounts for border and scrollbar width.
	       *
	       * Right and bottom dimensions represent the distance to the
	       * respective edge of the viewport element.  If the element
	       * edge extends beyond the viewport, a negative value will be
	       * reported.
	       *
	       * @param {element} elem - The element to get the viewport offset for.
	       * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
	       * of the first scrollable element, default is false.
	       * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
	       * be accounted for, default is true.
	       *
	       * @returns {object} An object with the following properties:
	       *   <ul>
	       *     <li>**top**: distance to the top content edge of viewport element</li>
	       *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
	       *     <li>**left**: distance to the left content edge of viewport element</li>
	       *     <li>**right**: distance to the right content edge of viewport element</li>
	       *   </ul>
	       */
	      viewportOffset: function(elem, useDocument, includePadding) {
	        elem = this.getRawNode(elem);
	        includePadding = includePadding !== false ? true : false;

	        var elemBCR = elem.getBoundingClientRect();
	        var offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

	        var offsetParent = useDocument ? $document[0].documentElement : this.scrollParent(elem);
	        var offsetParentBCR = offsetParent.getBoundingClientRect();

	        offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
	        offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
	        if (offsetParent === $document[0].documentElement) {
	          offsetBCR.top += $window.pageYOffset;
	          offsetBCR.left += $window.pageXOffset;
	        }
	        offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
	        offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

	        if (includePadding) {
	          var offsetParentStyle = $window.getComputedStyle(offsetParent);
	          offsetBCR.top += this.parseStyle(offsetParentStyle.paddingTop);
	          offsetBCR.bottom -= this.parseStyle(offsetParentStyle.paddingBottom);
	          offsetBCR.left += this.parseStyle(offsetParentStyle.paddingLeft);
	          offsetBCR.right -= this.parseStyle(offsetParentStyle.paddingRight);
	        }

	        return {
	          top: Math.round(elemBCR.top - offsetBCR.top),
	          bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
	          left: Math.round(elemBCR.left - offsetBCR.left),
	          right: Math.round(offsetBCR.right - elemBCR.right)
	        };
	      },

	      /**
	       * Provides an array of placement values parsed from a placement string.
	       * Along with the 'auto' indicator, supported placement strings are:
	       *   <ul>
	       *     <li>top: element on top, horizontally centered on host element.</li>
	       *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
	       *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
	       *     <li>bottom: element on bottom, horizontally centered on host element.</li>
	       *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
	       *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
	       *     <li>left: element on left, vertically centered on host element.</li>
	       *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
	       *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
	       *     <li>right: element on right, vertically centered on host element.</li>
	       *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
	       *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
	       *   </ul>
	       * A placement string with an 'auto' indicator is expected to be
	       * space separated from the placement, i.e: 'auto bottom-left'  If
	       * the primary and secondary placement values do not match 'top,
	       * bottom, left, right' then 'top' will be the primary placement and
	       * 'center' will be the secondary placement.  If 'auto' is passed, true
	       * will be returned as the 3rd value of the array.
	       *
	       * @param {string} placement - The placement string to parse.
	       *
	       * @returns {array} An array with the following values
	       * <ul>
	       *   <li>**[0]**: The primary placement.</li>
	       *   <li>**[1]**: The secondary placement.</li>
	       *   <li>**[2]**: If auto is passed: true, else undefined.</li>
	       * </ul>
	       */
	      parsePlacement: function(placement) {
	        var autoPlace = PLACEMENT_REGEX.auto.test(placement);
	        if (autoPlace) {
	          placement = placement.replace(PLACEMENT_REGEX.auto, '');
	        }

	        placement = placement.split('-');

	        placement[0] = placement[0] || 'top';
	        if (!PLACEMENT_REGEX.primary.test(placement[0])) {
	          placement[0] = 'top';
	        }

	        placement[1] = placement[1] || 'center';
	        if (!PLACEMENT_REGEX.secondary.test(placement[1])) {
	          placement[1] = 'center';
	        }

	        if (autoPlace) {
	          placement[2] = true;
	        } else {
	          placement[2] = false;
	        }

	        return placement;
	      },

	      /**
	       * Provides coordinates for an element to be positioned relative to
	       * another element.  Passing 'auto' as part of the placement parameter
	       * will enable smart placement - where the element fits. i.e:
	       * 'auto left-top' will check to see if there is enough space to the left
	       * of the hostElem to fit the targetElem, if not place right (same for secondary
	       * top placement).  Available space is calculated using the viewportOffset
	       * function.
	       *
	       * @param {element} hostElem - The element to position against.
	       * @param {element} targetElem - The element to position.
	       * @param {string=} [placement=top] - The placement for the targetElem,
	       *   default is 'top'. 'center' is assumed as secondary placement for
	       *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
	       *   <ul>
	       *     <li>top</li>
	       *     <li>top-right</li>
	       *     <li>top-left</li>
	       *     <li>bottom</li>
	       *     <li>bottom-left</li>
	       *     <li>bottom-right</li>
	       *     <li>left</li>
	       *     <li>left-top</li>
	       *     <li>left-bottom</li>
	       *     <li>right</li>
	       *     <li>right-top</li>
	       *     <li>right-bottom</li>
	       *   </ul>
	       * @param {boolean=} [appendToBody=false] - Should the top and left values returned
	       *   be calculated from the body element, default is false.
	       *
	       * @returns {object} An object with the following properties:
	       *   <ul>
	       *     <li>**top**: Value for targetElem top.</li>
	       *     <li>**left**: Value for targetElem left.</li>
	       *     <li>**placement**: The resolved placement.</li>
	       *   </ul>
	       */
	      positionElements: function(hostElem, targetElem, placement, appendToBody) {
	        hostElem = this.getRawNode(hostElem);
	        targetElem = this.getRawNode(targetElem);

	        // need to read from prop to support tests.
	        var targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
	        var targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

	        placement = this.parsePlacement(placement);

	        var hostElemPos = appendToBody ? this.offset(hostElem) : this.position(hostElem);
	        var targetElemPos = {top: 0, left: 0, placement: ''};

	        if (placement[2]) {
	          var viewportOffset = this.viewportOffset(hostElem, appendToBody);

	          var targetElemStyle = $window.getComputedStyle(targetElem);
	          var adjustedSize = {
	            width: targetWidth + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginLeft) + this.parseStyle(targetElemStyle.marginRight))),
	            height: targetHeight + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginTop) + this.parseStyle(targetElemStyle.marginBottom)))
	          };

	          placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
	                         placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
	                         placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
	                         placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
	                         placement[0];

	          placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
	                         placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
	                         placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
	                         placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
	                         placement[1];

	          if (placement[1] === 'center') {
	            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
	              var xOverflow = hostElemPos.width / 2 - targetWidth / 2;
	              if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
	                placement[1] = 'left';
	              } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
	                placement[1] = 'right';
	              }
	            } else {
	              var yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
	              if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
	                placement[1] = 'top';
	              } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
	                placement[1] = 'bottom';
	              }
	            }
	          }
	        }

	        switch (placement[0]) {
	          case 'top':
	            targetElemPos.top = hostElemPos.top - targetHeight;
	            break;
	          case 'bottom':
	            targetElemPos.top = hostElemPos.top + hostElemPos.height;
	            break;
	          case 'left':
	            targetElemPos.left = hostElemPos.left - targetWidth;
	            break;
	          case 'right':
	            targetElemPos.left = hostElemPos.left + hostElemPos.width;
	            break;
	        }

	        switch (placement[1]) {
	          case 'top':
	            targetElemPos.top = hostElemPos.top;
	            break;
	          case 'bottom':
	            targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
	            break;
	          case 'left':
	            targetElemPos.left = hostElemPos.left;
	            break;
	          case 'right':
	            targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
	            break;
	          case 'center':
	            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
	              targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
	            } else {
	              targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
	            }
	            break;
	        }

	        targetElemPos.top = Math.round(targetElemPos.top);
	        targetElemPos.left = Math.round(targetElemPos.left);
	        targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

	        return targetElemPos;
	      },

	      /**
	       * Provides a way to adjust the top positioning after first
	       * render to correctly align element to top after content
	       * rendering causes resized element height
	       *
	       * @param {array} placementClasses - The array of strings of classes
	       * element should have.
	       * @param {object} containerPosition - The object with container
	       * position information
	       * @param {number} initialHeight - The initial height for the elem.
	       * @param {number} currentHeight - The current height for the elem.
	       */
	      adjustTop: function(placementClasses, containerPosition, initialHeight, currentHeight) {
	        if (placementClasses.indexOf('top') !== -1 && initialHeight !== currentHeight) {
	          return {
	            top: containerPosition.top - currentHeight + 'px'
	          };
	        }
	      },

	      /**
	       * Provides a way for positioning tooltip & dropdown
	       * arrows when using placement options beyond the standard
	       * left, right, top, or bottom.
	       *
	       * @param {element} elem - The tooltip/dropdown element.
	       * @param {string} placement - The placement for the elem.
	       */
	      positionArrow: function(elem, placement) {
	        elem = this.getRawNode(elem);

	        var innerElem = elem.querySelector('.tooltip-inner, .popover-inner');
	        if (!innerElem) {
	          return;
	        }

	        var isTooltip = angular.element(innerElem).hasClass('tooltip-inner');

	        var arrowElem = isTooltip ? elem.querySelector('.tooltip-arrow') : elem.querySelector('.arrow');
	        if (!arrowElem) {
	          return;
	        }

	        var arrowCss = {
	          top: '',
	          bottom: '',
	          left: '',
	          right: ''
	        };

	        placement = this.parsePlacement(placement);
	        if (placement[1] === 'center') {
	          // no adjustment necessary - just reset styles
	          angular.element(arrowElem).css(arrowCss);
	          return;
	        }

	        var borderProp = 'border-' + placement[0] + '-width';
	        var borderWidth = $window.getComputedStyle(arrowElem)[borderProp];

	        var borderRadiusProp = 'border-';
	        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
	          borderRadiusProp += placement[0] + '-' + placement[1];
	        } else {
	          borderRadiusProp += placement[1] + '-' + placement[0];
	        }
	        borderRadiusProp += '-radius';
	        var borderRadius = $window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

	        switch (placement[0]) {
	          case 'top':
	            arrowCss.bottom = isTooltip ? '0' : '-' + borderWidth;
	            break;
	          case 'bottom':
	            arrowCss.top = isTooltip ? '0' : '-' + borderWidth;
	            break;
	          case 'left':
	            arrowCss.right = isTooltip ? '0' : '-' + borderWidth;
	            break;
	          case 'right':
	            arrowCss.left = isTooltip ? '0' : '-' + borderWidth;
	            break;
	        }

	        arrowCss[placement[1]] = borderRadius;

	        angular.element(arrowElem).css(arrowCss);
	      }
	    };
	  }]);

	angular.module('ui.bootstrap.datepickerPopup', ['ui.bootstrap.datepicker', 'ui.bootstrap.position'])

	.value('$datepickerPopupLiteralWarning', true)

	.constant('uibDatepickerPopupConfig', {
	  altInputFormats: [],
	  appendToBody: false,
	  clearText: 'Clear',
	  closeOnDateSelection: true,
	  closeText: 'Done',
	  currentText: 'Today',
	  datepickerPopup: 'yyyy-MM-dd',
	  datepickerPopupTemplateUrl: 'uib/template/datepickerPopup/popup.html',
	  datepickerTemplateUrl: 'uib/template/datepicker/datepicker.html',
	  html5Types: {
	    date: 'yyyy-MM-dd',
	    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
	    'month': 'yyyy-MM'
	  },
	  onOpenFocus: true,
	  showButtonBar: true,
	  placement: 'auto bottom-left'
	})

	.controller('UibDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$log', '$parse', '$window', '$document', '$rootScope', '$uibPosition', 'dateFilter', 'uibDateParser', 'uibDatepickerPopupConfig', '$timeout', 'uibDatepickerConfig', '$datepickerPopupLiteralWarning',
	function($scope, $element, $attrs, $compile, $log, $parse, $window, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout, datepickerConfig, $datepickerPopupLiteralWarning) {
	  var cache = {},
	    isHtml5DateInput = false;
	  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
	    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl, scrollParentEl,
	    ngModel, ngModelOptions, $popup, altInputFormats, watchListeners = [];

	  this.init = function(_ngModel_) {
	    ngModel = _ngModel_;
	    ngModelOptions = angular.isObject(_ngModel_.$options) ?
	      _ngModel_.$options :
	      {
	        timezone: null
	      };
	    closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ?
	      $scope.$parent.$eval($attrs.closeOnDateSelection) :
	      datepickerPopupConfig.closeOnDateSelection;
	    appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ?
	      $scope.$parent.$eval($attrs.datepickerAppendToBody) :
	      datepickerPopupConfig.appendToBody;
	    onOpenFocus = angular.isDefined($attrs.onOpenFocus) ?
	      $scope.$parent.$eval($attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
	    datepickerPopupTemplateUrl = angular.isDefined($attrs.datepickerPopupTemplateUrl) ?
	      $attrs.datepickerPopupTemplateUrl :
	      datepickerPopupConfig.datepickerPopupTemplateUrl;
	    datepickerTemplateUrl = angular.isDefined($attrs.datepickerTemplateUrl) ?
	      $attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;
	    altInputFormats = angular.isDefined($attrs.altInputFormats) ?
	      $scope.$parent.$eval($attrs.altInputFormats) :
	      datepickerPopupConfig.altInputFormats;

	    $scope.showButtonBar = angular.isDefined($attrs.showButtonBar) ?
	      $scope.$parent.$eval($attrs.showButtonBar) :
	      datepickerPopupConfig.showButtonBar;

	    if (datepickerPopupConfig.html5Types[$attrs.type]) {
	      dateFormat = datepickerPopupConfig.html5Types[$attrs.type];
	      isHtml5DateInput = true;
	    } else {
	      dateFormat = $attrs.uibDatepickerPopup || datepickerPopupConfig.datepickerPopup;
	      $attrs.$observe('uibDatepickerPopup', function(value, oldValue) {
	        var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
	        // Invalidate the $modelValue to ensure that formatters re-run
	        // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
	        if (newDateFormat !== dateFormat) {
	          dateFormat = newDateFormat;
	          ngModel.$modelValue = null;

	          if (!dateFormat) {
	            throw new Error('uibDatepickerPopup must have a date format specified.');
	          }
	        }
	      });
	    }

	    if (!dateFormat) {
	      throw new Error('uibDatepickerPopup must have a date format specified.');
	    }

	    if (isHtml5DateInput && $attrs.uibDatepickerPopup) {
	      throw new Error('HTML5 date input types do not support custom formats.');
	    }

	    // popup element used to display calendar
	    popupEl = angular.element('<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>');

	    popupEl.attr({
	      'ng-model': 'date',
	      'ng-change': 'dateSelection(date)',
	      'template-url': datepickerPopupTemplateUrl
	    });

	    // datepicker element
	    datepickerEl = angular.element(popupEl.children()[0]);
	    datepickerEl.attr('template-url', datepickerTemplateUrl);

	    if (!$scope.datepickerOptions) {
	      $scope.datepickerOptions = {};
	    }

	    if (isHtml5DateInput) {
	      if ($attrs.type === 'month') {
	        $scope.datepickerOptions.datepickerMode = 'month';
	        $scope.datepickerOptions.minMode = 'month';
	      }
	    }

	    datepickerEl.attr('datepicker-options', 'datepickerOptions');

	    if (!isHtml5DateInput) {
	      // Internal API to maintain the correct ng-invalid-[key] class
	      ngModel.$$parserName = 'date';
	      ngModel.$validators.date = validator;
	      ngModel.$parsers.unshift(parseDate);
	      ngModel.$formatters.push(function(value) {
	        if (ngModel.$isEmpty(value)) {
	          $scope.date = value;
	          return value;
	        }

	        if (angular.isNumber(value)) {
	          value = new Date(value);
	        }

	        $scope.date = dateParser.fromTimezone(value, ngModelOptions.timezone);

	        return dateParser.filter($scope.date, dateFormat);
	      });
	    } else {
	      ngModel.$formatters.push(function(value) {
	        $scope.date = dateParser.fromTimezone(value, ngModelOptions.timezone);
	        return value;
	      });
	    }

	    // Detect changes in the view from the text box
	    ngModel.$viewChangeListeners.push(function() {
	      $scope.date = parseDateString(ngModel.$viewValue);
	    });

	    $element.on('keydown', inputKeydownBind);

	    $popup = $compile(popupEl)($scope);
	    // Prevent jQuery cache memory leak (template is now redundant after linking)
	    popupEl.remove();

	    if (appendToBody) {
	      $document.find('body').append($popup);
	    } else {
	      $element.after($popup);
	    }

	    $scope.$on('$destroy', function() {
	      if ($scope.isOpen === true) {
	        if (!$rootScope.$$phase) {
	          $scope.$apply(function() {
	            $scope.isOpen = false;
	          });
	        }
	      }

	      $popup.remove();
	      $element.off('keydown', inputKeydownBind);
	      $document.off('click', documentClickBind);
	      if (scrollParentEl) {
	        scrollParentEl.off('scroll', positionPopup);
	      }
	      angular.element($window).off('resize', positionPopup);

	      //Clear all watch listeners on destroy
	      while (watchListeners.length) {
	        watchListeners.shift()();
	      }
	    });
	  };

	  $scope.getText = function(key) {
	    return $scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
	  };

	  $scope.isDisabled = function(date) {
	    if (date === 'today') {
	      date = dateParser.fromTimezone(new Date(), ngModelOptions.timezone);
	    }

	    var dates = {};
	    angular.forEach(['minDate', 'maxDate'], function(key) {
	      if (!$scope.datepickerOptions[key]) {
	        dates[key] = null;
	      } else if (angular.isDate($scope.datepickerOptions[key])) {
	        dates[key] = new Date($scope.datepickerOptions[key]);
	      } else {
	        if ($datepickerPopupLiteralWarning) {
	          $log.warn('Literal date support has been deprecated, please switch to date object usage');
	        }

	        dates[key] = new Date(dateFilter($scope.datepickerOptions[key], 'medium'));
	      }
	    });

	    return $scope.datepickerOptions &&
	      dates.minDate && $scope.compare(date, dates.minDate) < 0 ||
	      dates.maxDate && $scope.compare(date, dates.maxDate) > 0;
	  };

	  $scope.compare = function(date1, date2) {
	    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
	  };

	  // Inner change
	  $scope.dateSelection = function(dt) {
	    $scope.date = dt;
	    var date = $scope.date ? dateParser.filter($scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
	    $element.val(date);
	    ngModel.$setViewValue(date);

	    if (closeOnDateSelection) {
	      $scope.isOpen = false;
	      $element[0].focus();
	    }
	  };

	  $scope.keydown = function(evt) {
	    if (evt.which === 27) {
	      evt.stopPropagation();
	      $scope.isOpen = false;
	      $element[0].focus();
	    }
	  };

	  $scope.select = function(date, evt) {
	    evt.stopPropagation();

	    if (date === 'today') {
	      var today = new Date();
	      if (angular.isDate($scope.date)) {
	        date = new Date($scope.date);
	        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
	      } else {
	        date = dateParser.fromTimezone(today, ngModelOptions.timezone);
	        date.setHours(0, 0, 0, 0);
	      }
	    }
	    $scope.dateSelection(date);
	  };

	  $scope.close = function(evt) {
	    evt.stopPropagation();

	    $scope.isOpen = false;
	    $element[0].focus();
	  };

	  $scope.disabled = angular.isDefined($attrs.disabled) || false;
	  if ($attrs.ngDisabled) {
	    watchListeners.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(disabled) {
	      $scope.disabled = disabled;
	    }));
	  }

	  $scope.$watch('isOpen', function(value) {
	    if (value) {
	      if (!$scope.disabled) {
	        $timeout(function() {
	          positionPopup();

	          if (onOpenFocus) {
	            $scope.$broadcast('uib:datepicker.focus');
	          }

	          $document.on('click', documentClickBind);

	          var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
	          if (appendToBody || $position.parsePlacement(placement)[2]) {
	            scrollParentEl = scrollParentEl || angular.element($position.scrollParent($element));
	            if (scrollParentEl) {
	              scrollParentEl.on('scroll', positionPopup);
	            }
	          } else {
	            scrollParentEl = null;
	          }

	          angular.element($window).on('resize', positionPopup);
	        }, 0, false);
	      } else {
	        $scope.isOpen = false;
	      }
	    } else {
	      $document.off('click', documentClickBind);
	      if (scrollParentEl) {
	        scrollParentEl.off('scroll', positionPopup);
	      }
	      angular.element($window).off('resize', positionPopup);
	    }
	  });

	  function cameltoDash(string) {
	    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
	  }

	  function parseDateString(viewValue) {
	    var date = dateParser.parse(viewValue, dateFormat, $scope.date);
	    if (isNaN(date)) {
	      for (var i = 0; i < altInputFormats.length; i++) {
	        date = dateParser.parse(viewValue, altInputFormats[i], $scope.date);
	        if (!isNaN(date)) {
	          return date;
	        }
	      }
	    }
	    return date;
	  }

	  function parseDate(viewValue) {
	    if (angular.isNumber(viewValue)) {
	      // presumably timestamp to date object
	      viewValue = new Date(viewValue);
	    }

	    if (!viewValue) {
	      return null;
	    }

	    if (angular.isDate(viewValue) && !isNaN(viewValue)) {
	      return viewValue;
	    }

	    if (angular.isString(viewValue)) {
	      var date = parseDateString(viewValue);
	      if (!isNaN(date)) {
	        return dateParser.fromTimezone(date, ngModelOptions.timezone);
	      }
	    }

	    return ngModel.$options && ngModel.$options.allowInvalid ? viewValue : undefined;
	  }

	  function validator(modelValue, viewValue) {
	    var value = modelValue || viewValue;

	    if (!$attrs.ngRequired && !value) {
	      return true;
	    }

	    if (angular.isNumber(value)) {
	      value = new Date(value);
	    }

	    if (!value) {
	      return true;
	    }

	    if (angular.isDate(value) && !isNaN(value)) {
	      return true;
	    }

	    if (angular.isString(value)) {
	      return !isNaN(parseDateString(value));
	    }

	    return false;
	  }

	  function documentClickBind(event) {
	    if (!$scope.isOpen && $scope.disabled) {
	      return;
	    }

	    var popup = $popup[0];
	    var dpContainsTarget = $element[0].contains(event.target);
	    // The popup node may not be an element node
	    // In some browsers (IE) only element nodes have the 'contains' function
	    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
	    if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
	      $scope.$apply(function() {
	        $scope.isOpen = false;
	      });
	    }
	  }

	  function inputKeydownBind(evt) {
	    if (evt.which === 27 && $scope.isOpen) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      $scope.$apply(function() {
	        $scope.isOpen = false;
	      });
	      $element[0].focus();
	    } else if (evt.which === 40 && !$scope.isOpen) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      $scope.$apply(function() {
	        $scope.isOpen = true;
	      });
	    }
	  }

	  function positionPopup() {
	    if ($scope.isOpen) {
	      var dpElement = angular.element($popup[0].querySelector('.uib-datepicker-popup'));
	      var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
	      var position = $position.positionElements($element, dpElement, placement, appendToBody);
	      dpElement.css({top: position.top + 'px', left: position.left + 'px'});
	      if (dpElement.hasClass('uib-position-measure')) {
	        dpElement.removeClass('uib-position-measure');
	      }
	    }
	  }

	  $scope.$on('uib:datepicker.mode', function() {
	    $timeout(positionPopup, 0, false);
	  });
	}])

	.directive('uibDatepickerPopup', function() {
	  return {
	    require: ['ngModel', 'uibDatepickerPopup'],
	    controller: 'UibDatepickerPopupController',
	    scope: {
	      datepickerOptions: '=?',
	      isOpen: '=?',
	      currentText: '@',
	      clearText: '@',
	      closeText: '@'
	    },
	    link: function(scope, element, attrs, ctrls) {
	      var ngModel = ctrls[0],
	        ctrl = ctrls[1];

	      ctrl.init(ngModel);
	    }
	  };
	})

	.directive('uibDatepickerPopupWrap', function() {
	  return {
	    restrict: 'A',
	    transclude: true,
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/datepickerPopup/popup.html';
	    }
	  };
	});

	angular.module('ui.bootstrap.debounce', [])
	/**
	 * A helper, internal service that debounces a function
	 */
	  .factory('$$debounce', ['$timeout', function($timeout) {
	    return function(callback, debounceTime) {
	      var timeoutPromise;

	      return function() {
	        var self = this;
	        var args = Array.prototype.slice.call(arguments);
	        if (timeoutPromise) {
	          $timeout.cancel(timeoutPromise);
	        }

	        timeoutPromise = $timeout(function() {
	          callback.apply(self, args);
	        }, debounceTime);
	      };
	    };
	  }]);

	angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.position'])

	.constant('uibDropdownConfig', {
	  appendToOpenClass: 'uib-dropdown-open',
	  openClass: 'open'
	})

	.service('uibDropdownService', ['$document', '$rootScope', function($document, $rootScope) {
	  var openScope = null;

	  this.open = function(dropdownScope, element) {
	    if (!openScope) {
	      $document.on('click', closeDropdown);
	    }

	    if (openScope && openScope !== dropdownScope) {
	      openScope.isOpen = false;
	    }

	    openScope = dropdownScope;
	  };

	  this.close = function(dropdownScope, element) {
	    if (openScope === dropdownScope) {
	      openScope = null;
	      $document.off('click', closeDropdown);
	      $document.off('keydown', this.keybindFilter);
	    }
	  };

	  var closeDropdown = function(evt) {
	    // This method may still be called during the same mouse event that
	    // unbound this event handler. So check openScope before proceeding.
	    if (!openScope) { return; }

	    if (evt && openScope.getAutoClose() === 'disabled') { return; }

	    if (evt && evt.which === 3) { return; }

	    var toggleElement = openScope.getToggleElement();
	    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
	      return;
	    }

	    var dropdownElement = openScope.getDropdownElement();
	    if (evt && openScope.getAutoClose() === 'outsideClick' &&
	      dropdownElement && dropdownElement[0].contains(evt.target)) {
	      return;
	    }

	    openScope.focusToggleElement();
	    openScope.isOpen = false;

	    if (!$rootScope.$$phase) {
	      openScope.$apply();
	    }
	  };

	  this.keybindFilter = function(evt) {
	    var dropdownElement = openScope.getDropdownElement();
	    var toggleElement = openScope.getToggleElement();
	    var dropdownElementTargeted = dropdownElement && dropdownElement[0].contains(evt.target);
	    var toggleElementTargeted = toggleElement && toggleElement[0].contains(evt.target);
	    if (evt.which === 27) {
	      evt.stopPropagation();
	      openScope.focusToggleElement();
	      closeDropdown();
	    } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !== -1 && openScope.isOpen && (dropdownElementTargeted || toggleElementTargeted)) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      openScope.focusDropdownEntry(evt.which);
	    }
	  };
	}])

	.controller('UibDropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest) {
	  var self = this,
	    scope = $scope.$new(), // create a child scope so we are not polluting original one
	    templateScope,
	    appendToOpenClass = dropdownConfig.appendToOpenClass,
	    openClass = dropdownConfig.openClass,
	    getIsOpen,
	    setIsOpen = angular.noop,
	    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
	    appendToBody = false,
	    appendTo = null,
	    keynavEnabled = false,
	    selectedOption = null,
	    body = $document.find('body');

	  $element.addClass('dropdown');

	  this.init = function() {
	    if ($attrs.isOpen) {
	      getIsOpen = $parse($attrs.isOpen);
	      setIsOpen = getIsOpen.assign;

	      $scope.$watch(getIsOpen, function(value) {
	        scope.isOpen = !!value;
	      });
	    }

	    if (angular.isDefined($attrs.dropdownAppendTo)) {
	      var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
	      if (appendToEl) {
	        appendTo = angular.element(appendToEl);
	      }
	    }

	    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);
	    keynavEnabled = angular.isDefined($attrs.keyboardNav);

	    if (appendToBody && !appendTo) {
	      appendTo = body;
	    }

	    if (appendTo && self.dropdownMenu) {
	      appendTo.append(self.dropdownMenu);
	      $element.on('$destroy', function handleDestroyEvent() {
	        self.dropdownMenu.remove();
	      });
	    }
	  };

	  this.toggle = function(open) {
	    scope.isOpen = arguments.length ? !!open : !scope.isOpen;
	    if (angular.isFunction(setIsOpen)) {
	      setIsOpen(scope, scope.isOpen);
	    }

	    return scope.isOpen;
	  };

	  // Allow other directives to watch status
	  this.isOpen = function() {
	    return scope.isOpen;
	  };

	  scope.getToggleElement = function() {
	    return self.toggleElement;
	  };

	  scope.getAutoClose = function() {
	    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
	  };

	  scope.getElement = function() {
	    return $element;
	  };

	  scope.isKeynavEnabled = function() {
	    return keynavEnabled;
	  };

	  scope.focusDropdownEntry = function(keyCode) {
	    var elems = self.dropdownMenu ? //If append to body is used.
	      angular.element(self.dropdownMenu).find('a') :
	      $element.find('ul').eq(0).find('a');

	    switch (keyCode) {
	      case 40: {
	        if (!angular.isNumber(self.selectedOption)) {
	          self.selectedOption = 0;
	        } else {
	          self.selectedOption = self.selectedOption === elems.length - 1 ?
	            self.selectedOption :
	            self.selectedOption + 1;
	        }
	        break;
	      }
	      case 38: {
	        if (!angular.isNumber(self.selectedOption)) {
	          self.selectedOption = elems.length - 1;
	        } else {
	          self.selectedOption = self.selectedOption === 0 ?
	            0 : self.selectedOption - 1;
	        }
	        break;
	      }
	    }
	    elems[self.selectedOption].focus();
	  };

	  scope.getDropdownElement = function() {
	    return self.dropdownMenu;
	  };

	  scope.focusToggleElement = function() {
	    if (self.toggleElement) {
	      self.toggleElement[0].focus();
	    }
	  };

	  scope.$watch('isOpen', function(isOpen, wasOpen) {
	    if (appendTo && self.dropdownMenu) {
	      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
	        css,
	        rightalign,
	        scrollbarPadding,
	        scrollbarWidth = 0;

	      css = {
	        top: pos.top + 'px',
	        display: isOpen ? 'block' : 'none'
	      };

	      rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
	      if (!rightalign) {
	        css.left = pos.left + 'px';
	        css.right = 'auto';
	      } else {
	        css.left = 'auto';
	        scrollbarPadding = $position.scrollbarPadding(appendTo);

	        if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
	          scrollbarWidth = scrollbarPadding.scrollbarWidth;
	        }

	        css.right = window.innerWidth - scrollbarWidth -
	          (pos.left + $element.prop('offsetWidth')) + 'px';
	      }

	      // Need to adjust our positioning to be relative to the appendTo container
	      // if it's not the body element
	      if (!appendToBody) {
	        var appendOffset = $position.offset(appendTo);

	        css.top = pos.top - appendOffset.top + 'px';

	        if (!rightalign) {
	          css.left = pos.left - appendOffset.left + 'px';
	        } else {
	          css.right = window.innerWidth -
	            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
	        }
	      }

	      self.dropdownMenu.css(css);
	    }

	    var openContainer = appendTo ? appendTo : $element;
	    var hasOpenClass = openContainer.hasClass(appendTo ? appendToOpenClass : openClass);

	    if (hasOpenClass === !isOpen) {
	      $animate[isOpen ? 'addClass' : 'removeClass'](openContainer, appendTo ? appendToOpenClass : openClass).then(function() {
	        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
	          toggleInvoker($scope, { open: !!isOpen });
	        }
	      });
	    }

	    if (isOpen) {
	      if (self.dropdownMenuTemplateUrl) {
	        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
	          templateScope = scope.$new();
	          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
	            var newEl = dropdownElement;
	            self.dropdownMenu.replaceWith(newEl);
	            self.dropdownMenu = newEl;
	            $document.on('keydown', uibDropdownService.keybindFilter);
	          });
	        });
	      } else {
	        $document.on('keydown', uibDropdownService.keybindFilter);
	      }

	      scope.focusToggleElement();
	      uibDropdownService.open(scope, $element);
	    } else {
	      uibDropdownService.close(scope, $element);
	      if (self.dropdownMenuTemplateUrl) {
	        if (templateScope) {
	          templateScope.$destroy();
	        }
	        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
	        self.dropdownMenu.replaceWith(newEl);
	        self.dropdownMenu = newEl;
	      }

	      self.selectedOption = null;
	    }

	    if (angular.isFunction(setIsOpen)) {
	      setIsOpen($scope, isOpen);
	    }
	  });
	}])

	.directive('uibDropdown', function() {
	  return {
	    controller: 'UibDropdownController',
	    link: function(scope, element, attrs, dropdownCtrl) {
	      dropdownCtrl.init();
	    }
	  };
	})

	.directive('uibDropdownMenu', function() {
	  return {
	    restrict: 'A',
	    require: '?^uibDropdown',
	    link: function(scope, element, attrs, dropdownCtrl) {
	      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
	        return;
	      }

	      element.addClass('dropdown-menu');

	      var tplUrl = attrs.templateUrl;
	      if (tplUrl) {
	        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
	      }

	      if (!dropdownCtrl.dropdownMenu) {
	        dropdownCtrl.dropdownMenu = element;
	      }
	    }
	  };
	})

	.directive('uibDropdownToggle', function() {
	  return {
	    require: '?^uibDropdown',
	    link: function(scope, element, attrs, dropdownCtrl) {
	      if (!dropdownCtrl) {
	        return;
	      }

	      element.addClass('dropdown-toggle');

	      dropdownCtrl.toggleElement = element;

	      var toggleDropdown = function(event) {
	        event.preventDefault();

	        if (!element.hasClass('disabled') && !attrs.disabled) {
	          scope.$apply(function() {
	            dropdownCtrl.toggle();
	          });
	        }
	      };

	      element.bind('click', toggleDropdown);

	      // WAI-ARIA
	      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
	      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
	        element.attr('aria-expanded', !!isOpen);
	      });

	      scope.$on('$destroy', function() {
	        element.unbind('click', toggleDropdown);
	      });
	    }
	  };
	});

	angular.module('ui.bootstrap.stackedMap', [])
	/**
	 * A helper, internal data structure that acts as a map but also allows getting / removing
	 * elements in the LIFO order
	 */
	  .factory('$$stackedMap', function() {
	    return {
	      createNew: function() {
	        var stack = [];

	        return {
	          add: function(key, value) {
	            stack.push({
	              key: key,
	              value: value
	            });
	          },
	          get: function(key) {
	            for (var i = 0; i < stack.length; i++) {
	              if (key === stack[i].key) {
	                return stack[i];
	              }
	            }
	          },
	          keys: function() {
	            var keys = [];
	            for (var i = 0; i < stack.length; i++) {
	              keys.push(stack[i].key);
	            }
	            return keys;
	          },
	          top: function() {
	            return stack[stack.length - 1];
	          },
	          remove: function(key) {
	            var idx = -1;
	            for (var i = 0; i < stack.length; i++) {
	              if (key === stack[i].key) {
	                idx = i;
	                break;
	              }
	            }
	            return stack.splice(idx, 1)[0];
	          },
	          removeTop: function() {
	            return stack.pop();
	          },
	          length: function() {
	            return stack.length;
	          }
	        };
	      }
	    };
	  });
	angular.module('ui.bootstrap.modal', ['ui.bootstrap.stackedMap', 'ui.bootstrap.position'])
	/**
	 * A helper, internal data structure that stores all references attached to key
	 */
	  .factory('$$multiMap', function() {
	    return {
	      createNew: function() {
	        var map = {};

	        return {
	          entries: function() {
	            return Object.keys(map).map(function(key) {
	              return {
	                key: key,
	                value: map[key]
	              };
	            });
	          },
	          get: function(key) {
	            return map[key];
	          },
	          hasKey: function(key) {
	            return !!map[key];
	          },
	          keys: function() {
	            return Object.keys(map);
	          },
	          put: function(key, value) {
	            if (!map[key]) {
	              map[key] = [];
	            }

	            map[key].push(value);
	          },
	          remove: function(key, value) {
	            var values = map[key];

	            if (!values) {
	              return;
	            }

	            var idx = values.indexOf(value);

	            if (idx !== -1) {
	              values.splice(idx, 1);
	            }

	            if (!values.length) {
	              delete map[key];
	            }
	          }
	        };
	      }
	    };
	  })

	/**
	 * Pluggable resolve mechanism for the modal resolve resolution
	 * Supports UI Router's $resolve service
	 */
	  .provider('$uibResolve', function() {
	    var resolve = this;
	    this.resolver = null;

	    this.setResolver = function(resolver) {
	      this.resolver = resolver;
	    };

	    this.$get = ['$injector', '$q', function($injector, $q) {
	      var resolver = resolve.resolver ? $injector.get(resolve.resolver) : null;
	      return {
	        resolve: function(invocables, locals, parent, self) {
	          if (resolver) {
	            return resolver.resolve(invocables, locals, parent, self);
	          }

	          var promises = [];

	          angular.forEach(invocables, function(value) {
	            if (angular.isFunction(value) || angular.isArray(value)) {
	              promises.push($q.resolve($injector.invoke(value)));
	            } else if (angular.isString(value)) {
	              promises.push($q.resolve($injector.get(value)));
	            } else {
	              promises.push($q.resolve(value));
	            }
	          });

	          return $q.all(promises).then(function(resolves) {
	            var resolveObj = {};
	            var resolveIter = 0;
	            angular.forEach(invocables, function(value, key) {
	              resolveObj[key] = resolves[resolveIter++];
	            });

	            return resolveObj;
	          });
	        }
	      };
	    }];
	  })

	/**
	 * A helper directive for the $modal service. It creates a backdrop element.
	 */
	  .directive('uibModalBackdrop', ['$animate', '$injector', '$uibModalStack',
	  function($animate, $injector, $modalStack) {
	    return {
	      restrict: 'A',
	      compile: function(tElement, tAttrs) {
	        tElement.addClass(tAttrs.backdropClass);
	        return linkFn;
	      }
	    };

	    function linkFn(scope, element, attrs) {
	      if (attrs.modalInClass) {
	        $animate.addClass(element, attrs.modalInClass);

	        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
	          var done = setIsAsync();
	          if (scope.modalOptions.animation) {
	            $animate.removeClass(element, attrs.modalInClass).then(done);
	          } else {
	            done();
	          }
	        });
	      }
	    }
	  }])

	  .directive('uibModalWindow', ['$uibModalStack', '$q', '$animateCss', '$document',
	  function($modalStack, $q, $animateCss, $document) {
	    return {
	      scope: {
	        index: '@'
	      },
	      restrict: 'A',
	      transclude: true,
	      templateUrl: function(tElement, tAttrs) {
	        return tAttrs.templateUrl || 'uib/template/modal/window.html';
	      },
	      link: function(scope, element, attrs) {
	        element.addClass(attrs.windowTopClass || '');
	        scope.size = attrs.size;

	        scope.close = function(evt) {
	          var modal = $modalStack.getTop();
	          if (modal && modal.value.backdrop &&
	            modal.value.backdrop !== 'static' &&
	            evt.target === evt.currentTarget) {
	            evt.preventDefault();
	            evt.stopPropagation();
	            $modalStack.dismiss(modal.key, 'backdrop click');
	          }
	        };

	        // moved from template to fix issue #2280
	        element.on('click', scope.close);

	        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
	        // We can detect that by using this property in the template associated with this directive and then use
	        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
	        scope.$isRendered = true;

	        // Deferred object that will be resolved when this modal is render.
	        var modalRenderDeferObj = $q.defer();
	        // Resolve render promise post-digest
	        scope.$$postDigest(function() {
	          modalRenderDeferObj.resolve();
	        });

	        modalRenderDeferObj.promise.then(function() {
	          var animationPromise = null;

	          if (attrs.modalInClass) {
	            animationPromise = $animateCss(element, {
	              addClass: attrs.modalInClass
	            }).start();

	            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
	              var done = setIsAsync();
	              $animateCss(element, {
	                removeClass: attrs.modalInClass
	              }).start().then(done);
	            });
	          }


	          $q.when(animationPromise).then(function() {
	            // Notify {@link $modalStack} that modal is rendered.
	            var modal = $modalStack.getTop();
	            if (modal) {
	              $modalStack.modalRendered(modal.key);
	            }

	            /**
	             * If something within the freshly-opened modal already has focus (perhaps via a
	             * directive that causes focus). then no need to try and focus anything.
	             */
	            if (!($document[0].activeElement && element[0].contains($document[0].activeElement))) {
	              var inputWithAutofocus = element[0].querySelector('[autofocus]');
	              /**
	               * Auto-focusing of a freshly-opened modal element causes any child elements
	               * with the autofocus attribute to lose focus. This is an issue on touch
	               * based devices which will show and then hide the onscreen keyboard.
	               * Attempts to refocus the autofocus element via JavaScript will not reopen
	               * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
	               * the modal element if the modal does not contain an autofocus element.
	               */
	              if (inputWithAutofocus) {
	                inputWithAutofocus.focus();
	              } else {
	                element[0].focus();
	              }
	            }
	          });
	        });
	      }
	    };
	  }])

	  .directive('uibModalAnimationClass', function() {
	    return {
	      compile: function(tElement, tAttrs) {
	        if (tAttrs.modalAnimation) {
	          tElement.addClass(tAttrs.uibModalAnimationClass);
	        }
	      }
	    };
	  })

	  .directive('uibModalTransclude', ['$animate', function($animate) {
	    return {
	      link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          $animate.enter(clone, element);
	        });
	      }
	    };
	  }])

	  .factory('$uibModalStack', ['$animate', '$animateCss', '$document',
	    '$compile', '$rootScope', '$q', '$$multiMap', '$$stackedMap', '$uibPosition',
	    function($animate, $animateCss, $document, $compile, $rootScope, $q, $$multiMap, $$stackedMap, $uibPosition) {
	      var OPENED_MODAL_CLASS = 'modal-open';

	      var backdropDomEl, backdropScope;
	      var openedWindows = $$stackedMap.createNew();
	      var openedClasses = $$multiMap.createNew();
	      var $modalStack = {
	        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
	      };
	      var topModalIndex = 0;
	      var previousTopOpenedModal = null;

	      //Modal focus behavior
	      var tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
	        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
	        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
	      var scrollbarPadding;
	      var SNAKE_CASE_REGEXP = /[A-Z]/g;

	      // TODO: extract into common dependency with tooltip
	      function snake_case(name) {
	        var separator = '-';
	        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
	          return (pos ? separator : '') + letter.toLowerCase();
	        });
	      }

	      function isVisible(element) {
	        return !!(element.offsetWidth ||
	          element.offsetHeight ||
	          element.getClientRects().length);
	      }

	      function backdropIndex() {
	        var topBackdropIndex = -1;
	        var opened = openedWindows.keys();
	        for (var i = 0; i < opened.length; i++) {
	          if (openedWindows.get(opened[i]).value.backdrop) {
	            topBackdropIndex = i;
	          }
	        }

	        // If any backdrop exist, ensure that it's index is always
	        // right below the top modal
	        if (topBackdropIndex > -1 && topBackdropIndex < topModalIndex) {
	          topBackdropIndex = topModalIndex;
	        }
	        return topBackdropIndex;
	      }

	      $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
	        if (backdropScope) {
	          backdropScope.index = newBackdropIndex;
	        }
	      });

	      function removeModalWindow(modalInstance, elementToReceiveFocus) {
	        var modalWindow = openedWindows.get(modalInstance).value;
	        var appendToElement = modalWindow.appendTo;

	        //clean up the stack
	        openedWindows.remove(modalInstance);
	        previousTopOpenedModal = openedWindows.top();
	        if (previousTopOpenedModal) {
	          topModalIndex = parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10);
	        }

	        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
	          var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
	          openedClasses.remove(modalBodyClass, modalInstance);
	          var areAnyOpen = openedClasses.hasKey(modalBodyClass);
	          appendToElement.toggleClass(modalBodyClass, areAnyOpen);
	          if (!areAnyOpen && scrollbarPadding && scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
	            if (scrollbarPadding.originalRight) {
	              appendToElement.css({paddingRight: scrollbarPadding.originalRight + 'px'});
	            } else {
	              appendToElement.css({paddingRight: ''});
	            }
	            scrollbarPadding = null;
	          }
	          toggleTopWindowClass(true);
	        }, modalWindow.closedDeferred);
	        checkRemoveBackdrop();

	        //move focus to specified element if available, or else to body
	        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
	          elementToReceiveFocus.focus();
	        } else if (appendToElement.focus) {
	          appendToElement.focus();
	        }
	      }

	      // Add or remove "windowTopClass" from the top window in the stack
	      function toggleTopWindowClass(toggleSwitch) {
	        var modalWindow;

	        if (openedWindows.length() > 0) {
	          modalWindow = openedWindows.top().value;
	          modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
	        }
	      }

	      function checkRemoveBackdrop() {
	        //remove backdrop if no longer needed
	        if (backdropDomEl && backdropIndex() === -1) {
	          var backdropScopeRef = backdropScope;
	          removeAfterAnimate(backdropDomEl, backdropScope, function() {
	            backdropScopeRef = null;
	          });
	          backdropDomEl = undefined;
	          backdropScope = undefined;
	        }
	      }

	      function removeAfterAnimate(domEl, scope, done, closedDeferred) {
	        var asyncDeferred;
	        var asyncPromise = null;
	        var setIsAsync = function() {
	          if (!asyncDeferred) {
	            asyncDeferred = $q.defer();
	            asyncPromise = asyncDeferred.promise;
	          }

	          return function asyncDone() {
	            asyncDeferred.resolve();
	          };
	        };
	        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

	        // Note that it's intentional that asyncPromise might be null.
	        // That's when setIsAsync has not been called during the
	        // NOW_CLOSING_EVENT broadcast.
	        return $q.when(asyncPromise).then(afterAnimating);

	        function afterAnimating() {
	          if (afterAnimating.done) {
	            return;
	          }
	          afterAnimating.done = true;

	          $animate.leave(domEl).then(function() {
	            if (done) {
	              done();
	            }

	            domEl.remove();
	            if (closedDeferred) {
	              closedDeferred.resolve();
	            }
	          });

	          scope.$destroy();
	        }
	      }

	      $document.on('keydown', keydownListener);

	      $rootScope.$on('$destroy', function() {
	        $document.off('keydown', keydownListener);
	      });

	      function keydownListener(evt) {
	        if (evt.isDefaultPrevented()) {
	          return evt;
	        }

	        var modal = openedWindows.top();
	        if (modal) {
	          switch (evt.which) {
	            case 27: {
	              if (modal.value.keyboard) {
	                evt.preventDefault();
	                $rootScope.$apply(function() {
	                  $modalStack.dismiss(modal.key, 'escape key press');
	                });
	              }
	              break;
	            }
	            case 9: {
	              var list = $modalStack.loadFocusElementList(modal);
	              var focusChanged = false;
	              if (evt.shiftKey) {
	                if ($modalStack.isFocusInFirstItem(evt, list) || $modalStack.isModalFocused(evt, modal)) {
	                  focusChanged = $modalStack.focusLastFocusableElement(list);
	                }
	              } else {
	                if ($modalStack.isFocusInLastItem(evt, list)) {
	                  focusChanged = $modalStack.focusFirstFocusableElement(list);
	                }
	              }

	              if (focusChanged) {
	                evt.preventDefault();
	                evt.stopPropagation();
	              }

	              break;
	            }
	          }
	        }
	      }

	      $modalStack.open = function(modalInstance, modal) {
	        var modalOpener = $document[0].activeElement,
	          modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

	        toggleTopWindowClass(false);

	        // Store the current top first, to determine what index we ought to use
	        // for the current top modal
	        previousTopOpenedModal = openedWindows.top();

	        openedWindows.add(modalInstance, {
	          deferred: modal.deferred,
	          renderDeferred: modal.renderDeferred,
	          closedDeferred: modal.closedDeferred,
	          modalScope: modal.scope,
	          backdrop: modal.backdrop,
	          keyboard: modal.keyboard,
	          openedClass: modal.openedClass,
	          windowTopClass: modal.windowTopClass,
	          animation: modal.animation,
	          appendTo: modal.appendTo
	        });

	        openedClasses.put(modalBodyClass, modalInstance);

	        var appendToElement = modal.appendTo,
	            currBackdropIndex = backdropIndex();

	        if (!appendToElement.length) {
	          throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
	        }

	        if (currBackdropIndex >= 0 && !backdropDomEl) {
	          backdropScope = $rootScope.$new(true);
	          backdropScope.modalOptions = modal;
	          backdropScope.index = currBackdropIndex;
	          backdropDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
	          backdropDomEl.attr({
	            'class': 'modal-backdrop',
	            'ng-style': '{\'z-index\': 1040 + (index && 1 || 0) + index*10}',
	            'uib-modal-animation-class': 'fade',
	            'modal-in-class': 'in'
	          });
	          if (modal.backdropClass) {
	            backdropDomEl.addClass(modal.backdropClass);
	          }

	          if (modal.animation) {
	            backdropDomEl.attr('modal-animation', 'true');
	          }
	          $compile(backdropDomEl)(backdropScope);
	          $animate.enter(backdropDomEl, appendToElement);
	          if ($uibPosition.isScrollable(appendToElement)) {
	            scrollbarPadding = $uibPosition.scrollbarPadding(appendToElement);
	            if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
	              appendToElement.css({paddingRight: scrollbarPadding.right + 'px'});
	            }
	          }
	        }

	        var content;
	        if (modal.component) {
	          content = document.createElement(snake_case(modal.component.name));
	          content = angular.element(content);
	          content.attr({
	            resolve: '$resolve',
	            'modal-instance': '$uibModalInstance',
	            close: '$close($value)',
	            dismiss: '$dismiss($value)'
	          });
	        } else {
	          content = modal.content;
	        }

	        // Set the top modal index based on the index of the previous top modal
	        topModalIndex = previousTopOpenedModal ? parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10) + 1 : 0;
	        var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
	        angularDomEl.attr({
	          'class': 'modal',
	          'template-url': modal.windowTemplateUrl,
	          'window-top-class': modal.windowTopClass,
	          'role': 'dialog',
	          'aria-labelledby': modal.ariaLabelledBy,
	          'aria-describedby': modal.ariaDescribedBy,
	          'size': modal.size,
	          'index': topModalIndex,
	          'animate': 'animate',
	          'ng-style': '{\'z-index\': 1050 + $$topModalIndex*10, display: \'block\'}',
	          'tabindex': -1,
	          'uib-modal-animation-class': 'fade',
	          'modal-in-class': 'in'
	        }).append(content);
	        if (modal.windowClass) {
	          angularDomEl.addClass(modal.windowClass);
	        }

	        if (modal.animation) {
	          angularDomEl.attr('modal-animation', 'true');
	        }

	        appendToElement.addClass(modalBodyClass);
	        if (modal.scope) {
	          // we need to explicitly add the modal index to the modal scope
	          // because it is needed by ngStyle to compute the zIndex property.
	          modal.scope.$$topModalIndex = topModalIndex;
	        }
	        $animate.enter($compile(angularDomEl)(modal.scope), appendToElement);

	        openedWindows.top().value.modalDomEl = angularDomEl;
	        openedWindows.top().value.modalOpener = modalOpener;
	      };

	      function broadcastClosing(modalWindow, resultOrReason, closing) {
	        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
	      }

	      $modalStack.close = function(modalInstance, result) {
	        var modalWindow = openedWindows.get(modalInstance);
	        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
	          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
	          modalWindow.value.deferred.resolve(result);
	          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
	          return true;
	        }
	        return !modalWindow;
	      };

	      $modalStack.dismiss = function(modalInstance, reason) {
	        var modalWindow = openedWindows.get(modalInstance);
	        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
	          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
	          modalWindow.value.deferred.reject(reason);
	          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
	          return true;
	        }
	        return !modalWindow;
	      };

	      $modalStack.dismissAll = function(reason) {
	        var topModal = this.getTop();
	        while (topModal && this.dismiss(topModal.key, reason)) {
	          topModal = this.getTop();
	        }
	      };

	      $modalStack.getTop = function() {
	        return openedWindows.top();
	      };

	      $modalStack.modalRendered = function(modalInstance) {
	        var modalWindow = openedWindows.get(modalInstance);
	        if (modalWindow) {
	          modalWindow.value.renderDeferred.resolve();
	        }
	      };

	      $modalStack.focusFirstFocusableElement = function(list) {
	        if (list.length > 0) {
	          list[0].focus();
	          return true;
	        }
	        return false;
	      };

	      $modalStack.focusLastFocusableElement = function(list) {
	        if (list.length > 0) {
	          list[list.length - 1].focus();
	          return true;
	        }
	        return false;
	      };

	      $modalStack.isModalFocused = function(evt, modalWindow) {
	        if (evt && modalWindow) {
	          var modalDomEl = modalWindow.value.modalDomEl;
	          if (modalDomEl && modalDomEl.length) {
	            return (evt.target || evt.srcElement) === modalDomEl[0];
	          }
	        }
	        return false;
	      };

	      $modalStack.isFocusInFirstItem = function(evt, list) {
	        if (list.length > 0) {
	          return (evt.target || evt.srcElement) === list[0];
	        }
	        return false;
	      };

	      $modalStack.isFocusInLastItem = function(evt, list) {
	        if (list.length > 0) {
	          return (evt.target || evt.srcElement) === list[list.length - 1];
	        }
	        return false;
	      };

	      $modalStack.loadFocusElementList = function(modalWindow) {
	        if (modalWindow) {
	          var modalDomE1 = modalWindow.value.modalDomEl;
	          if (modalDomE1 && modalDomE1.length) {
	            var elements = modalDomE1[0].querySelectorAll(tabbableSelector);
	            return elements ?
	              Array.prototype.filter.call(elements, function(element) {
	                return isVisible(element);
	              }) : elements;
	          }
	        }
	      };

	      return $modalStack;
	    }])

	  .provider('$uibModal', function() {
	    var $modalProvider = {
	      options: {
	        animation: true,
	        backdrop: true, //can also be false or 'static'
	        keyboard: true
	      },
	      $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$uibResolve', '$uibModalStack',
	        function ($rootScope, $q, $document, $templateRequest, $controller, $uibResolve, $modalStack) {
	          var $modal = {};

	          function getTemplatePromise(options) {
	            return options.template ? $q.when(options.template) :
	              $templateRequest(angular.isFunction(options.templateUrl) ?
	                options.templateUrl() : options.templateUrl);
	          }

	          var promiseChain = null;
	          $modal.getPromiseChain = function() {
	            return promiseChain;
	          };

	          $modal.open = function(modalOptions) {
	            var modalResultDeferred = $q.defer();
	            var modalOpenedDeferred = $q.defer();
	            var modalClosedDeferred = $q.defer();
	            var modalRenderDeferred = $q.defer();

	            //prepare an instance of a modal to be injected into controllers and returned to a caller
	            var modalInstance = {
	              result: modalResultDeferred.promise,
	              opened: modalOpenedDeferred.promise,
	              closed: modalClosedDeferred.promise,
	              rendered: modalRenderDeferred.promise,
	              close: function (result) {
	                return $modalStack.close(modalInstance, result);
	              },
	              dismiss: function (reason) {
	                return $modalStack.dismiss(modalInstance, reason);
	              }
	            };

	            //merge and clean up options
	            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
	            modalOptions.resolve = modalOptions.resolve || {};
	            modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0);

	            //verify options
	            if (!modalOptions.component && !modalOptions.template && !modalOptions.templateUrl) {
	              throw new Error('One of component or template or templateUrl options is required.');
	            }

	            var templateAndResolvePromise;
	            if (modalOptions.component) {
	              templateAndResolvePromise = $q.when($uibResolve.resolve(modalOptions.resolve, {}, null, null));
	            } else {
	              templateAndResolvePromise =
	                $q.all([getTemplatePromise(modalOptions), $uibResolve.resolve(modalOptions.resolve, {}, null, null)]);
	            }

	            function resolveWithTemplate() {
	              return templateAndResolvePromise;
	            }

	            // Wait for the resolution of the existing promise chain.
	            // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
	            // Then add to $modalStack and resolve opened.
	            // Finally clean up the chain variable if no subsequent modal has overwritten it.
	            var samePromise;
	            samePromise = promiseChain = $q.all([promiseChain])
	              .then(resolveWithTemplate, resolveWithTemplate)
	              .then(function resolveSuccess(tplAndVars) {
	                var providedScope = modalOptions.scope || $rootScope;

	                var modalScope = providedScope.$new();
	                modalScope.$close = modalInstance.close;
	                modalScope.$dismiss = modalInstance.dismiss;

	                modalScope.$on('$destroy', function() {
	                  if (!modalScope.$$uibDestructionScheduled) {
	                    modalScope.$dismiss('$uibUnscheduledDestruction');
	                  }
	                });

	                var modal = {
	                  scope: modalScope,
	                  deferred: modalResultDeferred,
	                  renderDeferred: modalRenderDeferred,
	                  closedDeferred: modalClosedDeferred,
	                  animation: modalOptions.animation,
	                  backdrop: modalOptions.backdrop,
	                  keyboard: modalOptions.keyboard,
	                  backdropClass: modalOptions.backdropClass,
	                  windowTopClass: modalOptions.windowTopClass,
	                  windowClass: modalOptions.windowClass,
	                  windowTemplateUrl: modalOptions.windowTemplateUrl,
	                  ariaLabelledBy: modalOptions.ariaLabelledBy,
	                  ariaDescribedBy: modalOptions.ariaDescribedBy,
	                  size: modalOptions.size,
	                  openedClass: modalOptions.openedClass,
	                  appendTo: modalOptions.appendTo
	                };

	                var component = {};
	                var ctrlInstance, ctrlInstantiate, ctrlLocals = {};

	                if (modalOptions.component) {
	                  constructLocals(component, false, true, false);
	                  component.name = modalOptions.component;
	                  modal.component = component;
	                } else if (modalOptions.controller) {
	                  constructLocals(ctrlLocals, true, false, true);

	                  // the third param will make the controller instantiate later,private api
	                  // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
	                  ctrlInstantiate = $controller(modalOptions.controller, ctrlLocals, true, modalOptions.controllerAs);
	                  if (modalOptions.controllerAs && modalOptions.bindToController) {
	                    ctrlInstance = ctrlInstantiate.instance;
	                    ctrlInstance.$close = modalScope.$close;
	                    ctrlInstance.$dismiss = modalScope.$dismiss;
	                    angular.extend(ctrlInstance, {
	                      $resolve: ctrlLocals.$scope.$resolve
	                    }, providedScope);
	                  }

	                  ctrlInstance = ctrlInstantiate();

	                  if (angular.isFunction(ctrlInstance.$onInit)) {
	                    ctrlInstance.$onInit();
	                  }
	                }

	                if (!modalOptions.component) {
	                  modal.content = tplAndVars[0];
	                }

	                $modalStack.open(modalInstance, modal);
	                modalOpenedDeferred.resolve(true);

	                function constructLocals(obj, template, instanceOnScope, injectable) {
	                  obj.$scope = modalScope;
	                  obj.$scope.$resolve = {};
	                  if (instanceOnScope) {
	                    obj.$scope.$uibModalInstance = modalInstance;
	                  } else {
	                    obj.$uibModalInstance = modalInstance;
	                  }

	                  var resolves = template ? tplAndVars[1] : tplAndVars;
	                  angular.forEach(resolves, function(value, key) {
	                    if (injectable) {
	                      obj[key] = value;
	                    }

	                    obj.$scope.$resolve[key] = value;
	                  });
	                }
	            }, function resolveError(reason) {
	              modalOpenedDeferred.reject(reason);
	              modalResultDeferred.reject(reason);
	            })['finally'](function() {
	              if (promiseChain === samePromise) {
	                promiseChain = null;
	              }
	            });

	            return modalInstance;
	          };

	          return $modal;
	        }
	      ]
	    };

	    return $modalProvider;
	  });

	angular.module('ui.bootstrap.paging', [])
	/**
	 * Helper internal service for generating common controller code between the
	 * pager and pagination components
	 */
	.factory('uibPaging', ['$parse', function($parse) {
	  return {
	    create: function(ctrl, $scope, $attrs) {
	      ctrl.setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
	      ctrl.ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl
	      ctrl._watchers = [];

	      ctrl.init = function(ngModelCtrl, config) {
	        ctrl.ngModelCtrl = ngModelCtrl;
	        ctrl.config = config;

	        ngModelCtrl.$render = function() {
	          ctrl.render();
	        };

	        if ($attrs.itemsPerPage) {
	          ctrl._watchers.push($scope.$parent.$watch($attrs.itemsPerPage, function(value) {
	            ctrl.itemsPerPage = parseInt(value, 10);
	            $scope.totalPages = ctrl.calculateTotalPages();
	            ctrl.updatePage();
	          }));
	        } else {
	          ctrl.itemsPerPage = config.itemsPerPage;
	        }

	        $scope.$watch('totalItems', function(newTotal, oldTotal) {
	          if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
	            $scope.totalPages = ctrl.calculateTotalPages();
	            ctrl.updatePage();
	          }
	        });
	      };

	      ctrl.calculateTotalPages = function() {
	        var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
	        return Math.max(totalPages || 0, 1);
	      };

	      ctrl.render = function() {
	        $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue, 10) || 1;
	      };

	      $scope.selectPage = function(page, evt) {
	        if (evt) {
	          evt.preventDefault();
	        }

	        var clickAllowed = !$scope.ngDisabled || !evt;
	        if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
	          if (evt && evt.target) {
	            evt.target.blur();
	          }
	          ctrl.ngModelCtrl.$setViewValue(page);
	          ctrl.ngModelCtrl.$render();
	        }
	      };

	      $scope.getText = function(key) {
	        return $scope[key + 'Text'] || ctrl.config[key + 'Text'];
	      };

	      $scope.noPrevious = function() {
	        return $scope.page === 1;
	      };

	      $scope.noNext = function() {
	        return $scope.page === $scope.totalPages;
	      };

	      ctrl.updatePage = function() {
	        ctrl.setNumPages($scope.$parent, $scope.totalPages); // Readonly variable

	        if ($scope.page > $scope.totalPages) {
	          $scope.selectPage($scope.totalPages);
	        } else {
	          ctrl.ngModelCtrl.$render();
	        }
	      };

	      $scope.$on('$destroy', function() {
	        while (ctrl._watchers.length) {
	          ctrl._watchers.shift()();
	        }
	      });
	    }
	  };
	}]);

	angular.module('ui.bootstrap.pager', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])

	.controller('UibPagerController', ['$scope', '$attrs', 'uibPaging', 'uibPagerConfig', function($scope, $attrs, uibPaging, uibPagerConfig) {
	  $scope.align = angular.isDefined($attrs.align) ? $scope.$parent.$eval($attrs.align) : uibPagerConfig.align;

	  uibPaging.create(this, $scope, $attrs);
	}])

	.constant('uibPagerConfig', {
	  itemsPerPage: 10,
	  previousText: '« Previous',
	  nextText: 'Next »',
	  align: true
	})

	.directive('uibPager', ['uibPagerConfig', function(uibPagerConfig) {
	  return {
	    scope: {
	      totalItems: '=',
	      previousText: '@',
	      nextText: '@',
	      ngDisabled: '='
	    },
	    require: ['uibPager', '?ngModel'],
	    restrict: 'A',
	    controller: 'UibPagerController',
	    controllerAs: 'pager',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/pager/pager.html';
	    },
	    link: function(scope, element, attrs, ctrls) {
	      element.addClass('pager');
	      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (!ngModelCtrl) {
	        return; // do nothing if no ng-model
	      }

	      paginationCtrl.init(ngModelCtrl, uibPagerConfig);
	    }
	  };
	}]);

	angular.module('ui.bootstrap.pagination', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])
	.controller('UibPaginationController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', function($scope, $attrs, $parse, uibPaging, uibPaginationConfig) {
	  var ctrl = this;
	  // Setup configuration parameters
	  var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize) : uibPaginationConfig.maxSize,
	    rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate) : uibPaginationConfig.rotate,
	    forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses) : uibPaginationConfig.forceEllipses,
	    boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers) ? $scope.$parent.$eval($attrs.boundaryLinkNumbers) : uibPaginationConfig.boundaryLinkNumbers,
	    pageLabel = angular.isDefined($attrs.pageLabel) ? function(idx) { return $scope.$parent.$eval($attrs.pageLabel, {$page: idx}); } : angular.identity;
	  $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks) : uibPaginationConfig.boundaryLinks;
	  $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks) : uibPaginationConfig.directionLinks;

	  uibPaging.create(this, $scope, $attrs);

	  if ($attrs.maxSize) {
	    ctrl._watchers.push($scope.$parent.$watch($parse($attrs.maxSize), function(value) {
	      maxSize = parseInt(value, 10);
	      ctrl.render();
	    }));
	  }

	  // Create page object used in template
	  function makePage(number, text, isActive) {
	    return {
	      number: number,
	      text: text,
	      active: isActive
	    };
	  }

	  function getPages(currentPage, totalPages) {
	    var pages = [];

	    // Default page limits
	    var startPage = 1, endPage = totalPages;
	    var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

	    // recompute if maxSize
	    if (isMaxSized) {
	      if (rotate) {
	        // Current page is displayed in the middle of the visible ones
	        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
	        endPage = startPage + maxSize - 1;

	        // Adjust if limit is exceeded
	        if (endPage > totalPages) {
	          endPage = totalPages;
	          startPage = endPage - maxSize + 1;
	        }
	      } else {
	        // Visible pages are paginated with maxSize
	        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

	        // Adjust last page if limit is exceeded
	        endPage = Math.min(startPage + maxSize - 1, totalPages);
	      }
	    }

	    // Add page number links
	    for (var number = startPage; number <= endPage; number++) {
	      var page = makePage(number, pageLabel(number), number === currentPage);
	      pages.push(page);
	    }

	    // Add links to move between page sets
	    if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
	      if (startPage > 1) {
	        if (!boundaryLinkNumbers || startPage > 3) { //need ellipsis for all options unless range is too close to beginning
	        var previousPageSet = makePage(startPage - 1, '...', false);
	        pages.unshift(previousPageSet);
	      }
	        if (boundaryLinkNumbers) {
	          if (startPage === 3) { //need to replace ellipsis when the buttons would be sequential
	            var secondPageLink = makePage(2, '2', false);
	            pages.unshift(secondPageLink);
	          }
	          //add the first page
	          var firstPageLink = makePage(1, '1', false);
	          pages.unshift(firstPageLink);
	        }
	      }

	      if (endPage < totalPages) {
	        if (!boundaryLinkNumbers || endPage < totalPages - 2) { //need ellipsis for all options unless range is too close to end
	        var nextPageSet = makePage(endPage + 1, '...', false);
	        pages.push(nextPageSet);
	      }
	        if (boundaryLinkNumbers) {
	          if (endPage === totalPages - 2) { //need to replace ellipsis when the buttons would be sequential
	            var secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
	            pages.push(secondToLastPageLink);
	          }
	          //add the last page
	          var lastPageLink = makePage(totalPages, totalPages, false);
	          pages.push(lastPageLink);
	        }
	      }
	    }
	    return pages;
	  }

	  var originalRender = this.render;
	  this.render = function() {
	    originalRender();
	    if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
	      $scope.pages = getPages($scope.page, $scope.totalPages);
	    }
	  };
	}])

	.constant('uibPaginationConfig', {
	  itemsPerPage: 10,
	  boundaryLinks: false,
	  boundaryLinkNumbers: false,
	  directionLinks: true,
	  firstText: 'First',
	  previousText: 'Previous',
	  nextText: 'Next',
	  lastText: 'Last',
	  rotate: true,
	  forceEllipses: false
	})

	.directive('uibPagination', ['$parse', 'uibPaginationConfig', function($parse, uibPaginationConfig) {
	  return {
	    scope: {
	      totalItems: '=',
	      firstText: '@',
	      previousText: '@',
	      nextText: '@',
	      lastText: '@',
	      ngDisabled:'='
	    },
	    require: ['uibPagination', '?ngModel'],
	    restrict: 'A',
	    controller: 'UibPaginationController',
	    controllerAs: 'pagination',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/pagination/pagination.html';
	    },
	    link: function(scope, element, attrs, ctrls) {
	      element.addClass('pagination');
	      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (!ngModelCtrl) {
	         return; // do nothing if no ng-model
	      }

	      paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
	    }
	  };
	}]);

	/**
	 * The following features are still outstanding: animation as a
	 * function, placement as a function, inside, support for more triggers than
	 * just mouse enter/leave, html tooltips, and selector delegation.
	 */
	angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.stackedMap'])

	/**
	 * The $tooltip service creates tooltip- and popover-like directives as well as
	 * houses global options for them.
	 */
	.provider('$uibTooltip', function() {
	  // The default options tooltip and popover.
	  var defaultOptions = {
	    placement: 'top',
	    placementClassPrefix: '',
	    animation: true,
	    popupDelay: 0,
	    popupCloseDelay: 0,
	    useContentExp: false
	  };

	  // Default hide triggers for each show trigger
	  var triggerMap = {
	    'mouseenter': 'mouseleave',
	    'click': 'click',
	    'outsideClick': 'outsideClick',
	    'focus': 'blur',
	    'none': ''
	  };

	  // The options specified to the provider globally.
	  var globalOptions = {};

	  /**
	   * `options({})` allows global configuration of all tooltips in the
	   * application.
	   *
	   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
	   *     // place tooltips left instead of top by default
	   *     $tooltipProvider.options( { placement: 'left' } );
	   *   });
	   */
		this.options = function(value) {
			angular.extend(globalOptions, value);
		};

	  /**
	   * This allows you to extend the set of trigger mappings available. E.g.:
	   *
	   *   $tooltipProvider.setTriggers( { 'openTrigger': 'closeTrigger' } );
	   */
	  this.setTriggers = function setTriggers(triggers) {
	    angular.extend(triggerMap, triggers);
	  };

	  /**
	   * This is a helper function for translating camel-case to snake_case.
	   */
	  function snake_case(name) {
	    var regexp = /[A-Z]/g;
	    var separator = '-';
	    return name.replace(regexp, function(letter, pos) {
	      return (pos ? separator : '') + letter.toLowerCase();
	    });
	  }

	  /**
	   * Returns the actual instance of the $tooltip service.
	   * TODO support multiple triggers
	   */
	  this.$get = ['$window', '$compile', '$timeout', '$document', '$uibPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
	    var openedTooltips = $$stackedMap.createNew();
	    $document.on('keyup', keypressListener);

	    $rootScope.$on('$destroy', function() {
	      $document.off('keyup', keypressListener);
	    });

	    function keypressListener(e) {
	      if (e.which === 27) {
	        var last = openedTooltips.top();
	        if (last) {
	          last.value.close();
	          last = null;
	        }
	      }
	    }

	    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
	      options = angular.extend({}, defaultOptions, globalOptions, options);

	      /**
	       * Returns an object of show and hide triggers.
	       *
	       * If a trigger is supplied,
	       * it is used to show the tooltip; otherwise, it will use the `trigger`
	       * option passed to the `$tooltipProvider.options` method; else it will
	       * default to the trigger supplied to this directive factory.
	       *
	       * The hide trigger is based on the show trigger. If the `trigger` option
	       * was passed to the `$tooltipProvider.options` method, it will use the
	       * mapped trigger from `triggerMap` or the passed trigger if the map is
	       * undefined; otherwise, it uses the `triggerMap` value of the show
	       * trigger; else it will just use the show trigger.
	       */
	      function getTriggers(trigger) {
	        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
	        var hide = show.map(function(trigger) {
	          return triggerMap[trigger] || trigger;
	        });
	        return {
	          show: show,
	          hide: hide
	        };
	      }

	      var directiveName = snake_case(ttType);

	      var startSym = $interpolate.startSymbol();
	      var endSym = $interpolate.endSymbol();
	      var template =
	        '<div '+ directiveName + '-popup ' +
	          'uib-title="' + startSym + 'title' + endSym + '" ' +
	          (options.useContentExp ?
	            'content-exp="contentExp()" ' :
	            'content="' + startSym + 'content' + endSym + '" ') +
	          'origin-scope="origScope" ' +
	          'class="uib-position-measure ' + prefix + '" ' +
	          'tooltip-animation-class="fade"' +
	          'uib-tooltip-classes ' +
	          'ng-class="{ in: isOpen }" ' +
	          '>' +
	        '</div>';

	      return {
	        compile: function(tElem, tAttrs) {
	          var tooltipLinker = $compile(template);

	          return function link(scope, element, attrs, tooltipCtrl) {
	            var tooltip;
	            var tooltipLinkedScope;
	            var transitionTimeout;
	            var showTimeout;
	            var hideTimeout;
	            var positionTimeout;
	            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
	            var triggers = getTriggers(undefined);
	            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
	            var ttScope = scope.$new(true);
	            var repositionScheduled = false;
	            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
	            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
	            var observers = [];
	            var lastPlacement;

	            var positionTooltip = function() {
	              // check if tooltip exists and is not empty
	              if (!tooltip || !tooltip.html()) { return; }

	              if (!positionTimeout) {
	                positionTimeout = $timeout(function() {
	                  var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
	                  var initialHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
	                  var elementPos = appendToBody ? $position.offset(element) : $position.position(element);
	                  tooltip.css({ top: ttPosition.top + 'px', left: ttPosition.left + 'px' });
	                  var placementClasses = ttPosition.placement.split('-');

	                  if (!tooltip.hasClass(placementClasses[0])) {
	                    tooltip.removeClass(lastPlacement.split('-')[0]);
	                    tooltip.addClass(placementClasses[0]);
	                  }

	                  if (!tooltip.hasClass(options.placementClassPrefix + ttPosition.placement)) {
	                    tooltip.removeClass(options.placementClassPrefix + lastPlacement);
	                    tooltip.addClass(options.placementClassPrefix + ttPosition.placement);
	                  }

	                  $timeout(function() {
	                    var currentHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
	                    var adjustment = $position.adjustTop(placementClasses, elementPos, initialHeight, currentHeight);
	                    if (adjustment) {
	                      tooltip.css(adjustment);
	                    }
	                  }, 0, false);

	                  // first time through tt element will have the
	                  // uib-position-measure class or if the placement
	                  // has changed we need to position the arrow.
	                  if (tooltip.hasClass('uib-position-measure')) {
	                    $position.positionArrow(tooltip, ttPosition.placement);
	                    tooltip.removeClass('uib-position-measure');
	                  } else if (lastPlacement !== ttPosition.placement) {
	                    $position.positionArrow(tooltip, ttPosition.placement);
	                  }
	                  lastPlacement = ttPosition.placement;

	                  positionTimeout = null;
	                }, 0, false);
	              }
	            };

	            // Set up the correct scope to allow transclusion later
	            ttScope.origScope = scope;

	            // By default, the tooltip is not open.
	            // TODO add ability to start tooltip opened
	            ttScope.isOpen = false;

	            function toggleTooltipBind() {
	              if (!ttScope.isOpen) {
	                showTooltipBind();
	              } else {
	                hideTooltipBind();
	              }
	            }

	            // Show the tooltip with delay if specified, otherwise show it immediately
	            function showTooltipBind() {
	              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
	                return;
	              }

	              cancelHide();
	              prepareTooltip();

	              if (ttScope.popupDelay) {
	                // Do nothing if the tooltip was already scheduled to pop-up.
	                // This happens if show is triggered multiple times before any hide is triggered.
	                if (!showTimeout) {
	                  showTimeout = $timeout(show, ttScope.popupDelay, false);
	                }
	              } else {
	                show();
	              }
	            }

	            function hideTooltipBind() {
	              cancelShow();

	              if (ttScope.popupCloseDelay) {
	                if (!hideTimeout) {
	                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
	                }
	              } else {
	                hide();
	              }
	            }

	            // Show the tooltip popup element.
	            function show() {
	              cancelShow();
	              cancelHide();

	              // Don't show empty tooltips.
	              if (!ttScope.content) {
	                return angular.noop;
	              }

	              createTooltip();

	              // And show the tooltip.
	              ttScope.$evalAsync(function() {
	                ttScope.isOpen = true;
	                assignIsOpen(true);
	                positionTooltip();
	              });
	            }

	            function cancelShow() {
	              if (showTimeout) {
	                $timeout.cancel(showTimeout);
	                showTimeout = null;
	              }

	              if (positionTimeout) {
	                $timeout.cancel(positionTimeout);
	                positionTimeout = null;
	              }
	            }

	            // Hide the tooltip popup element.
	            function hide() {
	              if (!ttScope) {
	                return;
	              }

	              // First things first: we don't show it anymore.
	              ttScope.$evalAsync(function() {
	                if (ttScope) {
	                  ttScope.isOpen = false;
	                  assignIsOpen(false);
	                  // And now we remove it from the DOM. However, if we have animation, we
	                  // need to wait for it to expire beforehand.
	                  // FIXME: this is a placeholder for a port of the transitions library.
	                  // The fade transition in TWBS is 150ms.
	                  if (ttScope.animation) {
	                    if (!transitionTimeout) {
	                      transitionTimeout = $timeout(removeTooltip, 150, false);
	                    }
	                  } else {
	                    removeTooltip();
	                  }
	                }
	              });
	            }

	            function cancelHide() {
	              if (hideTimeout) {
	                $timeout.cancel(hideTimeout);
	                hideTimeout = null;
	              }

	              if (transitionTimeout) {
	                $timeout.cancel(transitionTimeout);
	                transitionTimeout = null;
	              }
	            }

	            function createTooltip() {
	              // There can only be one tooltip element per directive shown at once.
	              if (tooltip) {
	                return;
	              }

	              tooltipLinkedScope = ttScope.$new();
	              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
	                if (appendToBody) {
	                  $document.find('body').append(tooltip);
	                } else {
	                  element.after(tooltip);
	                }
	              });

	              openedTooltips.add(ttScope, {
	                close: hide
	              });

	              prepObservers();
	            }

	            function removeTooltip() {
	              cancelShow();
	              cancelHide();
	              unregisterObservers();

	              if (tooltip) {
	                tooltip.remove();
	                tooltip = null;
	              }

	              openedTooltips.remove(ttScope);
	              
	              if (tooltipLinkedScope) {
	                tooltipLinkedScope.$destroy();
	                tooltipLinkedScope = null;
	              }
	            }

	            /**
	             * Set the initial scope values. Once
	             * the tooltip is created, the observers
	             * will be added to keep things in sync.
	             */
	            function prepareTooltip() {
	              ttScope.title = attrs[prefix + 'Title'];
	              if (contentParse) {
	                ttScope.content = contentParse(scope);
	              } else {
	                ttScope.content = attrs[ttType];
	              }

	              ttScope.popupClass = attrs[prefix + 'Class'];
	              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
	              var placement = $position.parsePlacement(ttScope.placement);
	              lastPlacement = placement[1] ? placement[0] + '-' + placement[1] : placement[0];

	              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
	              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
	              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
	              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
	            }

	            function assignIsOpen(isOpen) {
	              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
	                isOpenParse.assign(scope, isOpen);
	              }
	            }

	            ttScope.contentExp = function() {
	              return ttScope.content;
	            };

	            /**
	             * Observe the relevant attributes.
	             */
	            attrs.$observe('disabled', function(val) {
	              if (val) {
	                cancelShow();
	              }

	              if (val && ttScope.isOpen) {
	                hide();
	              }
	            });

	            if (isOpenParse) {
	              scope.$watch(isOpenParse, function(val) {
	                if (ttScope && !val === ttScope.isOpen) {
	                  toggleTooltipBind();
	                }
	              });
	            }

	            function prepObservers() {
	              observers.length = 0;

	              if (contentParse) {
	                observers.push(
	                  scope.$watch(contentParse, function(val) {
	                    ttScope.content = val;
	                    if (!val && ttScope.isOpen) {
	                      hide();
	                    }
	                  })
	                );

	                observers.push(
	                  tooltipLinkedScope.$watch(function() {
	                    if (!repositionScheduled) {
	                      repositionScheduled = true;
	                      tooltipLinkedScope.$$postDigest(function() {
	                        repositionScheduled = false;
	                        if (ttScope && ttScope.isOpen) {
	                          positionTooltip();
	                        }
	                      });
	                    }
	                  })
	                );
	              } else {
	                observers.push(
	                  attrs.$observe(ttType, function(val) {
	                    ttScope.content = val;
	                    if (!val && ttScope.isOpen) {
	                      hide();
	                    } else {
	                      positionTooltip();
	                    }
	                  })
	                );
	              }

	              observers.push(
	                attrs.$observe(prefix + 'Title', function(val) {
	                  ttScope.title = val;
	                  if (ttScope.isOpen) {
	                    positionTooltip();
	                  }
	                })
	              );

	              observers.push(
	                attrs.$observe(prefix + 'Placement', function(val) {
	                  ttScope.placement = val ? val : options.placement;
	                  if (ttScope.isOpen) {
	                    positionTooltip();
	                  }
	                })
	              );
	            }

	            function unregisterObservers() {
	              if (observers.length) {
	                angular.forEach(observers, function(observer) {
	                  observer();
	                });
	                observers.length = 0;
	              }
	            }

	            // hide tooltips/popovers for outsideClick trigger
	            function bodyHideTooltipBind(e) {
	              if (!ttScope || !ttScope.isOpen || !tooltip) {
	                return;
	              }
	              // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
	              if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
	                hideTooltipBind();
	              }
	            }

	            var unregisterTriggers = function() {
	              triggers.show.forEach(function(trigger) {
	                if (trigger === 'outsideClick') {
	                  element.off('click', toggleTooltipBind);
	                } else {
	                  element.off(trigger, showTooltipBind);
	                  element.off(trigger, toggleTooltipBind);
	                }
	              });
	              triggers.hide.forEach(function(trigger) {
	                if (trigger === 'outsideClick') {
	                  $document.off('click', bodyHideTooltipBind);
	                } else {
	                  element.off(trigger, hideTooltipBind);
	                }
	              });
	            };

	            function prepTriggers() {
	              var showTriggers = [], hideTriggers = [];
	              var val = scope.$eval(attrs[prefix + 'Trigger']);
	              unregisterTriggers();

	              if (angular.isObject(val)) {
	                Object.keys(val).forEach(function(key) {
	                  showTriggers.push(key);
	                  hideTriggers.push(val[key]);
	                });
	                triggers = {
	                  show: showTriggers,
	                  hide: hideTriggers
	                };
	              } else {
	                triggers = getTriggers(val);
	              }

	              if (triggers.show !== 'none') {
	                triggers.show.forEach(function(trigger, idx) {
	                  if (trigger === 'outsideClick') {
	                    element.on('click', toggleTooltipBind);
	                    $document.on('click', bodyHideTooltipBind);
	                  } else if (trigger === triggers.hide[idx]) {
	                    element.on(trigger, toggleTooltipBind);
	                  } else if (trigger) {
	                    element.on(trigger, showTooltipBind);
	                    element.on(triggers.hide[idx], hideTooltipBind);
	                  }

	                  element.on('keypress', function(e) {
	                    if (e.which === 27) {
	                      hideTooltipBind();
	                    }
	                  });
	                });
	              }
	            }

	            prepTriggers();

	            var animation = scope.$eval(attrs[prefix + 'Animation']);
	            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

	            var appendToBodyVal;
	            var appendKey = prefix + 'AppendToBody';
	            if (appendKey in attrs && attrs[appendKey] === undefined) {
	              appendToBodyVal = true;
	            } else {
	              appendToBodyVal = scope.$eval(attrs[appendKey]);
	            }

	            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

	            // Make sure tooltip is destroyed and removed.
	            scope.$on('$destroy', function onDestroyTooltip() {
	              unregisterTriggers();
	              removeTooltip();
	              ttScope = null;
	            });
	          };
	        }
	      };
	    };
	  }];
	})

	// This is mostly ngInclude code but with a custom scope
	.directive('uibTooltipTemplateTransclude', [
	         '$animate', '$sce', '$compile', '$templateRequest',
	function ($animate, $sce, $compile, $templateRequest) {
	  return {
	    link: function(scope, elem, attrs) {
	      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

	      var changeCounter = 0,
	        currentScope,
	        previousElement,
	        currentElement;

	      var cleanupLastIncludeContent = function() {
	        if (previousElement) {
	          previousElement.remove();
	          previousElement = null;
	        }

	        if (currentScope) {
	          currentScope.$destroy();
	          currentScope = null;
	        }

	        if (currentElement) {
	          $animate.leave(currentElement).then(function() {
	            previousElement = null;
	          });
	          previousElement = currentElement;
	          currentElement = null;
	        }
	      };

	      scope.$watch($sce.parseAsResourceUrl(attrs.uibTooltipTemplateTransclude), function(src) {
	        var thisChangeId = ++changeCounter;

	        if (src) {
	          //set the 2nd param to true to ignore the template request error so that the inner
	          //contents and scope can be cleaned up.
	          $templateRequest(src, true).then(function(response) {
	            if (thisChangeId !== changeCounter) { return; }
	            var newScope = origScope.$new();
	            var template = response;

	            var clone = $compile(template)(newScope, function(clone) {
	              cleanupLastIncludeContent();
	              $animate.enter(clone, elem);
	            });

	            currentScope = newScope;
	            currentElement = clone;

	            currentScope.$emit('$includeContentLoaded', src);
	          }, function() {
	            if (thisChangeId === changeCounter) {
	              cleanupLastIncludeContent();
	              scope.$emit('$includeContentError', src);
	            }
	          });
	          scope.$emit('$includeContentRequested', src);
	        } else {
	          cleanupLastIncludeContent();
	        }
	      });

	      scope.$on('$destroy', cleanupLastIncludeContent);
	    }
	  };
	}])

	/**
	 * Note that it's intentional that these classes are *not* applied through $animate.
	 * They must not be animated as they're expected to be present on the tooltip on
	 * initialization.
	 */
	.directive('uibTooltipClasses', ['$uibPosition', function($uibPosition) {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      // need to set the primary position so the
	      // arrow has space during position measure.
	      // tooltip.positionTooltip()
	      if (scope.placement) {
	        // // There are no top-left etc... classes
	        // // in TWBS, so we need the primary position.
	        var position = $uibPosition.parsePlacement(scope.placement);
	        element.addClass(position[0]);
	      }

	      if (scope.popupClass) {
	        element.addClass(scope.popupClass);
	      }

	      if (scope.animation) {
	        element.addClass(attrs.tooltipAnimationClass);
	      }
	    }
	  };
	}])

	.directive('uibTooltipPopup', function() {
	  return {
	    restrict: 'A',
	    scope: { content: '@' },
	    templateUrl: 'uib/template/tooltip/tooltip-popup.html'
	  };
	})

	.directive('uibTooltip', [ '$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibTooltip', 'tooltip', 'mouseenter');
	}])

	.directive('uibTooltipTemplatePopup', function() {
	  return {
	    restrict: 'A',
	    scope: { contentExp: '&', originScope: '&' },
	    templateUrl: 'uib/template/tooltip/tooltip-template-popup.html'
	  };
	})

	.directive('uibTooltipTemplate', ['$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibTooltipTemplate', 'tooltip', 'mouseenter', {
	    useContentExp: true
	  });
	}])

	.directive('uibTooltipHtmlPopup', function() {
	  return {
	    restrict: 'A',
	    scope: { contentExp: '&' },
	    templateUrl: 'uib/template/tooltip/tooltip-html-popup.html'
	  };
	})

	.directive('uibTooltipHtml', ['$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibTooltipHtml', 'tooltip', 'mouseenter', {
	    useContentExp: true
	  });
	}]);

	/**
	 * The following features are still outstanding: popup delay, animation as a
	 * function, placement as a function, inside, support for more triggers than
	 * just mouse enter/leave, and selector delegatation.
	 */
	angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

	.directive('uibPopoverTemplatePopup', function() {
	  return {
	    restrict: 'A',
	    scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
	    templateUrl: 'uib/template/popover/popover-template.html'
	  };
	})

	.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
	    useContentExp: true
	  });
	}])

	.directive('uibPopoverHtmlPopup', function() {
	  return {
	    restrict: 'A',
	    scope: { contentExp: '&', uibTitle: '@' },
	    templateUrl: 'uib/template/popover/popover-html.html'
	  };
	})

	.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
	    useContentExp: true
	  });
	}])

	.directive('uibPopoverPopup', function() {
	  return {
	    restrict: 'A',
	    scope: { uibTitle: '@', content: '@' },
	    templateUrl: 'uib/template/popover/popover.html'
	  };
	})

	.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
	  return $uibTooltip('uibPopover', 'popover', 'click');
	}]);

	angular.module('ui.bootstrap.progressbar', [])

	.constant('uibProgressConfig', {
	  animate: true,
	  max: 100
	})

	.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
	  var self = this,
	      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

	  this.bars = [];
	  $scope.max = getMaxOrDefault();

	  this.addBar = function(bar, element, attrs) {
	    if (!animate) {
	      element.css({'transition': 'none'});
	    }

	    this.bars.push(bar);

	    bar.max = getMaxOrDefault();
	    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

	    bar.$watch('value', function(value) {
	      bar.recalculatePercentage();
	    });

	    bar.recalculatePercentage = function() {
	      var totalPercentage = self.bars.reduce(function(total, bar) {
	        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
	        return total + bar.percent;
	      }, 0);

	      if (totalPercentage > 100) {
	        bar.percent -= totalPercentage - 100;
	      }
	    };

	    bar.$on('$destroy', function() {
	      element = null;
	      self.removeBar(bar);
	    });
	  };

	  this.removeBar = function(bar) {
	    this.bars.splice(this.bars.indexOf(bar), 1);
	    this.bars.forEach(function (bar) {
	      bar.recalculatePercentage();
	    });
	  };

	  //$attrs.$observe('maxParam', function(maxParam) {
	  $scope.$watch('maxParam', function(maxParam) {
	    self.bars.forEach(function(bar) {
	      bar.max = getMaxOrDefault();
	      bar.recalculatePercentage();
	    });
	  });

	  function getMaxOrDefault () {
	    return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
	  }
	}])

	.directive('uibProgress', function() {
	  return {
	    replace: true,
	    transclude: true,
	    controller: 'UibProgressController',
	    require: 'uibProgress',
	    scope: {
	      maxParam: '=?max'
	    },
	    templateUrl: 'uib/template/progressbar/progress.html'
	  };
	})

	.directive('uibBar', function() {
	  return {
	    replace: true,
	    transclude: true,
	    require: '^uibProgress',
	    scope: {
	      value: '=',
	      type: '@'
	    },
	    templateUrl: 'uib/template/progressbar/bar.html',
	    link: function(scope, element, attrs, progressCtrl) {
	      progressCtrl.addBar(scope, element, attrs);
	    }
	  };
	})

	.directive('uibProgressbar', function() {
	  return {
	    replace: true,
	    transclude: true,
	    controller: 'UibProgressController',
	    scope: {
	      value: '=',
	      maxParam: '=?max',
	      type: '@'
	    },
	    templateUrl: 'uib/template/progressbar/progressbar.html',
	    link: function(scope, element, attrs, progressCtrl) {
	      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
	    }
	  };
	});

	angular.module('ui.bootstrap.rating', [])

	.constant('uibRatingConfig', {
	  max: 5,
	  stateOn: null,
	  stateOff: null,
	  enableReset: true,
	  titles: ['one', 'two', 'three', 'four', 'five']
	})

	.controller('UibRatingController', ['$scope', '$attrs', 'uibRatingConfig', function($scope, $attrs, ratingConfig) {
	  var ngModelCtrl = { $setViewValue: angular.noop },
	    self = this;

	  this.init = function(ngModelCtrl_) {
	    ngModelCtrl = ngModelCtrl_;
	    ngModelCtrl.$render = this.render;

	    ngModelCtrl.$formatters.push(function(value) {
	      if (angular.isNumber(value) && value << 0 !== value) {
	        value = Math.round(value);
	      }

	      return value;
	    });

	    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
	    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
	    this.enableReset = angular.isDefined($attrs.enableReset) ?
	      $scope.$parent.$eval($attrs.enableReset) : ratingConfig.enableReset;
	    var tmpTitles = angular.isDefined($attrs.titles) ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles;
	    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
	      tmpTitles : ratingConfig.titles;

	    var ratingStates = angular.isDefined($attrs.ratingStates) ?
	      $scope.$parent.$eval($attrs.ratingStates) :
	      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
	    $scope.range = this.buildTemplateObjects(ratingStates);
	  };

	  this.buildTemplateObjects = function(states) {
	    for (var i = 0, n = states.length; i < n; i++) {
	      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
	    }
	    return states;
	  };

	  this.getTitle = function(index) {
	    if (index >= this.titles.length) {
	      return index + 1;
	    }

	    return this.titles[index];
	  };

	  $scope.rate = function(value) {
	    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
	      var newViewValue = self.enableReset && ngModelCtrl.$viewValue === value ? 0 : value;
	      ngModelCtrl.$setViewValue(newViewValue);
	      ngModelCtrl.$render();
	    }
	  };

	  $scope.enter = function(value) {
	    if (!$scope.readonly) {
	      $scope.value = value;
	    }
	    $scope.onHover({value: value});
	  };

	  $scope.reset = function() {
	    $scope.value = ngModelCtrl.$viewValue;
	    $scope.onLeave();
	  };

	  $scope.onKeydown = function(evt) {
	    if (/(37|38|39|40)/.test(evt.which)) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
	    }
	  };

	  this.render = function() {
	    $scope.value = ngModelCtrl.$viewValue;
	    $scope.title = self.getTitle($scope.value - 1);
	  };
	}])

	.directive('uibRating', function() {
	  return {
	    require: ['uibRating', 'ngModel'],
	    restrict: 'A',
	    scope: {
	      readonly: '=?readOnly',
	      onHover: '&',
	      onLeave: '&'
	    },
	    controller: 'UibRatingController',
	    templateUrl: 'uib/template/rating/rating.html',
	    link: function(scope, element, attrs, ctrls) {
	      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
	      ratingCtrl.init(ngModelCtrl);
	    }
	  };
	});

	angular.module('ui.bootstrap.tabs', [])

	.controller('UibTabsetController', ['$scope', function ($scope) {
	  var ctrl = this,
	    oldIndex;
	  ctrl.tabs = [];

	  ctrl.select = function(index, evt) {
	    if (!destroyed) {
	      var previousIndex = findTabIndex(oldIndex);
	      var previousSelected = ctrl.tabs[previousIndex];
	      if (previousSelected) {
	        previousSelected.tab.onDeselect({
	          $event: evt,
	          $selectedIndex: index
	        });
	        if (evt && evt.isDefaultPrevented()) {
	          return;
	        }
	        previousSelected.tab.active = false;
	      }

	      var selected = ctrl.tabs[index];
	      if (selected) {
	        selected.tab.onSelect({
	          $event: evt
	        });
	        selected.tab.active = true;
	        ctrl.active = selected.index;
	        oldIndex = selected.index;
	      } else if (!selected && angular.isDefined(oldIndex)) {
	        ctrl.active = null;
	        oldIndex = null;
	      }
	    }
	  };

	  ctrl.addTab = function addTab(tab) {
	    ctrl.tabs.push({
	      tab: tab,
	      index: tab.index
	    });
	    ctrl.tabs.sort(function(t1, t2) {
	      if (t1.index > t2.index) {
	        return 1;
	      }

	      if (t1.index < t2.index) {
	        return -1;
	      }

	      return 0;
	    });

	    if (tab.index === ctrl.active || !angular.isDefined(ctrl.active) && ctrl.tabs.length === 1) {
	      var newActiveIndex = findTabIndex(tab.index);
	      ctrl.select(newActiveIndex);
	    }
	  };

	  ctrl.removeTab = function removeTab(tab) {
	    var index;
	    for (var i = 0; i < ctrl.tabs.length; i++) {
	      if (ctrl.tabs[i].tab === tab) {
	        index = i;
	        break;
	      }
	    }

	    if (ctrl.tabs[index].index === ctrl.active) {
	      var newActiveTabIndex = index === ctrl.tabs.length - 1 ?
	        index - 1 : index + 1 % ctrl.tabs.length;
	      ctrl.select(newActiveTabIndex);
	    }

	    ctrl.tabs.splice(index, 1);
	  };

	  $scope.$watch('tabset.active', function(val) {
	    if (angular.isDefined(val) && val !== oldIndex) {
	      ctrl.select(findTabIndex(val));
	    }
	  });

	  var destroyed;
	  $scope.$on('$destroy', function() {
	    destroyed = true;
	  });

	  function findTabIndex(index) {
	    for (var i = 0; i < ctrl.tabs.length; i++) {
	      if (ctrl.tabs[i].index === index) {
	        return i;
	      }
	    }
	  }
	}])

	.directive('uibTabset', function() {
	  return {
	    transclude: true,
	    replace: true,
	    scope: {},
	    bindToController: {
	      active: '=?',
	      type: '@'
	    },
	    controller: 'UibTabsetController',
	    controllerAs: 'tabset',
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/tabs/tabset.html';
	    },
	    link: function(scope, element, attrs) {
	      scope.vertical = angular.isDefined(attrs.vertical) ?
	        scope.$parent.$eval(attrs.vertical) : false;
	      scope.justified = angular.isDefined(attrs.justified) ?
	        scope.$parent.$eval(attrs.justified) : false;
	    }
	  };
	})

	.directive('uibTab', ['$parse', function($parse) {
	  return {
	    require: '^uibTabset',
	    replace: true,
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || 'uib/template/tabs/tab.html';
	    },
	    transclude: true,
	    scope: {
	      heading: '@',
	      index: '=?',
	      classes: '@?',
	      onSelect: '&select', //This callback is called in contentHeadingTransclude
	                          //once it inserts the tab's content into the dom
	      onDeselect: '&deselect'
	    },
	    controller: function() {
	      //Empty controller so other directives can require being 'under' a tab
	    },
	    controllerAs: 'tab',
	    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
	      scope.disabled = false;
	      if (attrs.disable) {
	        scope.$parent.$watch($parse(attrs.disable), function(value) {
	          scope.disabled = !! value;
	        });
	      }

	      if (angular.isUndefined(attrs.index)) {
	        if (tabsetCtrl.tabs && tabsetCtrl.tabs.length) {
	          scope.index = Math.max.apply(null, tabsetCtrl.tabs.map(function(t) { return t.index; })) + 1;
	        } else {
	          scope.index = 0;
	        }
	      }

	      if (angular.isUndefined(attrs.classes)) {
	        scope.classes = '';
	      }

	      scope.select = function(evt) {
	        if (!scope.disabled) {
	          var index;
	          for (var i = 0; i < tabsetCtrl.tabs.length; i++) {
	            if (tabsetCtrl.tabs[i].tab === scope) {
	              index = i;
	              break;
	            }
	          }

	          tabsetCtrl.select(index, evt);
	        }
	      };

	      tabsetCtrl.addTab(scope);
	      scope.$on('$destroy', function() {
	        tabsetCtrl.removeTab(scope);
	      });

	      //We need to transclude later, once the content container is ready.
	      //when this link happens, we're inside a tab heading.
	      scope.$transcludeFn = transclude;
	    }
	  };
	}])

	.directive('uibTabHeadingTransclude', function() {
	  return {
	    restrict: 'A',
	    require: '^uibTab',
	    link: function(scope, elm) {
	      scope.$watch('headingElement', function updateHeadingElement(heading) {
	        if (heading) {
	          elm.html('');
	          elm.append(heading);
	        }
	      });
	    }
	  };
	})

	.directive('uibTabContentTransclude', function() {
	  return {
	    restrict: 'A',
	    require: '^uibTabset',
	    link: function(scope, elm, attrs) {
	      var tab = scope.$eval(attrs.uibTabContentTransclude).tab;

	      //Now our tab is ready to be transcluded: both the tab heading area
	      //and the tab content area are loaded.  Transclude 'em both.
	      tab.$transcludeFn(tab.$parent, function(contents) {
	        angular.forEach(contents, function(node) {
	          if (isTabHeading(node)) {
	            //Let tabHeadingTransclude know.
	            tab.headingElement = node;
	          } else {
	            elm.append(node);
	          }
	        });
	      });
	    }
	  };

	  function isTabHeading(node) {
	    return node.tagName && (
	      node.hasAttribute('uib-tab-heading') ||
	      node.hasAttribute('data-uib-tab-heading') ||
	      node.hasAttribute('x-uib-tab-heading') ||
	      node.tagName.toLowerCase() === 'uib-tab-heading' ||
	      node.tagName.toLowerCase() === 'data-uib-tab-heading' ||
	      node.tagName.toLowerCase() === 'x-uib-tab-heading' ||
	      node.tagName.toLowerCase() === 'uib:tab-heading'
	    );
	  }
	});

	angular.module('ui.bootstrap.timepicker', [])

	.constant('uibTimepickerConfig', {
	  hourStep: 1,
	  minuteStep: 1,
	  secondStep: 1,
	  showMeridian: true,
	  showSeconds: false,
	  meridians: null,
	  readonlyInput: false,
	  mousewheel: true,
	  arrowkeys: true,
	  showSpinners: true,
	  templateUrl: 'uib/template/timepicker/timepicker.html'
	})

	.controller('UibTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'uibTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
	  var selected = new Date(),
	    watchers = [],
	    ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
	    meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS,
	    padHours = angular.isDefined($attrs.padHours) ? $scope.$parent.$eval($attrs.padHours) : true;

	  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
	  $element.removeAttr('tabindex');

	  this.init = function(ngModelCtrl_, inputs) {
	    ngModelCtrl = ngModelCtrl_;
	    ngModelCtrl.$render = this.render;

	    ngModelCtrl.$formatters.unshift(function(modelValue) {
	      return modelValue ? new Date(modelValue) : null;
	    });

	    var hoursInputEl = inputs.eq(0),
	        minutesInputEl = inputs.eq(1),
	        secondsInputEl = inputs.eq(2);

	    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;

	    if (mousewheel) {
	      this.setupMousewheelEvents(hoursInputEl, minutesInputEl, secondsInputEl);
	    }

	    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
	    if (arrowkeys) {
	      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl, secondsInputEl);
	    }

	    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
	    this.setupInputEvents(hoursInputEl, minutesInputEl, secondsInputEl);
	  };

	  var hourStep = timepickerConfig.hourStep;
	  if ($attrs.hourStep) {
	    watchers.push($scope.$parent.$watch($parse($attrs.hourStep), function(value) {
	      hourStep = +value;
	    }));
	  }

	  var minuteStep = timepickerConfig.minuteStep;
	  if ($attrs.minuteStep) {
	    watchers.push($scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
	      minuteStep = +value;
	    }));
	  }

	  var min;
	  watchers.push($scope.$parent.$watch($parse($attrs.min), function(value) {
	    var dt = new Date(value);
	    min = isNaN(dt) ? undefined : dt;
	  }));

	  var max;
	  watchers.push($scope.$parent.$watch($parse($attrs.max), function(value) {
	    var dt = new Date(value);
	    max = isNaN(dt) ? undefined : dt;
	  }));

	  var disabled = false;
	  if ($attrs.ngDisabled) {
	    watchers.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(value) {
	      disabled = value;
	    }));
	  }

	  $scope.noIncrementHours = function() {
	    var incrementedSelected = addMinutes(selected, hourStep * 60);
	    return disabled || incrementedSelected > max ||
	      incrementedSelected < selected && incrementedSelected < min;
	  };

	  $scope.noDecrementHours = function() {
	    var decrementedSelected = addMinutes(selected, -hourStep * 60);
	    return disabled || decrementedSelected < min ||
	      decrementedSelected > selected && decrementedSelected > max;
	  };

	  $scope.noIncrementMinutes = function() {
	    var incrementedSelected = addMinutes(selected, minuteStep);
	    return disabled || incrementedSelected > max ||
	      incrementedSelected < selected && incrementedSelected < min;
	  };

	  $scope.noDecrementMinutes = function() {
	    var decrementedSelected = addMinutes(selected, -minuteStep);
	    return disabled || decrementedSelected < min ||
	      decrementedSelected > selected && decrementedSelected > max;
	  };

	  $scope.noIncrementSeconds = function() {
	    var incrementedSelected = addSeconds(selected, secondStep);
	    return disabled || incrementedSelected > max ||
	      incrementedSelected < selected && incrementedSelected < min;
	  };

	  $scope.noDecrementSeconds = function() {
	    var decrementedSelected = addSeconds(selected, -secondStep);
	    return disabled || decrementedSelected < min ||
	      decrementedSelected > selected && decrementedSelected > max;
	  };

	  $scope.noToggleMeridian = function() {
	    if (selected.getHours() < 12) {
	      return disabled || addMinutes(selected, 12 * 60) > max;
	    }

	    return disabled || addMinutes(selected, -12 * 60) < min;
	  };

	  var secondStep = timepickerConfig.secondStep;
	  if ($attrs.secondStep) {
	    watchers.push($scope.$parent.$watch($parse($attrs.secondStep), function(value) {
	      secondStep = +value;
	    }));
	  }

	  $scope.showSeconds = timepickerConfig.showSeconds;
	  if ($attrs.showSeconds) {
	    watchers.push($scope.$parent.$watch($parse($attrs.showSeconds), function(value) {
	      $scope.showSeconds = !!value;
	    }));
	  }

	  // 12H / 24H mode
	  $scope.showMeridian = timepickerConfig.showMeridian;
	  if ($attrs.showMeridian) {
	    watchers.push($scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
	      $scope.showMeridian = !!value;

	      if (ngModelCtrl.$error.time) {
	        // Evaluate from template
	        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
	        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
	          selected.setHours(hours);
	          refresh();
	        }
	      } else {
	        updateTemplate();
	      }
	    }));
	  }

	  // Get $scope.hours in 24H mode if valid
	  function getHoursFromTemplate() {
	    var hours = +$scope.hours;
	    var valid = $scope.showMeridian ? hours > 0 && hours < 13 :
	      hours >= 0 && hours < 24;
	    if (!valid || $scope.hours === '') {
	      return undefined;
	    }

	    if ($scope.showMeridian) {
	      if (hours === 12) {
	        hours = 0;
	      }
	      if ($scope.meridian === meridians[1]) {
	        hours = hours + 12;
	      }
	    }
	    return hours;
	  }

	  function getMinutesFromTemplate() {
	    var minutes = +$scope.minutes;
	    var valid = minutes >= 0 && minutes < 60;
	    if (!valid || $scope.minutes === '') {
	      return undefined;
	    }
	    return minutes;
	  }

	  function getSecondsFromTemplate() {
	    var seconds = +$scope.seconds;
	    return seconds >= 0 && seconds < 60 ? seconds : undefined;
	  }

	  function pad(value, noPad) {
	    if (value === null) {
	      return '';
	    }

	    return angular.isDefined(value) && value.toString().length < 2 && !noPad ?
	      '0' + value : value.toString();
	  }

	  // Respond on mousewheel spin
	  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
	    var isScrollingUp = function(e) {
	      if (e.originalEvent) {
	        e = e.originalEvent;
	      }
	      //pick correct delta variable depending on event
	      var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
	      return e.detail || delta > 0;
	    };

	    hoursInputEl.bind('mousewheel wheel', function(e) {
	      if (!disabled) {
	        $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
	      }
	      e.preventDefault();
	    });

	    minutesInputEl.bind('mousewheel wheel', function(e) {
	      if (!disabled) {
	        $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
	      }
	      e.preventDefault();
	    });

	     secondsInputEl.bind('mousewheel wheel', function(e) {
	      if (!disabled) {
	        $scope.$apply(isScrollingUp(e) ? $scope.incrementSeconds() : $scope.decrementSeconds());
	      }
	      e.preventDefault();
	    });
	  };

	  // Respond on up/down arrowkeys
	  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
	    hoursInputEl.bind('keydown', function(e) {
	      if (!disabled) {
	        if (e.which === 38) { // up
	          e.preventDefault();
	          $scope.incrementHours();
	          $scope.$apply();
	        } else if (e.which === 40) { // down
	          e.preventDefault();
	          $scope.decrementHours();
	          $scope.$apply();
	        }
	      }
	    });

	    minutesInputEl.bind('keydown', function(e) {
	      if (!disabled) {
	        if (e.which === 38) { // up
	          e.preventDefault();
	          $scope.incrementMinutes();
	          $scope.$apply();
	        } else if (e.which === 40) { // down
	          e.preventDefault();
	          $scope.decrementMinutes();
	          $scope.$apply();
	        }
	      }
	    });

	    secondsInputEl.bind('keydown', function(e) {
	      if (!disabled) {
	        if (e.which === 38) { // up
	          e.preventDefault();
	          $scope.incrementSeconds();
	          $scope.$apply();
	        } else if (e.which === 40) { // down
	          e.preventDefault();
	          $scope.decrementSeconds();
	          $scope.$apply();
	        }
	      }
	    });
	  };

	  this.setupInputEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
	    if ($scope.readonlyInput) {
	      $scope.updateHours = angular.noop;
	      $scope.updateMinutes = angular.noop;
	      $scope.updateSeconds = angular.noop;
	      return;
	    }

	    var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
	      ngModelCtrl.$setViewValue(null);
	      ngModelCtrl.$setValidity('time', false);
	      if (angular.isDefined(invalidHours)) {
	        $scope.invalidHours = invalidHours;
	      }

	      if (angular.isDefined(invalidMinutes)) {
	        $scope.invalidMinutes = invalidMinutes;
	      }

	      if (angular.isDefined(invalidSeconds)) {
	        $scope.invalidSeconds = invalidSeconds;
	      }
	    };

	    $scope.updateHours = function() {
	      var hours = getHoursFromTemplate(),
	        minutes = getMinutesFromTemplate();

	      ngModelCtrl.$setDirty();

	      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
	        selected.setHours(hours);
	        selected.setMinutes(minutes);
	        if (selected < min || selected > max) {
	          invalidate(true);
	        } else {
	          refresh('h');
	        }
	      } else {
	        invalidate(true);
	      }
	    };

	    hoursInputEl.bind('blur', function(e) {
	      ngModelCtrl.$setTouched();
	      if (modelIsEmpty()) {
	        makeValid();
	      } else if ($scope.hours === null || $scope.hours === '') {
	        invalidate(true);
	      } else if (!$scope.invalidHours && $scope.hours < 10) {
	        $scope.$apply(function() {
	          $scope.hours = pad($scope.hours, !padHours);
	        });
	      }
	    });

	    $scope.updateMinutes = function() {
	      var minutes = getMinutesFromTemplate(),
	        hours = getHoursFromTemplate();

	      ngModelCtrl.$setDirty();

	      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
	        selected.setHours(hours);
	        selected.setMinutes(minutes);
	        if (selected < min || selected > max) {
	          invalidate(undefined, true);
	        } else {
	          refresh('m');
	        }
	      } else {
	        invalidate(undefined, true);
	      }
	    };

	    minutesInputEl.bind('blur', function(e) {
	      ngModelCtrl.$setTouched();
	      if (modelIsEmpty()) {
	        makeValid();
	      } else if ($scope.minutes === null) {
	        invalidate(undefined, true);
	      } else if (!$scope.invalidMinutes && $scope.minutes < 10) {
	        $scope.$apply(function() {
	          $scope.minutes = pad($scope.minutes);
	        });
	      }
	    });

	    $scope.updateSeconds = function() {
	      var seconds = getSecondsFromTemplate();

	      ngModelCtrl.$setDirty();

	      if (angular.isDefined(seconds)) {
	        selected.setSeconds(seconds);
	        refresh('s');
	      } else {
	        invalidate(undefined, undefined, true);
	      }
	    };

	    secondsInputEl.bind('blur', function(e) {
	      if (modelIsEmpty()) {
	        makeValid();
	      } else if (!$scope.invalidSeconds && $scope.seconds < 10) {
	        $scope.$apply( function() {
	          $scope.seconds = pad($scope.seconds);
	        });
	      }
	    });

	  };

	  this.render = function() {
	    var date = ngModelCtrl.$viewValue;

	    if (isNaN(date)) {
	      ngModelCtrl.$setValidity('time', false);
	      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
	    } else {
	      if (date) {
	        selected = date;
	      }

	      if (selected < min || selected > max) {
	        ngModelCtrl.$setValidity('time', false);
	        $scope.invalidHours = true;
	        $scope.invalidMinutes = true;
	      } else {
	        makeValid();
	      }
	      updateTemplate();
	    }
	  };

	  // Call internally when we know that model is valid.
	  function refresh(keyboardChange) {
	    makeValid();
	    ngModelCtrl.$setViewValue(new Date(selected));
	    updateTemplate(keyboardChange);
	  }

	  function makeValid() {
	    ngModelCtrl.$setValidity('time', true);
	    $scope.invalidHours = false;
	    $scope.invalidMinutes = false;
	    $scope.invalidSeconds = false;
	  }

	  function updateTemplate(keyboardChange) {
	    if (!ngModelCtrl.$modelValue) {
	      $scope.hours = null;
	      $scope.minutes = null;
	      $scope.seconds = null;
	      $scope.meridian = meridians[0];
	    } else {
	      var hours = selected.getHours(),
	        minutes = selected.getMinutes(),
	        seconds = selected.getSeconds();

	      if ($scope.showMeridian) {
	        hours = hours === 0 || hours === 12 ? 12 : hours % 12; // Convert 24 to 12 hour system
	      }

	      $scope.hours = keyboardChange === 'h' ? hours : pad(hours, !padHours);
	      if (keyboardChange !== 'm') {
	        $scope.minutes = pad(minutes);
	      }
	      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];

	      if (keyboardChange !== 's') {
	        $scope.seconds = pad(seconds);
	      }
	      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
	    }
	  }

	  function addSecondsToSelected(seconds) {
	    selected = addSeconds(selected, seconds);
	    refresh();
	  }

	  function addMinutes(selected, minutes) {
	    return addSeconds(selected, minutes*60);
	  }

	  function addSeconds(date, seconds) {
	    var dt = new Date(date.getTime() + seconds * 1000);
	    var newDate = new Date(date);
	    newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
	    return newDate;
	  }

	  function modelIsEmpty() {
	    return ($scope.hours === null || $scope.hours === '') &&
	      ($scope.minutes === null || $scope.minutes === '') &&
	      (!$scope.showSeconds || $scope.showSeconds && ($scope.seconds === null || $scope.seconds === ''));
	  }

	  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
	    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

	  $scope.incrementHours = function() {
	    if (!$scope.noIncrementHours()) {
	      addSecondsToSelected(hourStep * 60 * 60);
	    }
	  };

	  $scope.decrementHours = function() {
	    if (!$scope.noDecrementHours()) {
	      addSecondsToSelected(-hourStep * 60 * 60);
	    }
	  };

	  $scope.incrementMinutes = function() {
	    if (!$scope.noIncrementMinutes()) {
	      addSecondsToSelected(minuteStep * 60);
	    }
	  };

	  $scope.decrementMinutes = function() {
	    if (!$scope.noDecrementMinutes()) {
	      addSecondsToSelected(-minuteStep * 60);
	    }
	  };

	  $scope.incrementSeconds = function() {
	    if (!$scope.noIncrementSeconds()) {
	      addSecondsToSelected(secondStep);
	    }
	  };

	  $scope.decrementSeconds = function() {
	    if (!$scope.noDecrementSeconds()) {
	      addSecondsToSelected(-secondStep);
	    }
	  };

	  $scope.toggleMeridian = function() {
	    var minutes = getMinutesFromTemplate(),
	        hours = getHoursFromTemplate();

	    if (!$scope.noToggleMeridian()) {
	      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
	        addSecondsToSelected(12 * 60 * (selected.getHours() < 12 ? 60 : -60));
	      } else {
	        $scope.meridian = $scope.meridian === meridians[0] ? meridians[1] : meridians[0];
	      }
	    }
	  };

	  $scope.blur = function() {
	    ngModelCtrl.$setTouched();
	  };

	  $scope.$on('$destroy', function() {
	    while (watchers.length) {
	      watchers.shift()();
	    }
	  });
	}])

	.directive('uibTimepicker', ['uibTimepickerConfig', function(uibTimepickerConfig) {
	  return {
	    require: ['uibTimepicker', '?^ngModel'],
	    restrict: 'A',
	    controller: 'UibTimepickerController',
	    controllerAs: 'timepicker',
	    scope: {},
	    templateUrl: function(element, attrs) {
	      return attrs.templateUrl || uibTimepickerConfig.templateUrl;
	    },
	    link: function(scope, element, attrs, ctrls) {
	      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (ngModelCtrl) {
	        timepickerCtrl.init(ngModelCtrl, element.find('input'));
	      }
	    }
	  };
	}]);

	angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.debounce', 'ui.bootstrap.position'])

	/**
	 * A helper service that can parse typeahead's syntax (string provided by users)
	 * Extracted to a separate service for ease of unit testing
	 */
	  .factory('uibTypeaheadParser', ['$parse', function($parse) {
	    //                      000001111111100000000000002222222200000000000000003333333333333330000000000044444444000
	    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
	    return {
	      parse: function(input) {
	        var match = input.match(TYPEAHEAD_REGEXP);
	        if (!match) {
	          throw new Error(
	            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
	              ' but got "' + input + '".');
	        }

	        return {
	          itemName: match[3],
	          source: $parse(match[4]),
	          viewMapper: $parse(match[2] || match[1]),
	          modelMapper: $parse(match[1])
	        };
	      }
	    };
	  }])

	  .controller('UibTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$$debounce', '$uibPosition', 'uibTypeaheadParser',
	    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $$debounce, $position, typeaheadParser) {
	    var HOT_KEYS = [9, 13, 27, 38, 40];
	    var eventDebounceTime = 200;
	    var modelCtrl, ngModelOptions;
	    //SUPPORTED ATTRIBUTES (OPTIONS)

	    //minimal no of characters that needs to be entered before typeahead kicks-in
	    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
	    if (!minLength && minLength !== 0) {
	      minLength = 1;
	    }

	    originalScope.$watch(attrs.typeaheadMinLength, function (newVal) {
	        minLength = !newVal && newVal !== 0 ? 1 : newVal;
	    });

	    //minimal wait time after last character typed before typeahead kicks-in
	    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

	    //should it restrict model values to the ones selected from the popup only?
	    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
	    originalScope.$watch(attrs.typeaheadEditable, function (newVal) {
	      isEditable = newVal !== false;
	    });

	    //binding to a variable that indicates if matches are being retrieved asynchronously
	    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

	    //a function to determine if an event should cause selection
	    var isSelectEvent = attrs.typeaheadShouldSelect ? $parse(attrs.typeaheadShouldSelect) : function(scope, vals) {
	      var evt = vals.$event;
	      return evt.which === 13 || evt.which === 9;
	    };

	    //a callback executed when a match is selected
	    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

	    //should it select highlighted popup value when losing focus?
	    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

	    //binding to a variable that indicates if there were no results after the query is completed
	    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

	    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

	    var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

	    var appendTo = attrs.typeaheadAppendTo ?
	      originalScope.$eval(attrs.typeaheadAppendTo) : null;

	    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

	    //If input matches an item of the list exactly, select it automatically
	    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

	    //binding to a variable that indicates if dropdown is open
	    var isOpenSetter = $parse(attrs.typeaheadIsOpen).assign || angular.noop;

	    var showHint = originalScope.$eval(attrs.typeaheadShowHint) || false;

	    //INTERNAL VARIABLES

	    //model setter executed upon match selection
	    var parsedModel = $parse(attrs.ngModel);
	    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
	    var $setModelValue = function(scope, newValue) {
	      if (angular.isFunction(parsedModel(originalScope)) &&
	        ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
	        return invokeModelSetter(scope, {$$$p: newValue});
	      }

	      return parsedModel.assign(scope, newValue);
	    };

	    //expressions used by typeahead
	    var parserResult = typeaheadParser.parse(attrs.uibTypeahead);

	    var hasFocus;

	    //Used to avoid bug in iOS webview where iOS keyboard does not fire
	    //mousedown & mouseup events
	    //Issue #3699
	    var selected;

	    //create a child scope for the typeahead directive so we are not polluting original scope
	    //with typeahead-specific data (matches, query etc.)
	    var scope = originalScope.$new();
	    var offDestroy = originalScope.$on('$destroy', function() {
	      scope.$destroy();
	    });
	    scope.$on('$destroy', offDestroy);

	    // WAI-ARIA
	    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
	    element.attr({
	      'aria-autocomplete': 'list',
	      'aria-expanded': false,
	      'aria-owns': popupId
	    });

	    var inputsContainer, hintInputElem;
	    //add read-only input to show hint
	    if (showHint) {
	      inputsContainer = angular.element('<div></div>');
	      inputsContainer.css('position', 'relative');
	      element.after(inputsContainer);
	      hintInputElem = element.clone();
	      hintInputElem.attr('placeholder', '');
	      hintInputElem.attr('tabindex', '-1');
	      hintInputElem.val('');
	      hintInputElem.css({
	        'position': 'absolute',
	        'top': '0px',
	        'left': '0px',
	        'border-color': 'transparent',
	        'box-shadow': 'none',
	        'opacity': 1,
	        'background': 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
	        'color': '#999'
	      });
	      element.css({
	        'position': 'relative',
	        'vertical-align': 'top',
	        'background-color': 'transparent'
	      });

	      if (hintInputElem.attr('id')) {
	        hintInputElem.removeAttr('id'); // remove duplicate id if present.
	      }
	      inputsContainer.append(hintInputElem);
	      hintInputElem.after(element);
	    }

	    //pop-up element used to display matches
	    var popUpEl = angular.element('<div uib-typeahead-popup></div>');
	    popUpEl.attr({
	      id: popupId,
	      matches: 'matches',
	      active: 'activeIdx',
	      select: 'select(activeIdx, evt)',
	      'move-in-progress': 'moveInProgress',
	      query: 'query',
	      position: 'position',
	      'assign-is-open': 'assignIsOpen(isOpen)',
	      debounce: 'debounceUpdate'
	    });
	    //custom item template
	    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
	      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
	    }

	    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
	      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
	    }

	    var resetHint = function() {
	      if (showHint) {
	        hintInputElem.val('');
	      }
	    };

	    var resetMatches = function() {
	      scope.matches = [];
	      scope.activeIdx = -1;
	      element.attr('aria-expanded', false);
	      resetHint();
	    };

	    var getMatchId = function(index) {
	      return popupId + '-option-' + index;
	    };

	    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
	    // This attribute is added or removed automatically when the `activeIdx` changes.
	    scope.$watch('activeIdx', function(index) {
	      if (index < 0) {
	        element.removeAttr('aria-activedescendant');
	      } else {
	        element.attr('aria-activedescendant', getMatchId(index));
	      }
	    });

	    var inputIsExactMatch = function(inputValue, index) {
	      if (scope.matches.length > index && inputValue) {
	        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
	      }

	      return false;
	    };

	    var getMatchesAsync = function(inputValue, evt) {
	      var locals = {$viewValue: inputValue};
	      isLoadingSetter(originalScope, true);
	      isNoResultsSetter(originalScope, false);
	      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
	        //it might happen that several async queries were in progress if a user were typing fast
	        //but we are interested only in responses that correspond to the current view value
	        var onCurrentRequest = inputValue === modelCtrl.$viewValue;
	        if (onCurrentRequest && hasFocus) {
	          if (matches && matches.length > 0) {
	            scope.activeIdx = focusFirst ? 0 : -1;
	            isNoResultsSetter(originalScope, false);
	            scope.matches.length = 0;

	            //transform labels
	            for (var i = 0; i < matches.length; i++) {
	              locals[parserResult.itemName] = matches[i];
	              scope.matches.push({
	                id: getMatchId(i),
	                label: parserResult.viewMapper(scope, locals),
	                model: matches[i]
	              });
	            }

	            scope.query = inputValue;
	            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
	            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
	            //due to other elements being rendered
	            recalculatePosition();

	            element.attr('aria-expanded', true);

	            //Select the single remaining option if user input matches
	            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
	              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
	                $$debounce(function() {
	                  scope.select(0, evt);
	                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
	              } else {
	                scope.select(0, evt);
	              }
	            }

	            if (showHint) {
	              var firstLabel = scope.matches[0].label;
	              if (angular.isString(inputValue) &&
	                inputValue.length > 0 &&
	                firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
	                hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
	              } else {
	                hintInputElem.val('');
	              }
	            }
	          } else {
	            resetMatches();
	            isNoResultsSetter(originalScope, true);
	          }
	        }
	        if (onCurrentRequest) {
	          isLoadingSetter(originalScope, false);
	        }
	      }, function() {
	        resetMatches();
	        isLoadingSetter(originalScope, false);
	        isNoResultsSetter(originalScope, true);
	      });
	    };

	    // bind events only if appendToBody params exist - performance feature
	    if (appendToBody) {
	      angular.element($window).on('resize', fireRecalculating);
	      $document.find('body').on('scroll', fireRecalculating);
	    }

	    // Declare the debounced function outside recalculating for
	    // proper debouncing
	    var debouncedRecalculate = $$debounce(function() {
	      // if popup is visible
	      if (scope.matches.length) {
	        recalculatePosition();
	      }

	      scope.moveInProgress = false;
	    }, eventDebounceTime);

	    // Default progress type
	    scope.moveInProgress = false;

	    function fireRecalculating() {
	      if (!scope.moveInProgress) {
	        scope.moveInProgress = true;
	        scope.$digest();
	      }

	      debouncedRecalculate();
	    }

	    // recalculate actual position and set new values to scope
	    // after digest loop is popup in right position
	    function recalculatePosition() {
	      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
	      scope.position.top += element.prop('offsetHeight');
	    }

	    //we need to propagate user's query so we can higlight matches
	    scope.query = undefined;

	    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
	    var timeoutPromise;

	    var scheduleSearchWithTimeout = function(inputValue) {
	      timeoutPromise = $timeout(function() {
	        getMatchesAsync(inputValue);
	      }, waitTime);
	    };

	    var cancelPreviousTimeout = function() {
	      if (timeoutPromise) {
	        $timeout.cancel(timeoutPromise);
	      }
	    };

	    resetMatches();

	    scope.assignIsOpen = function (isOpen) {
	      isOpenSetter(originalScope, isOpen);
	    };

	    scope.select = function(activeIdx, evt) {
	      //called from within the $digest() cycle
	      var locals = {};
	      var model, item;

	      selected = true;
	      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
	      model = parserResult.modelMapper(originalScope, locals);
	      $setModelValue(originalScope, model);
	      modelCtrl.$setValidity('editable', true);
	      modelCtrl.$setValidity('parse', true);

	      onSelectCallback(originalScope, {
	        $item: item,
	        $model: model,
	        $label: parserResult.viewMapper(originalScope, locals),
	        $event: evt
	      });

	      resetMatches();

	      //return focus to the input element if a match was selected via a mouse click event
	      // use timeout to avoid $rootScope:inprog error
	      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
	        $timeout(function() { element[0].focus(); }, 0, false);
	      }
	    };

	    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
	    element.on('keydown', function(evt) {
	      //typeahead is open and an "interesting" key was pressed
	      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
	        return;
	      }

	      var shouldSelect = isSelectEvent(originalScope, {$event: evt});

	      /**
	       * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
	       * or
	       * shift + tab is pressed to bring focus to the previous element
	       * then clear the results
	       */
	      if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
	        resetMatches();
	        scope.$digest();
	        return;
	      }

	      evt.preventDefault();
	      var target;
	      switch (evt.which) {
	        case 27: // escape
	          evt.stopPropagation();

	          resetMatches();
	          originalScope.$digest();
	          break;
	        case 38: // up arrow
	          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
	          scope.$digest();
	          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
	          target.parentNode.scrollTop = target.offsetTop;
	          break;
	        case 40: // down arrow
	          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
	          scope.$digest();
	          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
	          target.parentNode.scrollTop = target.offsetTop;
	          break;
	        default:
	          if (shouldSelect) {
	            scope.$apply(function() {
	              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
	                $$debounce(function() {
	                  scope.select(scope.activeIdx, evt);
	                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
	              } else {
	                scope.select(scope.activeIdx, evt);
	              }
	            });
	          }
	      }
	    });

	    element.bind('focus', function (evt) {
	      hasFocus = true;
	      if (minLength === 0 && !modelCtrl.$viewValue) {
	        $timeout(function() {
	          getMatchesAsync(modelCtrl.$viewValue, evt);
	        }, 0);
	      }
	    });

	    element.bind('blur', function(evt) {
	      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
	        selected = true;
	        scope.$apply(function() {
	          if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
	            $$debounce(function() {
	              scope.select(scope.activeIdx, evt);
	            }, scope.debounceUpdate.blur);
	          } else {
	            scope.select(scope.activeIdx, evt);
	          }
	        });
	      }
	      if (!isEditable && modelCtrl.$error.editable) {
	        modelCtrl.$setViewValue();
	        scope.$apply(function() {
	          // Reset validity as we are clearing
	          modelCtrl.$setValidity('editable', true);
	          modelCtrl.$setValidity('parse', true);
	        });
	        element.val('');
	      }
	      hasFocus = false;
	      selected = false;
	    });

	    // Keep reference to click handler to unbind it.
	    var dismissClickHandler = function(evt) {
	      // Issue #3973
	      // Firefox treats right click as a click on document
	      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
	        resetMatches();
	        if (!$rootScope.$$phase) {
	          originalScope.$digest();
	        }
	      }
	    };

	    $document.on('click', dismissClickHandler);

	    originalScope.$on('$destroy', function() {
	      $document.off('click', dismissClickHandler);
	      if (appendToBody || appendTo) {
	        $popup.remove();
	      }

	      if (appendToBody) {
	        angular.element($window).off('resize', fireRecalculating);
	        $document.find('body').off('scroll', fireRecalculating);
	      }
	      // Prevent jQuery cache memory leak
	      popUpEl.remove();

	      if (showHint) {
	          inputsContainer.remove();
	      }
	    });

	    var $popup = $compile(popUpEl)(scope);

	    if (appendToBody) {
	      $document.find('body').append($popup);
	    } else if (appendTo) {
	      angular.element(appendTo).eq(0).append($popup);
	    } else {
	      element.after($popup);
	    }

	    this.init = function(_modelCtrl, _ngModelOptions) {
	      modelCtrl = _modelCtrl;
	      ngModelOptions = _ngModelOptions;

	      scope.debounceUpdate = modelCtrl.$options && $parse(modelCtrl.$options.debounce)(originalScope);

	      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
	      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
	      modelCtrl.$parsers.unshift(function(inputValue) {
	        hasFocus = true;

	        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
	          if (waitTime > 0) {
	            cancelPreviousTimeout();
	            scheduleSearchWithTimeout(inputValue);
	          } else {
	            getMatchesAsync(inputValue);
	          }
	        } else {
	          isLoadingSetter(originalScope, false);
	          cancelPreviousTimeout();
	          resetMatches();
	        }

	        if (isEditable) {
	          return inputValue;
	        }

	        if (!inputValue) {
	          // Reset in case user had typed something previously.
	          modelCtrl.$setValidity('editable', true);
	          return null;
	        }

	        modelCtrl.$setValidity('editable', false);
	        return undefined;
	      });

	      modelCtrl.$formatters.push(function(modelValue) {
	        var candidateViewValue, emptyViewValue;
	        var locals = {};

	        // The validity may be set to false via $parsers (see above) if
	        // the model is restricted to selected values. If the model
	        // is set manually it is considered to be valid.
	        if (!isEditable) {
	          modelCtrl.$setValidity('editable', true);
	        }

	        if (inputFormatter) {
	          locals.$model = modelValue;
	          return inputFormatter(originalScope, locals);
	        }

	        //it might happen that we don't have enough info to properly render input value
	        //we need to check for this situation and simply return model value if we can't apply custom formatting
	        locals[parserResult.itemName] = modelValue;
	        candidateViewValue = parserResult.viewMapper(originalScope, locals);
	        locals[parserResult.itemName] = undefined;
	        emptyViewValue = parserResult.viewMapper(originalScope, locals);

	        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
	      });
	    };
	  }])

	  .directive('uibTypeahead', function() {
	    return {
	      controller: 'UibTypeaheadController',
	      require: ['ngModel', '^?ngModelOptions', 'uibTypeahead'],
	      link: function(originalScope, element, attrs, ctrls) {
	        ctrls[2].init(ctrls[0], ctrls[1]);
	      }
	    };
	  })

	  .directive('uibTypeaheadPopup', ['$$debounce', function($$debounce) {
	    return {
	      scope: {
	        matches: '=',
	        query: '=',
	        active: '=',
	        position: '&',
	        moveInProgress: '=',
	        select: '&',
	        assignIsOpen: '&',
	        debounce: '&'
	      },
	      replace: true,
	      templateUrl: function(element, attrs) {
	        return attrs.popupTemplateUrl || 'uib/template/typeahead/typeahead-popup.html';
	      },
	      link: function(scope, element, attrs) {
	        scope.templateUrl = attrs.templateUrl;

	        scope.isOpen = function() {
	          var isDropdownOpen = scope.matches.length > 0;
	          scope.assignIsOpen({ isOpen: isDropdownOpen });
	          return isDropdownOpen;
	        };

	        scope.isActive = function(matchIdx) {
	          return scope.active === matchIdx;
	        };

	        scope.selectActive = function(matchIdx) {
	          scope.active = matchIdx;
	        };

	        scope.selectMatch = function(activeIdx, evt) {
	          var debounce = scope.debounce();
	          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
	            $$debounce(function() {
	              scope.select({activeIdx: activeIdx, evt: evt});
	            }, angular.isNumber(debounce) ? debounce : debounce['default']);
	          } else {
	            scope.select({activeIdx: activeIdx, evt: evt});
	          }
	        };
	      }
	    };
	  }])

	  .directive('uibTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
	    return {
	      scope: {
	        index: '=',
	        match: '=',
	        query: '='
	      },
	      link: function(scope, element, attrs) {
	        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'uib/template/typeahead/typeahead-match.html';
	        $templateRequest(tplUrl).then(function(tplContent) {
	          var tplEl = angular.element(tplContent.trim());
	          element.replaceWith(tplEl);
	          $compile(tplEl)(scope);
	        });
	      }
	    };
	  }])

	  .filter('uibTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
	    var isSanitizePresent;
	    isSanitizePresent = $injector.has('$sanitize');

	    function escapeRegexp(queryToEscape) {
	      // Regex: capture the whole query string and replace it with the string that will be used to match
	      // the results, for example if the capture is "a" the result will be \a
	      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	    }

	    function containsHtml(matchItem) {
	      return /<.*>/g.test(matchItem);
	    }

	    return function(matchItem, query) {
	      if (!isSanitizePresent && containsHtml(matchItem)) {
	        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
	      }
	      matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
	      if (!isSanitizePresent) {
	        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
	      }
	      return matchItem;
	    };
	  }]);

	angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/accordion/accordion-group.html",
	    "<div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
	    "  <h4 class=\"panel-title\">\n" +
	    "    <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\" ng-disabled=\"isDisabled\" uib-tabindex-toggle><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
	    "  </h4>\n" +
	    "</div>\n" +
	    "<div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
	    "  <div class=\"panel-body\" ng-transclude></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/accordion/accordion.html",
	    "<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>");
	}]);

	angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/alert/alert.html",
	    "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
	    "  <span aria-hidden=\"true\">&times;</span>\n" +
	    "  <span class=\"sr-only\">Close</span>\n" +
	    "</button>\n" +
	    "<div ng-transclude></div>\n" +
	    "");
	}]);

	angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/carousel/carousel.html",
	    "<div class=\"carousel-inner\" ng-transclude></div>\n" +
	    "<a role=\"button\" href class=\"left carousel-control\" ng-click=\"prev()\" ng-class=\"{ disabled: isPrevDisabled() }\" ng-show=\"slides.length > 1\">\n" +
	    "  <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
	    "  <span class=\"sr-only\">previous</span>\n" +
	    "</a>\n" +
	    "<a role=\"button\" href class=\"right carousel-control\" ng-click=\"next()\" ng-class=\"{ disabled: isNextDisabled() }\" ng-show=\"slides.length > 1\">\n" +
	    "  <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
	    "  <span class=\"sr-only\">next</span>\n" +
	    "</a>\n" +
	    "<ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
	    "  <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
	    "    <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
	    "  </li>\n" +
	    "</ol>\n" +
	    "");
	}]);

	angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/carousel/slide.html",
	    "<div class=\"text-center\" ng-transclude></div>\n" +
	    "");
	}]);

	angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/datepicker/datepicker.html",
	    "<div ng-switch=\"datepickerMode\">\n" +
	    "  <div uib-daypicker ng-switch-when=\"day\" tabindex=\"0\" class=\"uib-daypicker\"></div>\n" +
	    "  <div uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\" class=\"uib-monthpicker\"></div>\n" +
	    "  <div uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\" class=\"uib-yearpicker\"></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/datepicker/day.html",
	    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
	    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></button></th>\n" +
	    "    </tr>\n" +
	    "    <tr>\n" +
	    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
	    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-weeks\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
	    "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-day text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default btn-sm\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-info' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
	}]);

	angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/datepicker/month.html",
	    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
	    "      <th colspan=\"{{::yearHeaderColspan}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></i></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-info' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
	}]);

	angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/datepicker/year.html",
	    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
	    "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-info' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
	}]);

	angular.module("uib/template/datepickerPopup/popup.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/datepickerPopup/popup.html",
	    "<ul role=\"presentation\" class=\"uib-datepicker-popup dropdown-menu uib-position-measure\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
	    "  <li ng-transclude></li>\n" +
	    "  <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
	    "    <span class=\"btn-group pull-left\">\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-info uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-danger uib-clear\" ng-click=\"select(null, $event)\">{{ getText('clear') }}</button>\n" +
	    "    </span>\n" +
	    "    <button type=\"button\" class=\"btn btn-sm btn-success pull-right uib-close\" ng-click=\"close($event)\">{{ getText('close') }}</button>\n" +
	    "  </li>\n" +
	    "</ul>\n" +
	    "");
	}]);

	angular.module("uib/template/modal/window.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/modal/window.html",
	    "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
	    "");
	}]);

	angular.module("uib/template/pager/pager.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/pager/pager.html",
	    "<li ng-class=\"{disabled: noPrevious()||ngDisabled, previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
	    "<li ng-class=\"{disabled: noNext()||ngDisabled, next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
	    "");
	}]);

	angular.module("uib/template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/pagination/pagination.html",
	    "<li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\"><a href ng-click=\"selectPage(1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('first')}}</a></li>\n" +
	    "<li ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
	    "<li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"pagination-page\"><a href ng-click=\"selectPage(page.number, $event)\" ng-disabled=\"ngDisabled&&!page.active\" uib-tabindex-toggle>{{page.text}}</a></li>\n" +
	    "<li ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
	    "<li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\"><a href ng-click=\"selectPage(totalPages, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('last')}}</a></li>\n" +
	    "");
	}]);

	angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/tooltip/tooltip-html-popup.html",
	    "<div class=\"tooltip-arrow\"></div>\n" +
	    "<div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +
	    "");
	}]);

	angular.module("uib/template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/tooltip/tooltip-popup.html",
	    "<div class=\"tooltip-arrow\"></div>\n" +
	    "<div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
	    "");
	}]);

	angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/tooltip/tooltip-template-popup.html",
	    "<div class=\"tooltip-arrow\"></div>\n" +
	    "<div class=\"tooltip-inner\"\n" +
	    "  uib-tooltip-template-transclude=\"contentExp()\"\n" +
	    "  tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
	    "");
	}]);

	angular.module("uib/template/popover/popover-html.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/popover/popover-html.html",
	    "<div class=\"arrow\"></div>\n" +
	    "\n" +
	    "<div class=\"popover-inner\">\n" +
	    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
	    "    <div class=\"popover-content\" ng-bind-html=\"contentExp()\"></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/popover/popover-template.html",
	    "<div class=\"arrow\"></div>\n" +
	    "\n" +
	    "<div class=\"popover-inner\">\n" +
	    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
	    "    <div class=\"popover-content\"\n" +
	    "      uib-tooltip-template-transclude=\"contentExp()\"\n" +
	    "      tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/popover/popover.html",
	    "<div class=\"arrow\"></div>\n" +
	    "\n" +
	    "<div class=\"popover-inner\">\n" +
	    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
	    "    <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/progressbar/bar.html",
	    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
	    "");
	}]);

	angular.module("uib/template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/progressbar/progress.html",
	    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
	}]);

	angular.module("uib/template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/progressbar/progressbar.html",
	    "<div class=\"progress\">\n" +
	    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/rating/rating.html",
	    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\" aria-valuetext=\"{{title}}\">\n" +
	    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
	    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\" ng-attr-title=\"{{r.title}}\"></i>\n" +
	    "</span>\n" +
	    "");
	}]);

	angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/tabs/tab.html",
	    "<li ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"uib-tab nav-item\">\n" +
	    "  <a href ng-click=\"select($event)\" class=\"nav-link\" uib-tab-heading-transclude>{{heading}}</a>\n" +
	    "</li>\n" +
	    "");
	}]);

	angular.module("uib/template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/tabs/tabset.html",
	    "<div>\n" +
	    "  <ul class=\"nav nav-{{tabset.type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
	    "  <div class=\"tab-content\">\n" +
	    "    <div class=\"tab-pane\"\n" +
	    "         ng-repeat=\"tab in tabset.tabs\"\n" +
	    "         ng-class=\"{active: tabset.active === tab.index}\"\n" +
	    "         uib-tab-content-transclude=\"tab\">\n" +
	    "    </div>\n" +
	    "  </div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("uib/template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/timepicker/timepicker.html",
	    "<table class=\"uib-timepicker\">\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
	    "      <td class=\"uib-increment hours\"><a ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementHours()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
	    "      <td>&nbsp;</td>\n" +
	    "      <td class=\"uib-increment minutes\"><a ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementMinutes()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
	    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
	    "      <td ng-show=\"showSeconds\" class=\"uib-increment seconds\"><a ng-click=\"incrementSeconds()\" ng-class=\"{disabled: noIncrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementSeconds()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
	    "      <td ng-show=\"showMeridian\"></td>\n" +
	    "    </tr>\n" +
	    "    <tr>\n" +
	    "      <td class=\"form-group uib-time hours\" ng-class=\"{'has-error': invalidHours}\">\n" +
	    "        <input type=\"text\" placeholder=\"HH\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementHours()\" ng-blur=\"blur()\">\n" +
	    "      </td>\n" +
	    "      <td class=\"uib-separator\">:</td>\n" +
	    "      <td class=\"form-group uib-time minutes\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
	    "        <input type=\"text\" placeholder=\"MM\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementMinutes()\" ng-blur=\"blur()\">\n" +
	    "      </td>\n" +
	    "      <td ng-show=\"showSeconds\" class=\"uib-separator\">:</td>\n" +
	    "      <td class=\"form-group uib-time seconds\" ng-class=\"{'has-error': invalidSeconds}\" ng-show=\"showSeconds\">\n" +
	    "        <input type=\"text\" placeholder=\"SS\" ng-model=\"seconds\" ng-change=\"updateSeconds()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementSeconds()\" ng-blur=\"blur()\">\n" +
	    "      </td>\n" +
	    "      <td ng-show=\"showMeridian\" class=\"uib-time am-pm\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\" ng-disabled=\"noToggleMeridian()\" tabindex=\"{{::tabindex}}\">{{meridian}}</button></td>\n" +
	    "    </tr>\n" +
	    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
	    "      <td class=\"uib-decrement hours\"><a ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementHours()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
	    "      <td>&nbsp;</td>\n" +
	    "      <td class=\"uib-decrement minutes\"><a ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementMinutes()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
	    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
	    "      <td ng-show=\"showSeconds\" class=\"uib-decrement seconds\"><a ng-click=\"decrementSeconds()\" ng-class=\"{disabled: noDecrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementSeconds()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
	    "      <td ng-show=\"showMeridian\"></td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
	}]);

	angular.module("uib/template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/typeahead/typeahead-match.html",
	    "<a href\n" +
	    "   tabindex=\"-1\"\n" +
	    "   ng-bind-html=\"match.label | uibTypeaheadHighlight:query\"\n" +
	    "   ng-attr-title=\"{{match.label}}\"></a>\n" +
	    "");
	}]);

	angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/typeahead/typeahead-popup.html",
	    "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
	    "    <li class=\"uib-typeahead-match\" ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index, $event)\" role=\"option\" id=\"{{::match.id}}\">\n" +
	    "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
	    "    </li>\n" +
	    "</ul>\n" +
	    "");
	}]);
	angular.module('ui.bootstrap.carousel').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'); angular.$$uibCarouselCss = true; });
	angular.module('ui.bootstrap.datepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'); angular.$$uibDatepickerCss = true; });
	angular.module('ui.bootstrap.position').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'); angular.$$uibPositionCss = true; });
	angular.module('ui.bootstrap.datepickerPopup').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerpopupCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>'); angular.$$uibDatepickerpopupCss = true; });
	angular.module('ui.bootstrap.tooltip').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'); angular.$$uibTooltipCss = true; });
	angular.module('ui.bootstrap.timepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTimepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-time input{width:50px;}</style>'); angular.$$uibTimepickerCss = true; });
	angular.module('ui.bootstrap.typeahead').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'); angular.$$uibTypeaheadCss = true; });

/***/ }
]);