module.exports =
  enforce: require './contracts/'
  createTests: require './automated'
  transform: require './transform'
