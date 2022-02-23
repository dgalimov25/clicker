async function main() {
    var eButton = document.getElementById('button')
    var eScore = document.getElementById('score')
    var eLevel = document.getElementById('level')
    var eItems = document.getElementById('items')

    var config = await getConfig()
    var items = config.items

    var _score = Number(getCookie('score'))
    var _level = Number(getCookie('level'))
    var score = _score | 0
    var level = _level | 0

    function update() {
        eScore.innerHTML = score
        eLevel.innerHTML = level
        document.cookie = `score=${score}`
        document.cookie = `level=${level}`
    } update()

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    async function getConfig() {
        var res1 = await fetch('https://raw.githubusercontent.com/dgalimov25/clicker/main/config.json')
        var res2 = await res1.json()
        return res2
    }

    eButton.onclick = function () {
        score++
        var nextLevel = (level + 1) * 10
        if (score > nextLevel) level++
        update()
    }

    config.items.forEach((item, i) => {
        var eItem = document.createElement('div')
        eItem.innerHTML = `<h4>${item.name}</h4>Цена: <span>${item.sale}</span>`
        eItem.id = 'item' + i
        eItems.appendChild(eItem)
        eItem.onclick = () => buyItem(i)
    })

    function buyItem(i) {
        var item = items[i]
        if (item.level > level) {
            return alert(`Этот предмет доступен с ${item.level} уровня!`)
        } else if (item.sale > score) {
            alert('У вас недостаточно очков!')
        } else if (confirm(`Вы хотите купить "${item.name}"?`)) {
            score -= item.sale
            update()
        }
    }
} main()
