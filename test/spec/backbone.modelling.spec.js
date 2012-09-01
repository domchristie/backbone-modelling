describe("Backbone.Modelling", function() {
    
  it("should inherit from Backbone.Model", function() {
    var Post = Backbone.Modelling.extend({},{ 
      store: function(){
        return this._store = this._store ||
          new Backbone.Collection(null, { model: this });
      }
    });
    var newPost = new Post();
    expect(newPost instanceof Backbone.Model).toBeTruthy();
  });
    
  describe("#addToStore", function() {
    
    it("should add the instance to the store", function() {
      var Post = Backbone.Modelling.extend({},{ 
        store: function(){
          return this._store = this._store ||
            new Backbone.Collection(null, { model: this });
        }
      });
      var newPost = new Post();
      expect(Post.store().length).toEqual(1);
      expect(Post.store().first()).toBe(newPost);
    });
    
    it("should throw an exception if no store property exists", function() {
      expect(function() {
        var Post = Backbone.Modelling.extend();
        new Post();
      }).toThrow("Backbone.Modelling: constructor has no store() property.");
    });

    it("should throw an exception if store property is not a function",
      function() {
        expect(function() {
          var Post = Backbone.Modelling.extend({}, { store: "not a function" });
          new Post();
        }).toThrow("Backbone.Modelling: store property should be a function that returns a Backbone Collection.");
      }
    );
    
    it("should throw an exception if store property is not a backbone collection",
      function() {
        expect(function() {
          var Post = Backbone.Modelling.extend({}, { store: function(){} });
          new Post();
        }).toThrow("Backbone.Modelling: store property should be a function that returns a Backbone Collection.");
      }
    );
  });

});