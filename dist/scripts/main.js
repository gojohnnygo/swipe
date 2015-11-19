"use strict";!function(t,e,o){t(document).ready(function(){var a,r=1,n=new e;Dom7,n.addView(".view-main",{dynamicNavbar:!0});a=o.Swing.Stack(),[].forEach.call(document.querySelectorAll(".stack li"),function(t){a.createCard(t),t.classList.add("in-deck")});var i=0,c=0;a.on("dragend",function(t){var e=t.target.getElementsByClassName("odk")[0];t.throwOutConfidence<1&&(e.style.opacity=0,e.textContent="")}),a.on("dragmove",function(t){var e=t.target.getElementsByClassName("odk")[0];switch(t.throwDirection){case"RIGHT":e.style.opacity=.004*t.x,e.textContent="D";break;case"LEFT":e.style.opacity=t.x*-.004,e.textContent="O";break;case"UP":e.style.opacity=t.y*-.004,e.textContent="S";break;case"DOWN":e.style.opacity=.004*t.y,e.textContent="K"}}),a.on("throwout",function(e){switch(e.target.classList.remove("in-deck"),e.throwDirection){case"RIGHT":var o=t("#defense-count").html();o=parseInt(o)+1,t("#defense-count").html(o),"d"===e.target.dataset.odk?i++:c++;break;case"LEFT":var a=t("#offense-count").html();a=parseInt(a)+1,t("#offense-count").html(a),"o"===e.target.dataset.odk?i++:c++;break;case"DOWN":var n=t("#kicking-count").html();n=parseInt(n)+1,t("#kicking-count").html(n),"k"===e.target.dataset.odk?i++:c++;break;case"UP":break;default:console.log("Unrecognized throw direction")}switch(r){case 1:"RIGHT"===e.throwDirection||alert("Oops! That's not the correct direction. Let's try an offensive play."),r++,t("#tutorial p").html("Now your team is on offense. Swipe left to tag.");break;case 2:"LEFT"===e.throwDirection||alert("Oops! That's not the correct direction. Maybe you'll get the hang of kicking plays."),r++,t("#tutorial p").html("Time to punt the ball. Swipe down to tag.");break;case 3:"DOWN"===e.throwDirection||alert("Oops! That's not the correct direction. Let's try one more time"),r++,t("#tutorial p").html("To skip or mark a scoreboard shot, </br> swipe up to tag.");break;case 4:"UP"===e.throwDirection?alert("Great job! Let’s get started."):alert("Oops! That's not the correct direction, but you probably have the hang of it. Let's swipe for reals."),t("#tutorial").addClass("hide"),t("#not-tutorial").removeClass("hide"),i=0,c=0,r=0,t("#defense-count").html("0"),t("#offense-count").html("0"),t("#kicking-count").html("0")}i+c===40&&alert(i+" out of 40 correct!")}),a.on("throwin",function(t){t.target.classList.add("in-deck")}),alert("Let’s take a quick tutorial before we start tagging.")})}(window.jQuery,window.Framework7,window.gajus);