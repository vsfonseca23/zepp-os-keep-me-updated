import { MessageBuilder } from '../shared/message'
import { gettext as getText } from 'i18n'
import { COMMAND_REQUEST_NEWS, DEFAULT_RSS_FEEDS } from '../utils/constants'

const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    console.log("called AppSideService.onInit")

    messageBuilder.listen(() => { })

    messageBuilder.on('request', (ctx) => {
      console.log("called messageBuilder.on.request")

      const payload = messageBuilder.buf2Json(ctx.request.payload)
      const { command } = payload

      if (command === COMMAND_REQUEST_NEWS) {
        const feeds = this.getRssFeeds()
        let allNewsFeeds = []

        // for (let i = 0; i < feeds.length; i++) {

        //   const mockFeed = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac hendrerit ipsum. Sed vitae turpis egestas augue sodales varius. Quisque hendrerit vulputate lacus, interdum vestibulum sem laoreet ut. Suspendisse malesuada nulla vel enim pulvinar facilisis. Maecenas ultricies, turpis a sagittis efficitur, augue elit facilisis arcu, eget tincidunt urna diam ut quam. Nam dapibus convallis sem et mollis. Mauris laoreet leo dui, a tincidunt turpis fermentum in. Phasellus nec dapibus risus. Suspendisse dignissim in metus a blandit. Sed a consectetur enim. Nullam rutrum sit amet nulla ac bibendum."
        //   allNewsFeeds.push(mockFeed)

        //   // fetch(feeds[i])
        //   //   .then((data) => {
        //   //     allNewsFeeds.push(data)
        //   //   })
        // }

        //Mock
        allNewsFeeds.push("News feed content 1")
        allNewsFeeds.push("News feed content 2")
        allNewsFeeds.push("News feed content 3")

        ctx.response({ data:allNewsFeeds })
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