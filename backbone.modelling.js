// ======================
// = Backbone.Modelling =
// ======================
// Introduces the convention of adding every instantiated model to a store
// on the class object

// Backbone Modelling is copyright © 2012 Dom Christie
// Released under the MIT license.

;(function() {
  var ctor = function(){},
      Model = Backbone.Model,
      Modelling;
  
  Modelling = Backbone.Modelling = function(options) {
    Model.apply(this, [options]);
    
    var collectionErr = {
      name: 'Error',
      message: 'Backbone.Modelling: store property should be a ' +
        'function that returns a Backbone Collection.'
    };
    
    if(this.constructor.store) {
      if(typeof this.constructor.store !== 'function') {
        throw collectionErr;
      }
      else if(!(this.constructor.store() instanceof Backbone.Collection)) {
        throw collectionErr;
      }
      else {
        this.addToStore();
      }
    }
    else {
      throw {
        name: 'Error',
        message: 'Backbone.Modelling: constructor has no store() property.'
      };
    }
  };
  
  ctor.prototype = Model.prototype;
  Modelling.prototype = new ctor();
  
  _.extend(Modelling.prototype, Model.prototype, {
    addToStore: function() {
      this.constructor.store().add(this);
    }
  });
  
  Modelling.extend = Model.extend;
})();


Post = Backbone.Modelling.extend({
  initialize: function() {
    return 'Hello world';
  }
}, {
  store: function() {
    return this._store = this._store ||
      new PostsCollection();
  }
});

PostsCollection = Backbone.Collection.extend({
  model: Post,
  
  initialize: function() {
    console.log(this.model == Post);
  }
});

post = new Post();
// postsCollection = new PostsCollection();
