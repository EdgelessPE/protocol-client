import { v3 } from '../src'

test('v3.server.hello', async () => {
  const client = new v3.Client('http://127.0.0.1:8383/api/v3')
  const hello = await client.hello({ proxy: false })

  for (const [category, list] of hello.plugins.tree) {
    for (const plugin of list) {
      console.log(category, plugin.underline.extname)
    }
  }
  console.log(hello)

  const alpha = await client.alpha('ALPHA')
  console.log([
    alpha.kernel?.integrity(),
    alpha.kernel?.url,
    alpha.kernel?.name,
    alpha.kernel?.timestamp,
    alpha.kernel?.version,
  ])
})
