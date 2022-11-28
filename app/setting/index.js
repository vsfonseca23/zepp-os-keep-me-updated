import { gettext } from 'i18n'
import { DEFAULT_RSS_FEEDS } from './../utils/constants'
AppSettingsPage({
  state: {
    rssFeeds: [],
    props: {},
  },
  addRssFeed(val) {
    this.state.rssFeeds = [...this.state.rssFeeds, val]
    this.setItem()
  },
  editRssFeed(val, index) {
    this.state.rssFeeds[index] = val
    this.setItem()
  },
  deleteRssFeed(index) {
    this.state.rssFeeds = this.state.rssFeeds.filter((_, ind) => {
      return ind !== index
    })
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.rssFeeds)
    this.state.props.settingsStorage.setItem('rssFeeds', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('rssFeeds')) {
      this.state.rssFeeds = JSON.parse(
        props.settingsStorage.getItem('rssFeeds'),
      )
    } else {
      this.state.rssFeeds = [...DEFAULT_RSS_FEEDS]
    }
    console.log('rssFeeds: ', this.state.rssFeeds)
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const addBTN = View(
      {
        style: {
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#409EFF',
          color: 'white',
          textAlign: 'center',
          padding: '0 25px',
          width: '25%',
        },
      },
      [
        TextInput({
          label: gettext('new'),
          onChange: (val) => {
            this.addRssFeed(val)
          },
        }),
      ],
    )
    this.state.rssFeeds.forEach((item, index) => {
      contentItems.push(
        View(
          {
            style: {
              borderBottom: '1px solid #eaeaea',
              padding: '6px 0',
              marginBottom: '6px',
              display: 'flex',
              flexDirection: 'row',
            },
          },
          [
            View(
              {
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justfyContent: 'center',
                  alignItems: 'center',
                },
              },
              [
                TextInput({
                  label: '',
                  bold: true,
                  value: item,
                  subStyle: {
                    color: '#333',
                    fontSize: '14px',
                  },
                  maxLength: 200,
                  onChange: (val) => {
                    if (val.length > 0 && val.length <= 200) {
                      this.editRssFeed(val, index)
                    } else {
                      console.log("rssFeeds can't be empty or too long!")
                    }
                  },
                }),
              ],
            ),
            Button({
              label: gettext('delete'),
              style: {
                fontSize: '12px',
                borderRadius: '30px',
                background: '#D85E33',
                color: 'white',
              },
              onClick: () => {
                this.deleteRssFeed(index)
              },
            }),
          ],
        ),
      )
    })
    return View(
      {
        style: {
          padding: '12px 20px',
        },
      },
      [
        addBTN,
        contentItems.length > 0 &&
          View(
            {
              style: {
                marginTop: '12px',
                padding: '10px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                backgroundColor: 'white',
              },
            },
            [...contentItems],
          ),
      ],
    )
  },
})
