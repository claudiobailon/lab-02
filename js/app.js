'use strict';
//global array each animal pushed into
//foreach on colllection
let animalArray = [];

$.ajax('data/page-1.json',{method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageOne';

    })
    //event listener for filtering
    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index, element) => {
        if (this.value === $(element).attr('data-keyword')){
          $(element).show();
        }
        else if (this.value === 'default'){
          $('section').show();
        }
      });

    });
  })

$.ajax('data/page-2.json',{method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageTwo';
    })
    //event listener for filtering
    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index, element) => {
        if (this.value === $(element).attr('data-keyword')){
          $(element).show();
        }
        else if (this.value === 'default'){
          $('section').show();
        }
      });

    });
    animalArray.forEach(obj => {
      $('main').append(obj.createHTML());
    })
    $('.pageTwo').hide();
  })

// constructor function builds animal obnject
function Animal(object){
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;

  animalArray.push(this);
}

Animal.prototype.list = function(){
//Remove duplicate images
//https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
//Collaborated with Tia and David
  let seen = {};

  const $options = $(`<option value="${this.name}">${this.name.toUpperCase()}</option>`);
  $('select').append($options);

  $('option').each(function(){
    let txt = $(this).text().toLocaleUpperCase();
    if(seen[txt]){
      $(this).remove();
    }
    else
      seen[txt] = true;
  });
}

Animal.prototype.createHTML = function(){
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}


$('#button1').on('click', function(){
  $('.pageOne').show();
  $('.pageTwo').hide();
})

$('#button2').on('click', function(){
  $('.pageTwo').show();
  $('.pageOne').hide();
})


// refactor using flexbox
// sort images
