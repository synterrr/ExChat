let chatzito = {
    init(socket) {
        let channel = socket.channel('chatzito:lobby', {})
        channel.join()
        this.listenForChats(channel)
    },

    listenForChats(channel) {
        document.getElementById('chat-form').addEventListener('submit', function(e){
            e.preventDefault()

            let username = document.getElementById('user-name').value
            let usermsg = document.getElementById('user-msg').value

            channel.push('shout', {name: username, body: usermsg})

            document.getElementById('user-name').value = ''
            document.getElementById('user-msg').value = ''
        })

        channel.on('shout', payload => {
            let chatBox = document.querySelector('#chat-box')
            let msgBlock = document.createElement('p')

            msgBlock.insertAdjacentHTML('beforeend', `<b>${payload.name}:</b> ${payload.body}`)
            chatBox.appendChild(msgBlock)
        })
    }
}

export default chatzito