(function($){
/**
*	//////////////// KBmodal OBJECT	////////////////
**/

	// KBmodal Object constructor;
	function KBmodal(url, type, objname, gallery) {
		
		var self = this;

		self.name = objname;
	    self.contentType = type;
	    self.contentUrl = url;
	    if (typeof gallery != 'undefined') {
	    	self.galleryName = gallery;
	    	self.galleryItems = [];
	    }

	    // methods;

	    self.openModal = function(){
	    	// create global js variable with created object name;
	    	KBmodal_name = self.name;

	    	// create gallery array if data-content-gallery of clicked element is set
	    	if (typeof self.galleryName != 'undefined') {
	    		createGalleryArray();
		    }

	    	var modalBody = '<div class="KBmodal__opened" modalName="'+self.name+'">';
    		// modal content;

			switch(self.contentType) {
			    case 'yt':
			        modalBody +=  generateYoutubeModal();
			        break;
			    case 'image':
			        modalBody += generateImageModal();
			        break;
		        case 'gallery':
			        modalBody +=  generateGalleryModal();
			        break;
			    default:
			        modalBody += generateImageModal();
			}

    		// modal content end
	    	modalBody += '</div>';

	    	// show modal;
	    	$('body').append(modalBody);

	    	// resize modals on their generation (responsive)
	    	switch(self.contentType) {
			    case 'yt':
			        resizeModalYt();
			        break;
			    case 'image':
			        resizeModalImage();
			        break;
			    case 'gallery':
			        resizeModalImage();
			        break;
			    default:
			        resizeModalImage();
			} 
	    	
	    }

	    self.closeModal = function(){
	    	$('[modalName='+self.name+']').remove();
	    }

	    generateImageModal = function(){
	    	var modalBody;

	    	modalBody = '<div class="KBmodal__image">';

	    	modalBody += '<img src="'+self.contentUrl+'">';

			modalBody += '</div>';
			return modalBody;

	    }

	    generateGalleryModal = function(){

	    	// set clicked item as current(opened) gallery item
			for (var i = 0; i <= self.galleryItems.length-1; i++) {
				if (self.galleryItems[i] == self.contentUrl) {
					KBcurrent_item = i;
				}
			}

	    	var modalBody;

	    	modalBody = '<div class="KBmodal__image">';

	    	modalBody += '<div class="KBgalleryNav KBprev"><i class="fa fa-caret-left" aria-hidden="true"></i></div>';

	    	modalBody += '<img src="'+self.contentUrl+'">';

	    	modalBody += '<div class="KBgalleryNav KBnext"><i class="fa fa-caret-right" aria-hidden="true"></i></div>';

			modalBody += '</div>';
			return modalBody;

	    }

	    generateYoutubeModal = function(){   

    		var modalBody;
	    	var ytVideoID = (self.contentUrl).replace('https://youtu.be/', '');

			modalBody = '<div class="KBmodal__yt">';

			modalBody += '<iframe width="1280" height="720" src="https://www.youtube.com/embed/'+ytVideoID+'?vq=hd1080&autoplay=true" frameborder="0" allowfullscreen></iframe>';

			modalBody += '</div>';

			return modalBody;

	    }

	    resizeModalImage = function(){

	    	var $maxImageWidth = $('.KBmodal__image').width();
	    	var $maxImageHeight = $('.KBmodal__image').height();

	    	var $img = $('.KBmodal__image img');

	    	$img.css({
	    		'max-width': $maxImageWidth,
	    		'max-height': $maxImageHeight
	    	});

	    }

	    resizeModalYt = function(){

	    	var $iframe = $('.KBmodal__yt iframe');
	    	var $iframeWidth = $('.KBmodal__yt iframe').width();

	    	$iframe.css({
	    		'height': $iframeWidth * 0.5625,
	    	});

	    }

	    createGalleryArray = function(){
	    	$('[data-content-gallery='+self.galleryName+']').each(function() {
	    		self.galleryItems.push($(this).attr('data-content-url'));
			});
	    }

	    // resize modals on screen resize (responsive)
	    $( window ).resize(function() {

			switch(self.contentType) {
			    case 'yt':
			        resizeModalYt();
			        break;
			    case 'image':
			        resizeModalImage();
			        break;
			    case 'gallery':
			        resizeModalImage();
			        break;
			    default:
			        resizeModalImage();
			} 

		}); 

	}

	// KBmodal functions

	/* 
		// Variables accessible outside KBmodal object

		KBmodal_name - name of opened KBmodal object
		KBcurrent_item - array index of clicked gallery element (only set if clicked element is type of gallery)
	
	*/
	
	function generateKBmodal(url, type, gallery){
		var modalID = Math.floor((Math.random() * 100) + 1);
		var modalName = "KBmodal"+modalID;

		window[modalName] = new KBmodal(url, type, modalName, gallery);
		window[modalName].openModal();
	}

	function KBprevAction(){

		if (typeof KBcurrent_item !== 'undefined') {

			if (KBcurrent_item>0) {
				KBcurrent_item = KBcurrent_item - 1;
			}else{
				KBcurrent_item = KBcurrent_item;
			}

			$('[modalname="'+KBmodal_name+'"]').find('img').attr('src', window[KBmodal_name].galleryItems[KBcurrent_item]);

		}
		
	}

	function KBnextAction(){

		if (typeof KBcurrent_item !== 'undefined') {

			if (KBcurrent_item<window[KBmodal_name].galleryItems.length-1) {
				KBcurrent_item = KBcurrent_item + 1;
			}else{
				KBcurrent_item = KBcurrent_item;
			}

			$('[modalname="'+KBmodal_name+'"]').find('img').attr('src', window[KBmodal_name].galleryItems[KBcurrent_item]);

		}

	}

	function KBcloseAction(){
		window[KBmodal_name].closeModal();
		delete window[KBmodal_name];
	}

    // open KBmodal on '.KBmodal' class click
    $(document).on('click', '.KBmodal', function(){
		var url = $(this).attr('data-content-url');
		var type = ($(this).attr('data-content-type') ? $(this).attr('data-content-type') : 'image');
		var gallery = $(this).attr('data-content-gallery');

		generateKBmodal(url, type, gallery);
	});

	// close modal and remove object
	$(document).on('click', '.KBmodal__opened', function(e){
		
		KBcloseAction();

	});

	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: //left arrow key

				KBprevAction();

	        break;

	        case 39:

		        KBnextAction(); //right arrow key

	        break;

	        case 27:

	        	KBcloseAction(); //esc key

	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});

	$(document).on('click', '.KBprev', function(e){
		e.stopPropagation();

		KBprevAction();

	});

	$(document).on('click', '.KBnext', function(e){
		e.stopPropagation();

		KBnextAction();

	});
	
	
/**
*	//////////////// KBmodal OBJECT end	////////////////
**/
})(jQuery);