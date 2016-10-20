webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(7);
	__webpack_require__(4);
	__webpack_require__(8);
	//require('angular-ui-bootstrap');

	//setting the staffWizard Module - Only set this once then retrieve from this point after if I want to add stuff to it
	angular.module('staffWizard', 
	['dataDisplay',
	'dataEntry',
	'ui.mask'
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

	function enterData(staffData){
	        var vm = this; 
	        vm.npiMask = "9999999999";
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
	    return $resource("http://localhost:8080/staffWebService/rest/staff");
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
	    staffData.query(function(data){
	        vm.staff = data; 
	    });
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

/***/ }
]);