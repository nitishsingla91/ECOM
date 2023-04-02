
// ============================================================================
// Intro images hover scrolling
// ============================================================================

$(function(){
   $('.intro-item-link').hover(function(){
      var $img = $(this).find('img');
      var window_heiht = $(this).find('.intro-item-image').height();
      $img.css({'margin-top':-$img.height()+window_heiht+'px'});
   }, function(){
      $(this).find('img').css({'margin-top':0});
   });
});
