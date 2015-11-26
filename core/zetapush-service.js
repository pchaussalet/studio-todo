/**
 * @module core/zetapush-service
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class ZetapushService
 * @extends Montage
 */
exports.ZetapushService = Montage.specialize(/** @lends ZetapushService# */ {
    constructor: {
        value: function ZetapushService() {
            var self = this;
            this.connect();
            zp.onConnected(function(msg) {
                console.log('Connected to ZetaPush');
            });
            
            zp.onHandshake(function(msg){			
                if (msg.successful){
                    console.log("ZetaPush Hanshake Successful");
                }
            });
        }
    },
    
    connect: {
        value: function() {
            zp.init('EX9cA_9n');
            var auth = new zp.authent.Weak('DyCJ');
            zp.connect(auth.getConnectionData());
        }
    }
});
