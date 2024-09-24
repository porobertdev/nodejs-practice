// convert obj to JSON to be served on server requests
const mockData = JSON.stringify([
    {
      id: "A1",
      name: "Vacuum Cleaner",
      rrp: "99.99",
      info: "The most powerful vacuum in the world.",
    },
    {
      id: "A2",
      name: "Leaf Blower",
      rrp: "303.33",
      info: "This product will blow your socks off.",
    },
    {
      id: "B1",
      name: "Chocolate Bar",
      rrp: "22.40",
      info: "Delicious overpriced chocolate.",
    },
]);

module.exports = mockData;