module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: 'nuber-eats-backend',
      url: 'https://nomad-podcast-backend.herokuapp.com/graphql'
    }
  }
}
