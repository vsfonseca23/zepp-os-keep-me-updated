import { MessageBuilder } from '../shared/message'
import { gettext as getText } from 'i18n'

const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    console.log("called AppSideService.onInit")

    messageBuilder.listen(() => { })

    messageBuilder.on('request', (ctx) => {
      console.log("called messageBuilder.on.request")

      const payload = messageBuilder.buf2Json(ctx.request.payload)
      const { command } = payload

      if (command === 'test')
        ctx.response({ data: getText("connectionSuccessMessage") })
      else
        ctx.response({ data: undefined })

    })
  },
  onRun() { console.log("called AppSideService.onRun") },
  onDestroy() { console.log("called AppSideService.onDestroy") },
})