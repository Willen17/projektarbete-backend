export interface ProductData {
  image: string;
  title: string;
  description: string;
  price: number;
  id: string;
}

/**
 * function that returns a unique Id, both numbers and letters
 */
export const generateId = () => {
  const newId = Math.floor(1 + Math.random() * 0x1000)
    .toString(16)
    .substring(1);
  return newId;
};

export const productData: ProductData[] = [
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1032228-02_Fm_M0013527&mw=1500&fmt=webp",
    title: "Jolly",
    description:
      "Stool with comfortable, shaped seat. Made of solid wood, in the Toon Wood type. Height 61 cm. Seat 40x32 cm. Seat height: 61 cm Width at the bottom 47 cm. Mounted.",
    price: 1599,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1595558-01_Fm_M0037129&mw=1500&fmt=webp",
    title: "Chardonne",
    description:
      "Armchair with pine and plywood frame with nozag suspension and foam filling. Brushed metal legs. Dimensions: Width 89 cm, height 77 cm, depth 83 cm. Seat height 43 cm, seat depth 62 cm, seat width 54 cm.",
    price: 3919,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=hom_1663846-02_Fs&mw=1500&fmt=webp",
    title: "Xander",
    description:
      "Lounge armchair with upholstery in bouquet fabric and passpoalk edge along the top edge. Legs and frame in powder-coated metal. Foam filling. Easier installation.",
    price: 2299,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1615855-02_Fm_M0044073&mw=1500&fmt=webp",
    title: "Magnolia",
    description:
      "Rattan bedside table with shelf underneath. The top is reinforced with a plywood board under the rattan. Dimensions: Width 41 cm, height 71 cm, depth 31 cm. Leg height 22 cm. Height to the upper edge of the lower shelf 25 cm. Dimensions between the shelves 42.5 cm.",
    price: 1299,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1503126-03_Fm_M0037108&mw=1500&fmt=webp",
    title: "Bella",
    description:
      "Upholstered headboard attached to the wall (two hooks on the back). Wooden frame (pine). Upholstery in velvet of polyester and filling of polyether. Width 95 cm. Height 61.5 cm. Depth 7.5 cm.",
    price: 999,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1664039-01_Fm_M0059479&mw=1500&fmt=webp",
    title: "Essentials",
    description:
      "Side table / cabinet in solid mango wood with wax-treated surface. Two doors with wooden handles and soft closing. The cabinet is divided inside and has a fixed shelf. Dimensions between shelves approx. 27 cm. Clear height under furniture 14 cm. Delivered assembled.",
    price: 5499,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1615835-01_Fm_M0044051&mw=1500&fmt=webp",
    title: "Dagny",
    description:
      "Bench in lacquered beech wood with seat in braided jute rope. The paint is water-based. FSC-certified product, which means that it contains wood that has been harvested from a responsible forestry that takes people and the environment into account.",
    price: 2999,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1632250-02_Fm_M0059930&mw=1500&fmt=webp",
    title: "Daisy Bubble",
    description:
      "Velvet pillowcase with a nice luster and a sewn, decorative pattern on the front. Smooth back. Zipper at the bottom.",
    price: 199,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1619501-01_Fm_M0069502&mw=1500&fmt=webp",
    title: "Barrel",
    description:
      "Lounge chair in PU leather (imitation leather) with a vibrant tone-on-tone pattern and denim seam in the middle of the front of the seat and back. Legs of powder coated metal. Foam filling. Delivered assembled.",
    price: 1799,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1660641-01_Fm_M0062969&mw=1500&fmt=webp",
    title: "Alba",
    description:
      "Mango wood desk with waxed surface. Three drawers with drawer stop. Clear height under furniture 57 cm. Easier installation.",
    price: 3449,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1016153_Fm_M0018374&mw=1500&fmt=webp",
    title: "Vincent",
    description:
      "A solid, spacious cabinet with many uses. Made of MDF with sides and sliding glass doors. The sliding doors have handles made of antique brass-colored metal. Two fixed shelves and a partition.",
    price: 5999,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1521775-03_Fm_M0025925&mw=1500&fmt=webp",
    title: "Charleston",
    description:
      "Armchair with upholstery in velvet. Top with wrinkled fabric on both the outside and inside. Ornamental pillow in velvet with upholstered button included. Wooden frame. Base and legs of powder coated metal. Upholstery of polyether. Height 78 cm, width 78 cm, depth 80 cm. Seat height 47 cm, seat depth 65 cm. Seat width 50 cm. Max load 135 kg. Assemble the legs on delivery.",
    price: 2899,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1574225-01_Fm_M0029892&mw=1500&fmt=webp",
    title: "Betty",
    description:
      "Headboard in mango wood with a grooved pattern at the front. Countersunk iron on the back that prevents the wood material from twisting or cracking. 3 keyhole brackets at the back for wall mounting. Dimensions: Width 183 cm, height 60 cm, depth 2.5 cm.",
    price: 2899,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1572940-01_Fm_M0029855&mw=1500&fmt=webp",
    title: "Minna",
    description:
      "Mirror of spray-painted solid walnut. Height 158 ​​cm. Width 39 cm. Depth 6 cm. Total depth fully unfolded 37 cm (bottom).",
    price: 1199,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1615662-01_Fm_M0044057&mw=1500&fmt=webp",
    title: "Pirri 2-pack",
    description:
      "2 chairs in Scandinavian, stylish design with toasted backrest. Upholstery with foam filling. Metal legs. Maximum weight load 150 kg. Easier installation.",
    price: 2699,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1572474-02_Fm_M0029803&mw=1500&fmt=webp",
    title: "Melisso",
    description:
      "Low, modern coffee table with marble top. Frame and legs of solid beech. Height 34 cm, width 100 cm, length 100 cm. Leg height 23 cm. Maximum weight load 50 kg. Easier assembly (legs screwed on upon delivery).",
    price: 4999,
    id: generateId(),
  },
  {
    image:
      "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_1538346-01_Fm_M0037120&mw=1500&fmt=webp",
    title: "Ditti",
    description:
      "Sideboard in solid pine and MDF. Two small drawers. Height 82.5 cm, Width 104 cm, Depth 37 cm. Height from floor to shelf 7 cm. Lev. unassembled.",
    price: 1999,
    id: generateId(),
  },
];
