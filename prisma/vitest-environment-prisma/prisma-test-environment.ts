import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Executing vitest environment setup')
    return {
      teardown() {
        console.log('Executing vitest environment teardown')
      },
    }
  },
}
