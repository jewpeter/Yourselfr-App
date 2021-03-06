import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import s from '../Subscriptions.scss'
import { Link } from 'react-router'

import { isValidPhoto, isEmpty, arraysEqual } from '../../Toools'
import { config } from '../../../store/config'
import SubscribeButton from '../../SubscribeButton'
import FriendsHeader from '../../Headers/FriendsHeader'
import NoFriends from 'components/NoData/NoFriends'

class Friends extends Component {
  static propTypes = {
    followers: PropTypes.array.isRequired,
    loadFollowers: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.followers, nextProps.followers)
  }

  render () {
    const isAuthenticated = this.props.auth.authenticated
    const myUserId = this.props.auth.user._id

    var followersList
    if (!isEmpty(this.props.followers)) {
      var followers = this.props.friends
      followersList = followers.map(function (follower) {
        var photo = isValidPhoto(follower.photo)
        var linkHref = '/' + follower.alias
        const myPageInList = follower._id === myUserId
        return (
          <div>
            <div
              style={{background: `url(${config.http}/upload/background_cropped/${follower.background})`}}
              className={s.background}>
            </div>
            <div key={follower._id} className={s.container}>
              <Link to={linkHref}>
                <img src={photo} className={s.photo} />
              </Link>
              <div className={s.info}>
                <Link to={linkHref} className={s.username}>
                  {follower.username}
                </Link>
                <div className={s.alias}>
                  @{follower.alias}
                </div>
              </div>
              {isAuthenticated && !myPageInList && (
                <div className={s.SubscribeButton}>
                  <SubscribeButton
                    alias={follower.alias}
                    isFollowing={follower.isFollowing}
                    updateCounters={false}
                  />
                </div>
              )}
            </div>
            {!follower.background && (
              <div className={s.borderBottom}></div>
            )}
          </div>
        )
      })
    } else {
      followersList = undefined
    }

    return (
      <div className='container--right padding-0 container--subscriptions'>
        <FriendsHeader alias={this.props.user.alias} username={this.props.user.username} />
        <div>
          {followersList && (
            followersList
          )}
          {!followersList && (
            <NoFriends username={this.props.user.username} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    isFetching: state.isFetching.followers,
    auth: state.auth,
    user: state.user
  }
}
export default connect(mapStateToProps)(Friends)
