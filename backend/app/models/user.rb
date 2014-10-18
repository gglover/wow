class User < ActiveRecord::Base
	def recent_tracks_url
		'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' << self.last_fm << '&api_key=' << Rails.configuration.last_fm_key << '&format=json&limit=1'
	end
end
