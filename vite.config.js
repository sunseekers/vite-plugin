import myExample from './vite-plugin-example'
import live from './vite-plugin-life'
import mock from './vite-plugin-mock'


export default {
    plugins: [
      myExample(),
      live(),
      mock()
    ],
}