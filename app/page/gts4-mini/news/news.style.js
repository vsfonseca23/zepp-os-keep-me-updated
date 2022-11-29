import { gettext as getText } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()

export const LOADING_TEXT = {
  x: 0,
  y: 150,
  text_size: 36,
  text: getText("loadingMsg"),
  color: 0xffffff,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
}

export const NEWS_TEXT = {
  x: 0,
  y: 20,
  text_size: 36,
  color: 0xffffff,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.TOP,
  text_style: hmUI.text_style.WRAP,
}

export const BACK_BUTTON = {
  x: 0, 
  w: deviceInfo.width,
  h: 80,
  text: getText("backButton"),
  text_size: 36,
  normal_color: 0x305EE4,
  press_color: 0x21419f,
  click_func: () => { hmApp.gotoPage({ url: "page/gts4-mini/home/index.page" }) }
}