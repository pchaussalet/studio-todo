/**
 * @module core/zetapush-service
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class ZetapushService
 * @extends Montage
 */
exports.ZetapushService = Montage.specialize(/** @lends ZetapushService# */ {
    token: {
        value: null
    },
    
    publicToken: {
        value: null
    },
    
    resourceId: {
        value: null
    },
    
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
            
            localStorage['resource'] = localStorage['resource'] || zp.makeResourceId();
            this.resourceId = localStorage['resource'];
            
            this.macroService= new zp.service.Generic('Lghx');
            this.stackService= new zp.service.Generic('3vJB');
            this.gdaService= new zp.service.Generic('dX6v');

            zp.onConnected(function(msg) {
                if (self.auth.getToken()){
                    self.token = localStorage['token']= self.auth.getToken();
                    self.publicToken = localStorage['publicToken']= self.auth.getPublicToken();
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
            zp.connect(this.auth.getConnectionData(this.token, this.resourceId));
        }
    },
    
//    add
});
