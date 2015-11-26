/**
 * @module core/zetapush-service
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class ZetapushService
 * @extends Montage
 */
exports.ZetapushService = Montage.specialize(/** @lends ZetapushService# */ {
    auth: {
        value: null
    },
    
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
            
            if (!localStorage['resource']){
                localStorage['resource']= zp.makeResourceId();
            }
            
            this.macroService= new zp.service.Generic('Lghx');
            this.stackService= new zp.service.Generic('3vJB');
            this.gdaService= new zp.service.Generic('dX6v');

            zp.onConnected(function(msg) {
                if (self.auth.getToken()){
                    localStorage['token']= self.auth.getToken();
                    localStorage['publicToken']= self.auth.getPublicToken();
                }
                userId = self.auth.getUserId();
            });
            this.connect();
        }
    },
    
    connect: {
        value: function() {
            zp.init('EX9cA_9n');
            this.auth = new zp.authent.Weak('DyCJ');
            zp.connect(this.auth.getConnectionData());
        }
    },
    
//    add
});
