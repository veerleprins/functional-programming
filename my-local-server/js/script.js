let fetchJSONdata = async () => {
  const response = await fetch('../data/userData.json');
  const data = await response.json();
  return data;
}

let newVar;

let replaceHashToLower = (str) => {
  return str.replace(/#/g, "").replace(" ", "").toLowerCase();
};

let componentToHex = (char) => {
  var hex = char.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

let rgbToHex = (arr) => {
  return componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
}

fetchJSONdata().then(fullData => {
  console.log('Data is loaded!');
  let allEyeColours = fullData.map((data) => {
    return replaceHashToLower(data.oogKleur);
  });

  console.log(allEyeColours);

  let rgbColourCode = allEyeColours.filter((element) => {
    let regx = new RegExp(/rgb/g);
    if (element.match(regx)) {
      element = element.replace(".", ",");
      element = element.replace(/rgb([()])/g, "");
      element = element.split(",");
      console.log(element);
      element = rgbToHex(element);
      console.log(element);
      return element;
    }
    return element
  })

  // let allEyeColours = fullData.map((data) => {
  //   return data.oogKleur.toLowerCase();
  // });

  // let replacedHash = allEyeColours.map((eyecolour) => {
  //   return replaceHash(eyecolour);
  //   // return eyecolour.replace(/#/g, "");
  // });

  // let replaceWords = replacedHash.map((eyecolours) => {
  //   return eyecolours.replace
  // })

  // let dataRGB = replacedHash.filter(colour => colour)

  // console.log(allEyeColours);

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

});
