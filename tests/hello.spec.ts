import { Services as RawServices } from '../src/v3/raw'
import { ServerProperties } from '../src/v3/server'
import { Services } from '../src/v3/service'

import { v3 } from '../src'

test('v3.Service', () => {
  const object: RawServices = [
    {
      name: 'hub',
      path: '/world',
    },
    {
      name: 'iso',
      path: '/iso',
    },
  ]

  const services = Services.fromRawArray(object)

  console.log(services.get(0))

  console.log(services)
})

test('v3.server', () => {
  jest.setTimeout(100000)
  const props = {
    hello: 3,
    world: 3,
    domestic_server: true,
  }

  const map = new ServerProperties(props)

  console.log(map)
})

test('v3', async () => {
  const client = new v3.Client('https://pineapple.edgeless.top/api/v3')
  const hello = await client.hello({ proxy: false })
  // const cate = hello.plugins.tree.get('安装备份')
  console.log(hello)
})
