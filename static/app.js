const API = 'http://localhost:3000/';

const mockData = [
    {id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The most powerful vacuum in the world.'},
    {id: 'A2', name: 'Leaf Blower', rrp: '303.33', info: 'This product will blow your socks off.'},
    {id: 'B1', name: 'Chocolate Bar', rrp: '22.40', info: 'Deliciously overpriced chocolate.'}
];

const populateProducts = async (category, method = 'GET', payload) => {
    console.log(`${API}${category}`);

    const products = document.querySelector('#products');
    products.innerHTML = '';

    // mock fetch
    const sendInfo = {
        method: method,
        body: JSON.stringify(payload)
    };

    const res = await fetch(`${API}${category}`, {...sendInfo});
    const data = await res.json();

    for (const product of data) {
        const item = document.createElement('product-item');

        for (const key of ['name', 'rrp', 'info']) {
            const span = document.createElement('span');
            span.slot = key;
            span.textContent = product[key];
            item.appendChild(span);
        }

        products.appendChild(item);
    }
};

const category = document.querySelector('#category');
const addProduct = document.querySelector('#add');

category.addEventListener('input', async ({ target }) => {
    await populateProducts(target.value);
    addProduct.style.display = 'block';
});

addProduct.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log(e);

    const { target } = e;

    const payload = {
      name: target.name.value,
      rrp: target.price.value,
      info: target.info.value,
      category: category.value
    };

    console.log(payload);

    // make post request
    await populateProducts(category.value, 'POST', payload);
    target.reset()
})

customElements.define('product-item', class Item extends HTMLElement {
    constructor() {
      super()
      const itemTmpl = document.querySelector('#item').content.cloneNode(true)
      this.attachShadow({mode: 'open'}).appendChild(itemTmpl)
    }
});  