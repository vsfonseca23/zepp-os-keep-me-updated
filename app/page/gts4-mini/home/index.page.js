import { HELLO_WORLD_TEXT } from "./index.style"

const logger = DeviceRuntimeCore.HmLogger.getLogger('keep-me-updated')
const { messageBuilder } = getApp()._options.globalData
const deviceInfo = hmSetting.getDeviceInfo()


Page({
  state: {
  },
  onInit() {
    logger.debug("called Page.onInit")
  },
  build() {
    const { width, height } = hmUI.getTextLayout(HELLO_WORLD_TEXT.text, {
      text_size: 36,
      text_width: deviceInfo.width,
      wrapped: 1
    })

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...HELLO_WORLD_TEXT,
      w: width,
      h: height
    })

  },
  onDestroy() {
    logger.debug("called Page.onDestroy")
  },
  bluetoothTest() {
    logger.debug("called Page.bluetoothTest")
  }
})