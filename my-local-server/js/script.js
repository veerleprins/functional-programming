let fetchJSONdata = async () => {
  const response = await fetch('../data/userData.json');
  const data = await response.json();
  return data;
}

let newArray = [];

fetchJSONdata().then(fullData => {
  console.log('Data is loaded!');
  let allEyeColours = fullData.map((data) => {
    return data.oogKleur.toLowerCase();
  });

  let replacedHash = allEyeColours.map((eyecolour) => {
    return eyecolour.replace(/#/g, "");
  });

  // let dataRGB = replacedHash.filter(colour => colour)

  console.log(replacedHash);

  // async function replaceString(colour) {
  //   return colour;
  // }

  // let newArr = allEyeColours.filter(replaceString);

  // console.log(newArr);
  // allEyeColours.forEach((colour) => {
  //   let colourNew = colour.replace(/#/g, "").toLowerCase();
  //   newArray.push(colourNew);
  //   console.log(newArray);
  // })


  // let newColor = allEyeColours.forEach((element) => console.log(element.toUpperCase()));
  // let newEyeColours = allEyeColours.filter(colour => colour.toLowerCase()
  // );
  // // allEyeColours.replace(/#/g, "");
  // console.log(newEyeColours);

})
