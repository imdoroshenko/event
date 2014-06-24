/**
 * emitter
 * @param {EventRepository|Object} repository of events that can be shared between Event entities
 * @constructor
 */
var Event = function(repository){
    this.repository = repository;
    this.target = null;
    this.namespace = '';
    this.listeners = {};
};
Event.prototype = {
    /**
     * @param {String|Array} eventName with namespaces separated with comma
     * @param [params]
     * returns {Event} this
     */
    'trigger' : function(eventName, params){
        return this;
    },
    /**
     * @param {String} namespace separated with comma
     * returns {Event} this
     */
    'use' : function(namespace){
        this.namespace = namespace.split('/');
        return this;
    },
    /**
     * @param {String|Array} eventName with namespaces separated with comma
     * @param {Function} handler
     * @param {Number} [priority] bigger number lower priority
     * returns {Event} this
     */
    'on' : function(eventName, handler, priority){
        this.repository.add(eventName, handler);
        return this;
    },
    /**
     * @param {String|Array} eventName with namespaces separated with comma
     * @param {Function} handler
     * @param {Number} [priority] bigger number lower priority
     * returns {Event} this
     */
    'once' : function(eventName, handler, priority){
        this.repository.add(this._prepareEventName(eventName), handler);
        return this;
    },
    /**
     * @param {Object} target
     * @returns {Event} this
     */
    'setTarget' : function(target){
        this.target = target;
        return this;
    }
};