var request         = require('request');
var format          = require('util').format;

module.exports = new FullStory();

function FullStory(){}

FullStory.prototype.getUserId = function getUserId(clientId, cb) {
    secureConfig.get("fullStory", "api", function(err, config) {
        if (err) {
            logger.error({location: "fullstory::getUserId", clientId: clientId}, 'error fetching config data');
            return cb(err);
        }

        if (!config.hasOwnProperty('token') || !config.hasOwnProperty('endpoint')) {
            logger.error({location: "fullstory::getUserId", clientId: clientId}, 'malformed config data');
            return cb(new Error('Malformed config: token or endpoint missing for fullstory api'));
        }

        request({
            url:  format('%s?uid=%s', config.endpoint, clientId),
            headers: {
                "authorization": "Basic " + config.token,
                "content-type": "application/json"
            }
        }, function(err, response, body) {
            if (err) {
                logger.error({location: "fullstory::getUserId", clientId: clientId}, 'failed to fetch data');
                return cb(err);
            }

            var userId;
            
            try {
                var fsData = JSON.parse(response.body);
                userId = fsData[0].UserId;
            } catch(err) {
                logger.error({location: "fullstory::getUserId", clientId: clientId}, 'failed to parse as json');
                return cb(err);
            }

            cb(null, userId);
        });
    });
};

