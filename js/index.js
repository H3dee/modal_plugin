const cards = [
    {
        id: '1',
        subtitle: 'Яблоко',
        configurable: true,
        price: '50$/kg',
        imgUrl: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'
    },
    {
        id: '2',
        price: '80$/kg',
        subtitle: 'Апельсин',
        configurable: true,
        imgUrl: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'
    },
    {
        id: '3',
        price: '120$/kg',
        subtitle: 'Манго',
        configurable: true,
        imgUrl: 'https://fruit-berries.ru/images/cms/thumbs/1f1204c38f5d7f50f0ab6bcf597ef97666ee60e8/mango-brazilia_483_auto_jpg_5_92.jpg'
    }
]

const modal =  $.modal({
    title: 'Modal window',
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui modi accusantium officia eveniet blanditiis quod, laudantium soluta, asperiores eligendi, repudiandae possimus beatae pariatur est autem deserunt veniam eos voluptate iste?',
    closable: true,
    width: '500px',
    cards
})