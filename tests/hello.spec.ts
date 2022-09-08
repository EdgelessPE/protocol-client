import { v3 } from '../src'

test('v3.server.hello', async () => {
  const client = new v3.Client('https://pineapple.edgeless.top/api/v3')
  const hello = await client.hello({ proxy: false })
})
