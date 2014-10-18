var dispatcher = new WebSocketRails('localhost:3000/websocket');
dispatcher.bind('post_location', function() {console.log('yeah')});
document.getElementById('get').onclick = function() {
	dispatcher.trigger('post_location', {message: 'loc'});
};

document.getElementById('auth').onclick = function() {
	dispatcher.trigger('authenticate', {profile: 'asparagus22'});
}; 
