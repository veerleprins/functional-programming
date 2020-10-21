let fetchJSONdata = async () => {
  const response = await fetch('../data/userData.json');
  const data = await response.json();
  return data;
}

fetchJSONdata().then(fullData => {
  console.log('Data is loaded!');
  let allEyeColours = fullData.map((value) => {
    return value.oogKleur;
  });
  let newEyeColours = allEyeColours.filter(colour => console.log(colour));
  // allEyeColours.replace(/#/g, "");
  console.log(newEyeColours);

})
