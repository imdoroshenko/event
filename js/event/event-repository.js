var EventRepository = function(){
    this._repository = {};
};
EventRepository.prototype = {
    /*
     * @param {string} [path]
     * @param {Function} [handler]
     * @param {Object} [path]
     * @returns {Object} this
     * */
    'add' : function(eventName, handler, transit, priority){
        var path = this._prepareEvent(eventName),
            deposit = this._getDeposit(path),
            repository = this._getRepositoryName(transit);
        if(typeof priority === 'undefined'){
            deposit[repository].push(handler);
        }else{
            deposit[repository].splice(priority, 0, handler);
        }
        return this;
    },
    /*
     * @param {string} [path]
     * @param {Function} [handler]
     * @param {Object} [path]
     * @returns {Object} this
     * */
    'remove' : function(eventName, handler, transit){
        var path = this._prepareEvent(eventName),
            deposit = this._getDeposit(path),
            repository = this._getRepositoryName(transit),
            index = deposit[repository].indexOf(handler);
        if(index !== -1){
            deposit[repository].splice(index, 1);
        }
        return this;
    },
    /*
     * @param {Array} [path]
     * @param {Function} [handler]
     * @param {Object} [path]
     * @returns
     * */
    'get' : function(){},
    /**
     *
     * @param {String} eventName
     * @returns {Array}
     */
    '_prepareEvent' : function(eventName){
        return eventName.split('/');
    },
    _getDeposit : function(eventPath){
        var deposit = null;
        for(var i = 0, ln = eventPath.length; i < ln && this._repository[eventPath[i]]; i++){
            deposit = this._repository[eventPath[i]];
        }
        return deposit || new EventDeposit();
    },
    _getRepositoryName : function(transit){
        return transit
            ? 'transitHandlers'
            : 'concreteHandlers';
    }
};