import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'

const appId = 281122
const messageBuilder = new MessageBuilder({ appId })

App({
  globalData: {
    messageBuilder: messageBuilder
  },
  onCreate(options) {
    messageBuilder.connect()
  },
  onDestroy(options) {
    messageBuilder.disConnect()
  }
})
