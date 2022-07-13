exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'jude',
      age: 99,
      email: 'jude.sh@daum.net'
    })
  }
}