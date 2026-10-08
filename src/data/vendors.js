const vendors = [
  {
    id: 'my-restaurant',
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'mahallah-ali-1',
        name: 'Nasi Lemak Ayam',
        description: 'Coconut rice with fried chicken, sambal and egg',
        price: 7.5,
        category: 'Rice',
        available: true,
      },
      {
        id: 'mahallah-ali-2',
        name: 'Mee Goreng',
        description: 'Fried noodles with vegetables and egg',
        price: 6.5,
        category: 'Noodles',
        available: true,
      },
      {
        id: 'mahallah-ali-3',
        name: 'Teh Tarik',
        description: 'Pulled milk tea',
        price: 2.5,
        category: 'Drinks',
        available: true,
      },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'ami-1',
        name: 'Nasi Ayam Penyet',
        description: 'Smashed fried chicken with sambal and rice',
        price: 9,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ami-2',
        name: 'Air Bandung',
        description: 'Rose syrup with milk',
        price: 3,
        category: 'Drinks',
        available: true,
      },
      {
        id: 'ami-3',
        name: 'Laksa Johor',
        description: 'Spaghetti served with spicy fish gravy',
        price: 8,
        category: 'Noodles',
        available: true,
      },
    ],
  },
]

export default vendors