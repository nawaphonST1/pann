'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'POST',
            path: '/entries/:id/ack_datetime',
            handler: 'entry.ack_datetime'
        }
        
       
    ]
}