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
            if (!localStorage['resource']){
                localStorage['resource']= zp.makeResourceId();
            }
            this.macroService= new zp.service.Generic('Lghx');
            this.stackService= new zp.service.Generic('3vJB');
            this.gdaService= new zp.service.Generic('dX6v');

            zp.onConnected(function(msg) {
                if (authent.getToken()){
                    localStorage['token']= authent.getToken();
                    localStorage['publicToken']= authent.getPublicToken();
                }
                userId = authent.getUserId();
                console.log('You are connected with userId ', authent.getUserId());
            });
            this.connect();
        }
    },
    
    connect: {
        value: function() {
            zp.init('EX9cA_9n');
            var auth = new zp.authent.Weak('DyCJ');
            zp.connect(auth.getConnectionData());
        }
    },
    
//    add
});
