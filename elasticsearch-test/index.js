'use strict'
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://81.70.58.132:9200' })


// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html


async function run() {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the mother of dragons.'
    }
  })
  await client.index({
    index: 'game-of-thrones',
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })
  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    body: {
     /* query: {
        match: {
          quote: 'winter'
        }
      } */
      query: {
        match_all: {}
      }
    }
  })
  console.log(body.hits.hits)
}
run().catch(console.log)