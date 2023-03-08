import React from 'react';
const productsData = [
  {
    id: 1,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer ssssssssssss  sssss dasd asd ads ',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid omnis ab quae ut explicabo, error aut molestiae! Et aperiam impedit sed error alias quas placeat eligendi unde sequi. Nobis dolorum quos accusantium perferendis nulla blanditiis sed dicta nesciunt temporibus, placeat illo in voluptates atque eos maxime quam cum fugit magni.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
    ],
    countInStock: 10,
  },
  {
    id: 2,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine ',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 3,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 4,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 5,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 6,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 7,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
  {
    id: 8,
    img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(1).png?alt=media&token=d71ca8c2-d1e6-4908-8449-4d5e68fe6ad6',
    name: 'D&D Figurine - adventurer',
    price: 25,
    desc: [
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      },
      {
        header: 'Lorem ipsum',
        detail:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure inventore porro molestias corporis voluptates nobis? Voluptas, illo. Nulla, dolor.',
        img: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
      },
    ],
    category: '3D model',
    reviews: 4.5,
    gallery: [
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F1.png?alt=media&token=e890b07f-b33d-4175-97c1-fa980fab1a66',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F2.png?alt=media&token=6cbf245a-b8c5-44ab-9c73-5ed592ff7453',
      'https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/gallery%2F3.png?alt=media&token=6b697e41-2d07-44da-a47c-24e551656102',
    ],
    countInStock: 10,
  },
];

export default productsData;
