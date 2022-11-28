import { COMMAND_REQUEST_NEWS, LOADING_ANIM_SIZE } from "../../../utils/constants"
import { LOADING_TEXT } from "./index.style"

const logger = DeviceRuntimeCore.HmLogger.getLogger('keep-me-updated')
const { messageBuilder } = getApp()._options.globalData
const deviceInfo = hmSetting.getDeviceInfo()

Page({
  state: {
    loadingAnimationWidget: undefined,
    loadingMessageWidget: undefined,
    news: undefined,
  },
  onInit() {
    logger.debug("called Page.onInit")
  },
  build() {
    logger.debug("called Page.build")

    this.showLoading()
    this.requestNews()

    logger.debug("finished Page.build")
  },
  onDestroy() {
    logger.debug("called Page.onDestroy")
  },
  showLoading() {
    logger.debug("called Page.showLoading")
    //Rename frames PowerShell: 
    //dir | rename-item -NewName {$_.name -replace "frame-","animation_"}
    this.state.loadingAnimationWidget = hmUI.createWidget(hmUI.widget.IMG_ANIM, {
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

    const { height } = hmUI.getTextLayout(LOADING_TEXT.text, {
      text_size: 36,
      text_width: deviceInfo.width,
      wrapped: 1
    })

    this.state.loadingMessageWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...LOADING_TEXT,
      y: (deviceInfo.height / 2) + 20,
      w: deviceInfo.width,
      h: height
    })
  },
  hideLoading() {
    logger.debug("called Page.hideLoading")
    if (this.state.loadingAnimationWidget)
      hmUI.deleteWidget(this.state.loadingAnimationWidget)

    if (this.state.loadingMessageWidget)
      hmUI.deleteWidget(this.state.loadingMessageWidget)
  },
  requestNews() {
    logger.debug("called Page.requestNews")
    this.state.news = undefined

    messageBuilder
      .request({
        command: COMMAND_REQUEST_NEWS
      })
      .then((data) => {
        logger.debug("received news", data)
        this.state.news = data
        hmUI.showToast({ text: data })
        this.hideLoading()
      })
  }
})