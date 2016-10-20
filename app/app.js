'use strict';

require('angular');
require('./controllers/dataEntry.controller');
require('./controllers/dataDisplay.controller');
require('./services/staff.service.js');
require('angular-ui-mask');
//require('angular-ui-bootstrap');

//setting the staffWizard Module - Only set this once then retrieve from this point after if I want to add stuff to it
angular.module('staffWizard', 
['dataDisplay',
'dataEntry',
'ui.mask'
]);