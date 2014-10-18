require 'net/http'

class ListenersController < WebsocketRails::BaseController
  def user_connected
    p 'user connected'
    @user = User.new
    if @user.save
      connection_store[:user_id] = @user.id
    end
  end

  def user_authenticate
    p 'attempt authentication'
    @lastfm = message['profile']

    @user = User.find(connection_store[:user_id])
    @user.update_attribute(:last_fm, @lastfm)

    url = URI.parse(@user.recent_tracks_url)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }

    result = JSON.parse(res.body)
    @user.update_attribute(:last_played_artist, result['recenttracks']['track']['artist']['#text'])
    @user.update_attribute(:last_played_track, result['recenttracks']['track']['name'])
    @user.update_attribute(:last_played_art, result['recenttracks']['track']['image'][1]['#text'])
  end

  def user_disconnected
    User.destroy(connection_store[:user_id])
    p 'user disconnected'
  end

  def post_location
    p 'location posted'
  end

  def get_listeners
    p 'got listeners'
  end
end