'use strict';

(function($, Framework7, gajus) {

$( document ).ready(function() {
    // Initialize app
    var myApp = new Framework7();

    // If we need to use custom DOM library, let's save it to $$ variable:
    var $$ = Dom7;

    // Add view
    var mainView = myApp.addView('.view-main', {
      // Because we want to use dynamic navbar, we need to enable it for this view:
      dynamicNavbar: true
    });


    var stack;

    stack = gajus.Swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);
        targetElement.classList.add('in-deck');
    });

    var correct = 0;
    var incorrect = 0;

    var cards = $(".stack li");
    var count = cards.length - 1;

    $(".offense").bind("mouseup touchend", function(e) {
        console.log('click offense');
        cards[count].dataset.odk === 'o' ? correct++ : incorrect++;
        animate();
    })

    $(".defense").bind("mouseup touchend", function(e) {
        console.log('click defnese');
        cards[count].dataset.odk === 'd' ? correct++ : incorrect++;
        animate();
    })

    $(".kicking").bind("mouseup touchend", function(e) {
        console.log('click kicking');
        cards[count].dataset.odk === 'k' ? correct++ : incorrect++;  
        animate();
    })

    var animate = function() {
        var card = cards[count];
        $(card).animate({top: "+=1000"}, 1000)
        if ((correct + incorrect) === 15) {
            alert(correct + " out of 15 correct!");
        }
        count--;
    }




    // stack.on('throwout', function (e) {
    //     console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

    //     e.target.classList.remove('in-deck');

    //     switch (e.throwDirection) {
    //       case 'RIGHT':
    //         var defenseCount = $('#defense-count').html();
    //         defenseCount = parseInt(defenseCount) + 1;
    //         $('#defense-count').html(defenseCount);
    //         e.target.dataset.odk === 'd' ? correct++ : incorrect++;
    //         break;
    //       case 'LEFT':
    //         var offenseCount = $('#offense-count').html();
    //         offenseCount = parseInt(offenseCount) + 1;
    //         $('#offense-count').html(offenseCount);
    //         e.target.dataset.odk === 'o' ? correct++ : incorrect++;
    //         break;
    //       case 'DOWN':
    //         var kickingCount = $('#kicking-count').html();
    //         kickingCount = parseInt(kickingCount) + 1;
    //         $('#kicking-count').html(kickingCount);
    //         e.target.dataset.odk === 'k' ? correct++ : incorrect++;
    //         break;
    //       default:
    //         console.log('Unrecognized throw direction');
    //     }

    //     if ((correct + incorrect) === 15) {
    //         alert(correct + " out of 15 correct!");
    //     }
    // });

    // stack.on('throwin', function (e) {
    //     console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

    //     e.target.classList.add('in-deck');
    // });
});
})(window.jQuery, window.Framework7, window.gajus);
