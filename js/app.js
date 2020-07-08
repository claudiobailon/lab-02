'use strict';

$.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach( animalObject => {
      new Animal(animalObject).gallery();
      new Animal(animalObject).list();
    })
    // .then(Animals.galleryBuilder)
    //Chance assisted with this
  })
function Animal(object){
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;
}

Animal.prototype.gallery = function(){
  const myTemplate = $('#photo-template').html();
  const $newTemplate = $(`<section>${myTemplate}</section>`);
  $newTemplate.find('h2').text(this.name);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src',this.image);
  $newTemplate.find('img').attr('alt',this.title);
  $('main').append($newTemplate);
}
Animal.prototype.list = function(){
//https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
//Collabed with Tia and David
  let seen = {};
  $('option').each(function(){
    let txt = $(this).text();
    if(seen[txt])
      $(this).remove();
    else
      seen[txt] = true;
  });

  const $options = $(`<option value="${this.name}">${this.name}</option>`);
  $('select').append($options);
}

Animal.prototype.galleryBuilder = function(){

  // $('option').on('select', selectHandler)
  // $(this).val()
  // if val === animals.name

}

// function selectHandler (event){
// };

// $.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
//   .then(data => {
//     data.forEach( animalObject => {
//       let
//     })
//   })
