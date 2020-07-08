'use strict';
//global array each animal pushed into
//foreach on colllection
$.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach(animalObject => {
      new Animal(animalObject).gallery();
      new Animal(animalObject).list();
      // Animal.galleryBuilder;
    })
    //event listener
    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index, element) => {
        if (this.value === $(element).attr('data-keyword')){
          $(element).show();
        }
        if (this.value === 'Filter by Keyword'){
          $('section').show();
        }
      });
      
      // data.forEach(animalObject => {
      //   if (animalObject.val() === selectedItem)
      // })
    });
  })
  // Animal.galleryBuilder;
  // .then(data => {
  //   var animal = new Animal;
    
  // });
    //Chance assisted with this

// constructor function
function Animal(object){
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;
}
//constructor prototype
Animal.prototype.gallery = function(){
  const myTemplate = $('#photo-template').html();
  const $newTemplate = $(`<section>${myTemplate}</section>`);
  $newTemplate.find('h2').text(this.name);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src',this.image);
  $newTemplate.find('img').attr('alt',this.title);
  $newTemplate.attr('data-keyword', this.name); //Thank you Andrew!!!!
  $('main').append($newTemplate);
}
Animal.prototype.list = function(){
//https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
//Collaborated with Tia and David
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
  console.log('selected');
  $('option').on('select', selectHandler);
  console.log('selected');
  // $(this).val()
  // if this.name === animals.name

}

// function selectHandler (event){
// };

// $.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
//   .then(data => {
//     data.forEach( animalObject => {
//       let
//     })
//   })
