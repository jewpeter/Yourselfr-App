import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import x from './megaphone.scss'
import { selectText } from '../Toools'
import cookie from 'react-cookie'
// i am like this when the police finally finds me
// dropped body on a slippy road
// this shitty component is the last thing i will gift to this pathetic
// and useless and stupid funny society
class Megaphone extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };
  componentWillMount () {
    var closeFriends = cookie.load('closeMegaphone')
    this.setState({closed: closeFriends || false})
  }

  close () {
    cookie.remove('closeMegaphone', { path: '/' })
    cookie.save('closeMegaphone', true, { path: '/' })
    this.setState({closed: true})
  }

  render () {
    if (this.state.closed) {
      return (null)
    }
    return (
      <div className={cx(x.megaphone, 'container--left')}>
        <div onClick={() => this.close()} className={x.remove}></div>
        <div className={x.text}>
          Поделитесь ссылкой <br /> на ваш профиль
        </div>
        <div className={x.input} id='megaphone'
          onClick={() => selectText('megaphone')}>
          yoursel.fr/<b>{this.props.alias}</b></div>
        <div className={x.buttons}>
          <a href={`http://vk.com/share.php?url=http://yoursel.fr/${this.props.alias}&title=Узнайте обо мне больше на Йорселфере!`}
            className={cx(x.button, x.vk)}>ВК</a>
          <a href='http://www.facebook.com/sharer.php?u=http://yoursel.fr/?t='
            className={cx(x.button, x.fb)}>Фейсбук</a>
          <a href='http://twitter.com/share?url=http://yoursel.fr/?text=?via='
            className={cx(x.button, x.tw)}>Твитер</a>
          <a href='https://www.tumblr.com/widgets/share/tool?canonicalUrl=http://yoursel.fr/'
            className={cx(x.button, x.tb)}>Тамблер</a>
        </div>
      </div>
    )
  }
}

export default Megaphone
