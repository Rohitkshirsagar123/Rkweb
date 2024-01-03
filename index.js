// preloader 

  // JavaScript to handle the loader display
  setTimeout(function() {
    // Hide the loader after 10 seconds
    var loader = $('.reload-container');
    if (loader) {
        loader.hide();
        $('body').css('filter', 'none'); // Remove the blur effect
    }
}, 2000); // Display the loader for 10 seconds

// checkbox js 
// checkbox js 
var checkbox = document.getElementById('check');
var lstitem = document.querySelectorAll('.item_sec')[0];
var listItems = document.querySelectorAll('.item_sec li');

function toggleListItems() {
    if (window.innerWidth <= 777) {
        lstitem.style.display = 'none';
        checkbox.addEventListener('change', function() {
            lstitem.style.display = 'block';
            if (checkbox.checked) {
                listItems.forEach(function(item) {
                    item.style.display = 'block';
                });

                // Add click event listener to each list item
                listItems.forEach(function(item) {
                    item.addEventListener('click', itemClickHandler);
                });

            } else {
                listItems.forEach(function(item) {
                    item.style.display = 'none';
                });
                // Remove the click event listener when the checkbox is unchecked
                listItems.forEach(function(item) {
                    item.removeEventListener('click', itemClickHandler);
                });
            }
        });

    } else {
        // If the screen width is above 777px, ensure that list items are always displayed
        listItems.forEach(function(item) {
            item.style.display = 'block';
            lstitem.style.display = 'flex';
        });

        // Remove the click event listener when the window width is above 777px
        listItems.forEach(function(item) {
            item.removeEventListener('click', itemClickHandler);
        });
    }
}

// Click event handler function
function itemClickHandler() {
    checkbox.checked = false;
    lstitem.style.display = 'none';
}

// Initially check the window width and apply the appropriate behavior
toggleListItems();

// Add an event listener to the window's resize event
window.addEventListener('resize', toggleListItems);






function Ticker( elem ) {
	elem.lettering();
	this.done = false;
	this.cycleCount = 5;
	this.cycleCurrent = 0;
	this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
	this.charsCount = this.chars.length;
	this.letters = elem.find( 'span' );
	this.letterCount = this.letters.length;
	this.letterCurrent = 0;

	this.letters.each( function() {
		var $this = $( this );
		$this.attr( 'data-orig', $this.text() );
		$this.text( '-' );
	});
}

Ticker.prototype.getChar = function() {
	return this.chars[ Math.floor( Math.random() * this.charsCount ) ];
};

Ticker.prototype.reset = function() {
	this.done = false;
	this.cycleCurrent = 0;
	this.letterCurrent = 0;
	this.letters.each( function() {
		var $this = $( this );
		$this.text( $this.attr( 'data-orig' ) );
		$this.removeClass( 'done' );
	});
	this.loop();
};

Ticker.prototype.loop = function() {
	var self = this;

	this.letters.each( function( index, elem ) {
		var $elem = $( elem );
		if( index >= self.letterCurrent ) {
			if( $elem.text() !== ' ' ) {
				$elem.text( self.getChar() );
				$elem.css( 'opacity', Math.random() );
			}
		}
	});

	if( this.cycleCurrent < this.cycleCount ) {
		this.cycleCurrent++;
	} else if( this.letterCurrent < this.letterCount ) {
		var currLetter = this.letters.eq( this.letterCurrent );
		this.cycleCurrent = 0;
		currLetter.text( currLetter.attr( 'data-orig' ) ).css( 'opacity', 1 ).addClass( 'done' );
		this.letterCurrent++;
	} else {
		this.done = true;
	}

	if( !this.done ) {
		requestAnimationFrame( function() {
			self.loop();
		});
	} else {
		setTimeout( function() {
			self.reset();
		}, 750 );
	}
};

$words = $( '.word' );

$words.each( function() {
	var $this = $( this ),
		ticker = new Ticker( $this ).reset();
	$this.data( 'ticker', ticker  );
});

// preloader 


// cursor script 

const cursorCanvas = document.getElementById("cursorCanvas");
const cursorCtx = cursorCanvas.getContext("2d");

// Resize cursor canvas to fit window
cursorCanvas.width = window.innerWidth;
cursorCanvas.height = window.innerHeight;

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 1;
    // Set speed based on the opposite direction of mouse movement
    const speedFactor = length * 0.05; // Adjust the 0.05 multiplier as needed
    this.speedX = -directionX * speedFactor * (Math.random() * 2 + 1); // Adjust the multiplier as needed for desired speed
    this.speedY = -directionY * speedFactor * (Math.random() * 2 + 1);
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.03; // Decrease alpha over time, this will make the sparkle fade away
  }

  draw() {
    cursorCtx.beginPath();
    cursorCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    const gradient = cursorCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, 'rgba(232, 28, 255, ' + this.alpha + ')');
    gradient.addColorStop(1, 'rgba(64, 201, 255, ' + this.alpha + ')');
    
    cursorCtx.fillStyle = gradient;
    cursorCtx.fill();
    cursorCtx.closePath();
  }
}

let sparkles = [];

// Update and draw sparkles
function handleSparkles() {
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

  if (isMouseMoving) {
    // Only add a sparkle if the mouse is moving
    sparkles.push(new Sparkle(mouseX, mouseY));
  }

  // Loop over sparkles to update and draw each one
  for (let i = sparkles.length - 1; i >= 0; i--) {
    sparkles[i].update();
    sparkles[i].draw();

    // Remove the sparkle if its alpha has become less than or equal to 0
    if (sparkles[i].alpha <= 0) {
      sparkles.splice(i, 1);
    }
  }

  requestAnimationFrame(handleSparkles);
}

let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let isMouseMoving = false;
let mouseMoveTimeout;
let directionX = 0;
let directionY = 0;
let length = 1;

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseMoving = true;

  // Calculate direction of mouse movement
  const dx = mouseX - prevMouseX;
  const dy = mouseY - prevMouseY;

  // Normalize the direction (make its length equal to 1)
  length = Math.sqrt(dx * dx + dy * dy);
  directionX = length ? dx / length : 0;
  directionY = length ? dy / length : 0;

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  // Reset the flag after a short delay
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => {
    isMouseMoving = false;
  }, 50);
});

handleSparkles();

// Optional: Resize canvas and redraw stars when the window is resized
window.addEventListener("resize", function () {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
});


// cursor script  end


// typing js start 
const typer = document.getElementById('main-typer');
const words = typer.getAttribute('data-words').split(',');
const delay = parseInt(typer.getAttribute('data-delay'));
const deleteDelay = parseInt(typer.getAttribute('data-deleteDelay'));
let wordIndex = 0;
let isDeleting = false;
let text = '';

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    text = currentWord.substring(0, text.length - 1);
  } else {
    text = currentWord.substring(0, text.length + 1);
  }
  typer.textContent = text;

  if (!isDeleting && text === currentWord) {
    isDeleting = true;
    setTimeout(type, deleteDelay);
  } else if (isDeleting && text === '') {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, delay);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

type(); // Start the animation

// typing js end




// skills section
// JavaScript
'use strict';

function animateProgressBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            let increment = 1; // Change the increment value for the speed of the animation
            let intervalDuration = 20; // Change the duration for the interval

            progressBars.forEach(progressBar => {
                const maxProgress = progressBar.dataset.progress;
                let currentProgress = 0;

                const interval = setInterval(() => {
                    currentProgress += increment;
                    if (currentProgress > maxProgress) {
                        clearInterval(interval);
                    } else {
                        progressBar.style.background = `conic-gradient(#f9004d ${currentProgress}%, #212428 0)`;
                        progressBar.querySelector('.progress-number').textContent = `${currentProgress}%`;
                    }
                }, intervalDuration);
            });

            // Unobserve after starting the animation to prevent it from repeating
            observer.unobserve(entry.target);
        }
    });
}

const skillSections = document.querySelectorAll('.skill_sec');

const observer = new IntersectionObserver(animateProgressBars, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Adjust this value to control when the animation starts
});

skillSections.forEach(section => {
    observer.observe(section);
});



// project section 
$(function () {
    var filterList = {
        init: function () {
            // MixItUp plugin
            // http://mixitup.io
            $('.portfolio-grid').mixItUp({
                selectors: {
            target: '.portfolio',
            filter: '.filter'	
        },
        load: {
            filter: 'all' // show app tab on first load
            }     
            });								
        }
    };
    // Run the show!
    filterList.init();
});	