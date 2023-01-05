/**
 * 
 * https://js.ipfs.tech/
 * 
 * get
 * 
 * 
 */

const node = await IPFS.create()

const stream = node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
const decoder = new TextDecoder()
let data = ''

for await (const chunk of stream) {
  // chunks of data are returned as a Uint8Array, convert it back to a string
  data += decoder.decode(chunk, { stream: true })
}

console.log(data)