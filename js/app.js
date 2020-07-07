'use strict';

$.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach( animalObject => {
      new Animal(animalObject).gallery();
      new Animal(animalObject).list();
    })
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
  let seen = {};
  $('option').each(function(){
    let txt = $(this).text();
    if(seen[txt])
      $(this).remove();
    else
      seen[txt] = true;
  });

  const $options = $(`<option>${this.name}</option>`);
  $('select').append($options);
}

// $('option').on('select', selectHandler)
// function selectHandler (event){
// };

// $.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
//   .then(data => {
//     data.forEach( animalObject => {
//       let
//     })
//   })
