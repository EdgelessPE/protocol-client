import { v3 } from '../src'

test('v3.server.hello', async () => {
  const client = new v3.Client('https://pineapple.edgeless.top/api/v3')
  const hello = await client.hello({ proxy: false })

  for (const [category, list] of hello.plugins.tree) {
    for (const plugin of list) {
      console.log(category, plugin.underline.extname)
    }
  }
})
