class Tests
  typedjs: null

  data: null

  run: (data) ->
    @data =
      fail: data[0]
      success: data[1]

    @data.fail.length is 0


module.exports = Tests
