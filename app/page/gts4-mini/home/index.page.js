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
      x: (deviceInfo.width / 2) - 32, //image of 64px
      y: (deviceInfo.height / 2) - 32,//image of 64px     
    })

    // const timer1 = timer.createTimer(
    //   0,
    //   1000,
    //   function (option) {
    //     const isRunning = imgAnimation.getProperty(hmUI.prop.ANIM_IS_RUNINNG)
    //     const isPaused = imgAnimation.getProperty(hmUI.prop.ANIM_IS_PAUSE)
    //     const isStopped = imgAnimation.getProperty(hmUI.prop.ANIM_IS_STOP)
    //     const status = imgAnimation.getProperty(hmUI.prop.anim_status)

    //     // if (isRunning)
    //     //   imgAnimation.setProperty(hmUI.prop.ANIM_STATUS, hmUI.anim_status.PAUSE)
    //     // else
    //     //   imgAnimation.setProperty(hmUI.prop.ANIM_STATUS, hmUI.anim_status.RESUME)

    //     logger.debug("isRunning", isRunning, "isPaused", isPaused, "isStopped", isStopped, "status", status)
    //   },
    //   {}
    // )

    // const { width, height } = hmUI.getTextLayout(LOADING_TEXT.text, {
    //   text_size: 36,
    //   text_width: deviceInfo.width,
    //   wrapped: 1
    // })

    // hmUI.createWidget(hmUI.widget.TEXT, {
    //   ...LOADING_TEXT,
    //   w: width,
    //   h: height
    // })

    logger.debug("finished Page.build")
  },
  onDestroy() {
    logger.debug("called Page.onDestroy")
  },
  bluetoothTest() {
    logger.debug("called Page.bluetoothTest")
  }
})