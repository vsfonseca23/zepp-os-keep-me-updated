import { LOADING_ANIM_SIZE } from "../../../utils/constants"
import { LOADING_TEXT } from "./index.style"

const logger = DeviceRuntimeCore.HmLogger.getLogger('keep-me-updated')
const { messageBuilder } = getApp()._options.globalData
const deviceInfo = hmSetting.getDeviceInfo()

Page({
  state: {
    animStatus: undefined
  },
  onInit() {
    logger.debug("called Page.onInit")
  },
  build() {
    logger.debug("called Page.build")

    //Rename frames PowerShell: 
    //dir | rename-item -NewName {$_.name -replace "frame-","animation_"}
    const imgAnimation = hmUI.createWidget(hmUI.widget.IMG_ANIM, {
      anim_path: 'loading-anim',
      anim_prefix: 'loading',
      anim_ext: 'png',
      anim_fps: 60,
      anim_size: 60,
      repeat_count: 0,
      anim_status: hmUI.anim_status.START,
      x: (deviceInfo.width / 2) - (LOADING_ANIM_SIZE / 2),
      y: (deviceInfo.height / 2) - LOADING_ANIM_SIZE, 
    })

    const { width, height } = hmUI.getTextLayout(LOADING_TEXT.text, {
      text_size: 36,
      text_width: deviceInfo.width,
      wrapped: 1
    })

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...LOADING_TEXT,
      y: (deviceInfo.height / 2) + 20,
      w: deviceInfo.width,
      h: height
    })

    logger.debug("finished Page.build")
  },
  onDestroy() {
    logger.debug("called Page.onDestroy")
  },
  bluetoothTest() {
    logger.debug("called Page.bluetoothTest")
  }
})