'use strict';

(function($, Framework7, gajus) {

    $( document ).ready(function() {
        var isTutorial = 1;
        var playGroup = 1;

        var startTime;

        var starting = 11;
        var images = ["", "1-D1.jpg", "2-D2.jpg","3-D3.jpg","4-D4.jpg","5-D5.jpg","6-D6.jpg","7-D7.jpg","8-O1.jpg","9-O2.jpg","10-O3.jpg","11-K1.jpg","12-D8.jpg","13-D9.jpg","14-D10.jpg","15-D11.jpg","16-S1.jpg","17-D12.jpg","18-D13.jpg","19-D14.jpg","20-K2.jpg","21-O4.jpg","22-O5.jpg","23-O6.jpg","24-K3.jpg","25-D15.jpg","26-D16.jpg","27-D17.jpg","28-O7.jpg","29-O8.jpg","30-O9.jpg","31-O10.jpg","32-O11.jpg","33-K4.jpg","34-K5.jpg","35-K6.jpg","36-O12.jpg","37-O13.jpg","38-O14.jpg","39-D18.jpg","40-S2.jpg","41-D19.jpg","42-D20.jpg","43-D21.jpg","44-D22.jpg","45-D23.jpg","46-D24.jpg","47-D25.jpg","48-D26.jpg","49-O15.jpg","50-O16.jpg","51-O17.jpg","52-O18.jpg","53-O19.jpg","54-O20.jpg","55-O21.jpg","56-O22.jpg","57-O23.jpg","58-O24.jpg","59-O25.jpg","60-D27.jpg","61-D28.jpg","62-D29.jpg","63-O26.jpg","64-O27.jpg","65-O28.jpg","66-O29.jpg","67-O30.jpg","68-O31.jpg","69-O32.jpg","70-O33.jpg","71-K7.jpg","72-D30.jpg","73-D31.jpg","74-D32.jpg","75-D33.jpg","76-D34.jpg","77-S3.jpg","78-K8.jpg","79-O34.jpg","80-O35.jpg","81-O36.jpg","82-O37.jpg","83-O38.jpg","84-O39.jpg","85-O40.jpg","86-O41.jpg","87-O42.jpg","88-O43.jpg","89-O44.jpg","90-D35.jpg","91-D36.jpg","92-O45.jpg","93-O46.jpg","94-O47.jpg","95-O48.jpg","96-O49.jpg","97-O50.jpg","98-O51.jpg","99-O52.jpg","100-O53.jpg","101-O54.jpg","102-D37.jpg","103-D38.jpg","104-D39.jpg","105-K9.jpg","106-O55.jpg","107-O56.jpg","108-O57.jpg","109-O58.jpg","110-O59.jpg","111-O60.jpg","112-K10.jpg","113-D40.jpg","114-D41.jpg","115-D42.jpg","116-D43.jpg","117-D44.jpg","118-D45.jpg","119-D46.jpg","120-O61.jpg"];

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

        // stack.on('dragmove', function(e) {
        //     //console.log(e)
        //     var odk = e.target.getElementsByClassName('odk')[0];
            
        //     switch(e.throwDirection) {
        //         case 'RIGHT':
        //             odk.style.opacity = e.x * .004;
        //             odk.textContent = "D";                
        //             break;
        //         case 'LEFT':
        //             odk.style.opacity = e.x * -.004;
        //             odk.textContent = "O";
        //             break;
        //         case 'UP':
        //             odk.style.opacity = e.y * -.004;
        //             odk.textContent = "S";
        //             break;
        //         case 'DOWN':
        //             odk.style.opacity = e.y * .004;
        //             odk.textContent = "K";
        //             break;
        //         default:

        //     }
        // });

        stack.on('throwout', function (e) {
            // console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

            e.target.classList.remove('in-deck');
            // console.log(e.throwDirection);

            switch (e.throwDirection) {
                case 'RIGHT':
                    // var defenseCount = $('#defense-count').html();
                    // defenseCount = parseInt(defenseCount) + 1;
                    // $('#defense-count').html(defenseCount);
                    e.target.dataset.odk === 'd' ? correct++ : incorrect++;
                    break;
                case 'LEFT':
                    // var offenseCount = $('#offense-count').html();
                    // offenseCount = parseInt(offenseCount) + 1;
                    // $('#offense-count').html(offenseCount);
                    e.target.dataset.odk === 'o' ? correct++ : incorrect++;
                    break;
                case 'DOWN':
                    // var kickingCount = $('#kicking-count').html();
                    // kickingCount = parseInt(kickingCount) + 1;
                    // $('#kicking-count').html(kickingCount);
                    e.target.dataset.odk === 'k' ? correct++ : incorrect++;
                    break;
               case 'UP':
                    // var kickingCount = $('#kicking-count').html();
                    // kickingCount = parseInt(kickingCount) + 1;
                    // $('#kicking-count').html(kickingCount);
                    e.target.dataset.odk === 's' ? correct++ : incorrect++;
                    break;
                default:
                    console.log('Unrecognized throw direction');
                    // console.log(e.throwDirection)
                    // console.log(e.target);
            }

            switch (isTutorial) {
                case 1:
                    if (e.throwDirection === 'RIGHT') {
                        // alert("Your team is on defense. Swipe right to tag.");
                    } else {
                        // alert("Oops! That's not the correct direction. Let's try an offensive play.");
                    }

                    isTutorial++;

                    $("#tutorial p").html("Now your team is on offense. Swipe left to tag.");

                    break;
                case 2:
                    if (e.throwDirection === 'LEFT') {
                        // alert("Now your team is on offense. Swipe left to tag.")
                    } else {
                        // alert("Oops! That's not the correct direction. Maybe you'll get the hang of kicking plays.");
                    }

                    isTutorial++;
                    $("#tutorial p").html("Time to punt the ball. Swipe down to tag.");
                    break;
                case 3:
                    if (e.throwDirection === 'DOWN') {
                        // alert("You're almost a pro. If you see a scoreboard, swipe up.")
                    } else {
                        // alert("Oops! That's not the correct direction. Let's try one more time");
                    }

                    isTutorial++;

                    $("#tutorial p").html("To mark a scoreboard shot, swipe up to tag.");
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

                    startTime = new Date();

                    break;
            }

            if ((correct + incorrect) % 5 === 0 && (correct + incorrect) != 0 && (correct + incorrect) < 111) {
                // var html = "";
                var end = starting + 4;

                for (var i = starting; i <= end; i++) {
                    var file = "images/" + images[i];
                    var odk = images[i].split('-')[1][0].toLowerCase();
                    var html = '<li class="in-deck" data-odk="' + odk + '"><div class="tag horz-tabs right">D</div><div class="tag horz-tabs left">O</div><div class="tag vert-tabs down ">K</div><div class="tag vert-tabs up">S</div><div class="odk"></div><img src="' + file + '"></li>';
                    var node = $.parseHTML(html)[0];
                    stack.createCard(node);
                    $("#full-game").prepend(node);
                }

                starting += 5;
            }

            console.log(correct + incorrect)
            if ((correct + incorrect) === 120) {
                var time = Math.round((new Date() - startTime) / 1000);
                var mins = Math.floor(time / 60);
                var secs = time % 60;

                alert(correct + " out of 120 correct\nin " + mins + " min and " + secs + " sec!");
            }
        });

        stack.on('throwin', function (e) {
            //console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');

            e.target.classList.add('in-deck');
        });

        alert("Let’s take a quick tutorial before we start tagging.");
    });
})(window.jQuery, window.Framework7, window.gajus);
