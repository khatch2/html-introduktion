const duckFriends = [
  {imgSrc:"https://github.com/JohanCodeForFun/algorithms-and-data-structures/blob/main/freecodecamp/ResponsiveWebDesign/product-landing-page/images/ducky-ducks-720x540.png?raw=true", altText: "Ducky ducks", id: 1},
  {imgSrc:"https://github.com/JohanCodeForFun/algorithms-and-data-structures/blob/main/freecodecamp/ResponsiveWebDesign/product-landing-page/images/ducky-bath-720x540.png?raw=true", altText: "Ducky bath", id: 2},
]

function FriendsList() {
  return ( 
    <section id="friends" className="products">
    <h3>Ducky's Friends:</h3>

    {duckFriends.map(elem => (
      <img
        key={elem.id}
        src={elem.imgSrc}
        alt={elem.altText}
      />
    ))}
  </section>
  );
}

export default FriendsList;