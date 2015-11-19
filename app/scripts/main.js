'use strict';

(function($, Framework7, gajus) {

    $( document ).ready(function() {
        var isTutorial = 1;

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

        stack.on('dragend', function(e) {
            var odk = e.target.getElementsByClassName('odk')[0];

            if (e.throwOutConfidence < 1) {
                odk.style.opacity = 0;
                odk.textContent = "";
            }
        });

        stack.on('dragmove', function(e) {
            //console.log(e)
            var odk = e.target.getElementsByClassName('odk')[0];
            
            switch(e.throwDirection) {
                case 'RIGHT':
                    odk.style.opacity = e.x * .004;
                    odk.textContent = "D";                
                    break;
                case 'LEFT':
                    odk.style.opacity = e.x * -.004;
                    odk.textContent = "O";
                    break;
                case 'UP':
                    odk.style.opacity = e.y * -.004;
                    odk.textContent = "S";
                    break;
                case 'DOWN':
                    odk.style.opacity = e.y * .004;
                    odk.textContent = "K";
                    break;
                default:
            }
        });

        stack.on('throwout', function (e) {
            // console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

            e.target.classList.remove('in-deck');

            switch (e.throwDirection) {
                case 'RIGHT':
                    var defenseCount = $('#defense-count').html();
                    defenseCount = parseInt(defenseCount) + 1;
                    $('#defense-count').html(defenseCount);
                    e.target.dataset.odk === 'd' ? correct++ : incorrect++;
                    break;
                case 'LEFT':
                    var offenseCount = $('#offense-count').html();
                    offenseCount = parseInt(offenseCount) + 1;
                    $('#offense-count').html(offenseCount);
                    e.target.dataset.odk === 'o' ? correct++ : incorrect++;
                    break;
                case 'DOWN':
                    var kickingCount = $('#kicking-count').html();
                    kickingCount = parseInt(kickingCount) + 1;
                    $('#kicking-count').html(kickingCount);
                    e.target.dataset.odk === 'k' ? correct++ : incorrect++;
                    break;
               case 'UP':
                    // var kickingCount = $('#kicking-count').html();
                    // kickingCount = parseInt(kickingCount) + 1;
                    // $('#kicking-count').html(kickingCount);
                    // e.target.dataset.odk === 'k' ? correct++ : incorrect++;
                    break;
                default:
                    console.log('Unrecognized throw direction');
            }

            switch (isTutorial) {
                case 1:
                    if (e.throwDirection === 'RIGHT') {
                        // alert("Your team is on defense. Swipe right to tag.");
                    } else {
                        alert("Oops! That's not the correct direction. Let's try an offensive play.");
                    }

                    isTutorial++;

                    $("#tutorial p").html("Now your team is on offense. Swipe left to tag.");

                    break;
                case 2:
                    if (e.throwDirection === 'LEFT') {
                        // alert("Now your team is on offense. Swipe left to tag.")
                    } else {
                        alert("Oops! That's not the correct direction. Maybe you'll get the hang of kicking plays.");
                    }

                    isTutorial++;
                    $("#tutorial p").html("Time to punt the ball. Swipe down to tag.");
                    break;
                case 3:
                    if (e.throwDirection === 'DOWN') {
                        // alert("You're almost a pro. If you see a scoreboard, swipe up.")
                    } else {
                        alert("Oops! That's not the correct direction. Let's try one more time");
                    }

                    isTutorial++;

                    $("#tutorial p").html("To skip or mark a scoreboard shot, </br> swipe up to tag.");
                    break;
                case 4:
                    if (e.throwDirection === 'UP') {
                        alert("Great job! Let’s get started.");
                    } else {
                        alert("Oops! That's not the correct direction, but you probably have the hang of it. Let's swipe for reals.");
                    }
                    
                    //$("#tutorial p").removeClass('infinite pulse');
                    $("#tutorial").addClass('hide');

                    
                    //$("#not-tutorial").addClass('animated bounceInDown');
                    $("#not-tutorial").removeClass('hide');
                    
                    
                    correct = 0;
                    incorrect = 0;
                    isTutorial = 0;

                    $('#defense-count').html("0");
                    $('#offense-count').html("0");
                    $('#kicking-count').html("0");

                    break;
            }


            if ((correct + incorrect) === 40) {
                alert(correct + " out of 40 correct!");
            }
        });

        stack.on('throwin', function (e) {
            //console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

            e.target.classList.add('in-deck');
        });

        alert("Let’s take a quick tutorial before we start tagging.");
    });
})(window.jQuery, window.Framework7, window.gajus);
