'use strict';
//global array each animal pushed into
//foreach on colllection
let animalArray = [];

$.ajax('data/page-1.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.gallery();
      newHornAnimal.list();
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
          $('main section:first-child').css('display','none');
        }
      });
      
    });
  })

  $.ajax('data/page-2.json',{method: "GET", datatype: "JSON" })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.galleryTwo();
      newHornAnimal.list();
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
          $('main section:first-child').css('display','none');
        }
      });
      
    });
    $('.pageTwo').hide();
  })

// constructor function builds animal obnject
function Animal(object){
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;

  // animalArray.push(this);
}
//constructor prototype on animal object
Animal.prototype.gallery = function(){
  const myTemplate = $('#photo-template').html();
  const $newTemplate = $(`<section>${myTemplate}</section>`);
  $newTemplate.find('h2').text(this.name);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src',this.image);
  $newTemplate.find('img').attr('alt',this.title);
  $newTemplate.attr('data-keyword', this.name); //Thank you Andrew!!!!
  $newTemplate.attr('class', 'pageOne')
  $('main').append($newTemplate);
}

Animal.prototype.galleryTwo = function(){
  const myTemplate = $('#photo-template').html();
  const $newTemplate = $(`<section>${myTemplate}</section>`);
  $newTemplate.find('h2').text(this.name);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src',this.image);
  $newTemplate.find('img').attr('alt',this.title);
  $newTemplate.attr('data-keyword', this.name); //Thank you Andrew!!!!
  $newTemplate.attr('class', 'pageTwo')
  $('main').append($newTemplate);
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
      // console.log('txt',txt);
    }
    else
      seen[txt] = true;
      // console.log('seen',seen);
  });
}

// Add pagination
//for each in json add to array length
$('#button1').on('click', function(){
  $('.pageOne').show();
  $('.pageTwo').hide();
})

$('#button2').on('click', function(){
  $('.pageTwo').show();
  $('.pageOne').hide();
})

// refactor using mustache
// refactor using flexbox
// sort images