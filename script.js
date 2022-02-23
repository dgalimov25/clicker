async function main() {
    var eButton = document.getElementById('button')
    var eScore = document.getElementById('score')
    var eLevel = document.getElementById('level')
    var eItems = document.getElementById('items')

    var config = await getConfig()
    var items = config.items
    var score = 0
    var level = 0

    function update() {
        eScore.innerHTML = score
        eLevel.innerHTML = level
    }

    async function getConfig() {
        var res1 = await fetch('https://raw.githubusercontent.com/dgalimov25/clicker/main/config.json')
        var res2 = await res1.json()
        return res2
    }

    eButton.onclick = function () {
        score++
        if (score == 10) {
            level++
        }
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

    document.cookie = "name=user"
    console.log(document.cookie)
}
main()