Backbone Modelling
==================

Introduces a convention that all Backbone Model(ling)s have a `store()` as a class property. Backbone Modelling instances automatically add themselves to the store on instantiation.

Usage
-----

Instantiate the store collection as a class property. The store function should return an instance of Backbone.Collection like so:

    Post = Backbone.Modelling.extend({
      
      // prototype properties
      
    }, {
      store: function() {
        return this._store = this._store ||
          new Backbone.Collection();
      }
    });
    
    // (Note how the store is memoized.)
    
Create some instances:
    
    var post = new Post();

Access the store:

    Post.store().first() === post; // true

Licence
-------
Backbone Modelling is copyright &copy; 2012 [Dom Christie](http://domchristie.co.uk) and released under the MIT license.