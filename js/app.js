'use strict';

$.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach( animalObject => {
      new Animal(animalObject).gallery();
      console.log(data);
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
