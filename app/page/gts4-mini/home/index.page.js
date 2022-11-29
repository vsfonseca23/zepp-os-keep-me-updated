import { ABOUT_BUTTON, NEWS_BUTTON } from "./index.style"

const logger = DeviceRuntimeCore.HmLogger.getLogger('keep-me-updated')

Page({
  onInit() {
    logger.debug("called Page.onInit")
  },
  build() {
    hmUI.createWidget(hmUI.widget.BUTTON, { ...NEWS_BUTTON })
    hmUI.createWidget(hmUI.widget.BUTTON, { ...ABOUT_BUTTON })
  },
  onDestroy() {
    logger.debug("called Page.onDestroy")
  }
})