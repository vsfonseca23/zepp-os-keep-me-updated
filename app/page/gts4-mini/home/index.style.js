import { gettext as getText } from 'i18n'

const deviceInfo = hmSetting.getDeviceInfo()
const PADDING = px(10)

export const NEWS_BUTTON = {
  x: px(0),
  y: px(80),
  w: deviceInfo.width,
  h: px(80),
  text: getText("newsButton"),
  text_size: px(36),
  normal_color: 0x305EE4,
  press_color: 0x21419f,
  click_func: () => { hmApp.gotoPage({ url: "page/gts4-mini/news/news.page" }) }
}

export const ABOUT_BUTTON = {
  x: px(0),
  y: NEWS_BUTTON.y + NEWS_BUTTON.h + PADDING,
  w: deviceInfo.width,
  h: px(80),
  text: getText("aboutButton"),
  text_size: px(36),
  normal_color: 0x305EE4,
  press_color: 0x21419f,
  click_func: () => { hmApp.gotoPage({ url: "page/gts4-mini/about/about.page" }) }
}