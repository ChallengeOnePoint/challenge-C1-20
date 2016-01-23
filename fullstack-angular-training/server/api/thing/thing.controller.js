/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';

var http = require('http');
var Thing = require('./thing.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function getGeoCode (data, callback) {

	var address = (data.number + ' ' || '') + data.street + ', ' + data.postcode + ' ' + data.city;
	var API_KEY = "AIzaSyAI0JQ-xOmt1j1XCDRiGYfdS4rtkqaarx0";
	var request = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false&key=" + API_KEY; 

	http.get(request, (res) => {
		console.log(`Got response: ${res.statusCode}`);
		var data = JSON.parse(res.body);
		//res.resume();
		callback(data.geometry.location.lat, data.geometry.location.lng, true);
	}).on('error', (e) => {
		console.log(`Got error: ${e.message}`);
		callback(null, null, false);
	});
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {

	getGeoCode(updates, function (lat, lon, no_error) {
		updates.latitude = lat;
		updates.longitude = lon;
	});
	// async pb here
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Things
export function index(req, res) {
  Thing.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
export function show(req, res) {
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {

	for (var i = 0; i < req.body.length; i++) {

		getGeoCode(req.body, function (lat, lon, no_error) {

			if (no_error) {

				req.body[i].latitude = lat;
				req.body[i].longitude = lon;

				Thing.createAsync(req.body[i])
				.then(saveUpdates(req.body[i]))
				.then(responseWithResult(res, 201))
				.catch(handleError(res));    
			} else {
				responseWithResult(res, 400)(true);
			}
		})
	}
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
