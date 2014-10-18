class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.timestamps
      t.float       "latitude"
      t.float       "longitude"
      t.float       "altitude"
      t.string      "last_fm"
      t.string      "last_played_artist"
      t.string      "last_played_track"
      t.string      "last_played_art"
    end
  end
end
