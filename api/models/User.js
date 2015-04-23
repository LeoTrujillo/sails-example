module.exports = {
  attributes : {
    name: {
      type : 'string',
      required: true
    },
    lastname : {
      type: 'string',
      required : true
    },
    username : {
      type: 'string',
      required : true
    },
    email : {
      type: 'email',
      required : true
    }
  }
};