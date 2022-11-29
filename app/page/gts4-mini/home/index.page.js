import { COMMAND_REQUEST_NEWS, LOADING_ANIM_SIZE } from "../../../utils/constants"
import { LOADING_TEXT, NEWS_TEXT } from "./index.style"

const logger = DeviceRuntimeCore.HmLogger.getLogger('keep-me-updated')
const { messageBuilder } = getApp()._options.globalData

const deviceInfo = hmSetting.getDeviceInfo()

Page({
  state: {
    loadingAnimationWidget: undefined,
    loadingMessageWidget: undefined,
    news: undefined,
    lastRenderedNews: undefined,
    lastRenderedNewsY: undefined,
    lastRenderedNewsH: undefined,
    currentNewsY: undefined,
  },
  onInit() {
    logger.debug("called Page.onInit")
  },
  build() {
    logger.debug("called Page.build")

    this.showLoading()
    this.requestNews()
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
        logger.debug("received data", data)
        this.state.news = data
        this.showNews()
      })
  },
  showNews() {
    logger.debug("called Page.showNews")

    if (this.state.news.length && this.state.news.length > 0) {
      this.hideLoading()

      for (let i = 0; i < this.state.news.length; i++) {

        const currentNews = this.state.news[i]

        let currentNewsY = 50
        const padding = 20

        const { height } = hmUI.getTextLayout(currentNews, {
          text_size: 36,
          text_width: deviceInfo.width,
          wrapped: 1
        })

        if (this.state.lastRenderedNews)
          currentNewsY = this.state.lastRenderedNewsY + this.state.lastRenderedNewsH + padding

        this.state.lastRenderedNews = hmUI.createWidget(hmUI.widget.TEXT, {
          ...NEWS_TEXT,
          y: currentNewsY,
          w: deviceInfo.width,
          h: height,
          text: currentNews
        })

        let rectY = currentNewsY + height + padding
        let rectH = 5

        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: rectY,
          w: deviceInfo.width,
          h: rectH,
          color: 0x03a9fc
        })

        this.state.lastRenderedNewsY = currentNewsY
        this.state.lastRenderedNewsH = height + rectH + padding
      }
    }
  }
})