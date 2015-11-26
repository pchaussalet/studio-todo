/**
 * @module core/zetapush-service
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class ZetapushService
 * @extends Montage
 */
exports.ZetapushService = Montage.specialize(/** @lends ZetapushService# */ {
    macroService: {
        value: null
    },

    stackService: {
        value: null
    },

    gdaService: {
        value: null
    },

    constructor: {
        value: function ZetapushService() {
            var self = this;
            this.connect();
            zp.onConnected(function(msg) {
                self.macroService= new zp.service.Generic('Lghx');
                self.stackService= new zp.service.Generic('3vJB');
                self.gdaService= new zp.service.Generic('dX6v');
            });
        }
    },
    
    connect: {
        value: function() {
            zp.init('EX9cA_9n');
            var auth = new zp.authent.Weak('DyCJ');
            zp.connect(auth.getConnectionData());
        }
    },
    
    add
});
