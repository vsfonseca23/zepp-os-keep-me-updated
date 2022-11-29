import { MessageBuilder } from '../shared/message'
import { gettext as getText } from 'i18n'
import { COMMAND_REQUEST_NEWS, DEFAULT_RSS_FEEDS } from '../utils/constants'
import { extractInnerValueFromXML } from '../utils'

const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    console.log("called AppSideService.onInit")

    messageBuilder.listen(() => { })

    messageBuilder.on('request', async (ctx) => {
      console.log("called messageBuilder.on.request")

      const payload = messageBuilder.buf2Json(ctx.request.payload)
      const { command } = payload

      if (command === COMMAND_REQUEST_NEWS) {
        const feeds = this.getRssFeeds()
        let allNewsFeeds = []

        for (let i = 0; i < feeds.length; i++) {
          await fetch(feeds[i])
            .then((data) => {
              let feedItem = extractInnerValueFromXML(data.body, "item")
              if (feedItem) {
                let itemTag = "<item>" + feedItem + "</item>"
                do {
                  let feedTitle = extractInnerValueFromXML(feedItem, "title")
                  let feedDescription = extractInnerValueFromXML(feedItem, "description")

                  allNewsFeeds.push(feedTitle)

                  data.body = data.body.replace(itemTag, '')
                  feedItem = extractInnerValueFromXML(data.body, "item")
                  itemTag = "<item>" + feedItem + "</item>"

                } while (feedItem !== undefined)
              }
            })
        }
        ctx.response({ data: allNewsFeeds })
      }
      else
        ctx.response({ data: getText("commandNotFoundMessage") })

    })
  },
  onRun() { console.log("called AppSideService.onRun") },
  onDestroy() { console.log("called AppSideService.onDestroy") },
  getRssFeeds() {
    return settings.settingsStorage.getItem('rssFeeds')
      ? JSON.parse(settings.settingsStorage.getItem('rssFeeds'))
      : [...DEFAULT_RSS_FEEDS]
  }  
})