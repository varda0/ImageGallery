$(document).ready(function() {
    let currentCategory = 'all';
    let currentView = 'grid';
    let currentImageIndex = 0;
    let filteredItems = [];
    
   
    setTimeout(function() {
        $('#loading').hide();
        $('#gallery').fadeIn(500);
        
        $('.gallery-item img').each(function() {
            const img = $(this);
            img.hide();
            
            if (img[0].complete) {
                img.fadeIn(500);
            } else {
                img.on('load', function() {
                    img.fadeIn(500);
                });
            }
        });
    }, 1500);
    
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        currentCategory = $(this).data('category');
        filterGallery(currentCategory);
    });

    function filterGallery(category) {
        if (category === 'all') {
            $('.gallery-item').fadeIn();
            filteredItems = $('.gallery-item');
        } else {
            $('.gallery-item').hide();
            $(`.gallery-item[data-category="${category}"]`).fadeIn();
            filteredItems = $(`.gallery-item[data-category="${category}"]`);
        }
    }

    $('#grid-view').click(function() {
        if (currentView !== 'grid') {
            switchToGridView();
        }
    });

    $('#list-view').click(function() {
        if (currentView !== 'list') {
            switchToListView();
        }
    });

    function switchToGridView() {
        currentView = 'grid';
        $('#gallery').removeClass('block').addClass('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4');
        
        $('.gallery-item').each(function() {
            $(this).find('img').addClass('w-full h-64 object-cover');
        });
        
        $('.view-btn').removeClass('bg-blue-500 text-white').addClass('text-gray-700');
        $('#grid-view').removeClass('text-gray-700').addClass('bg-blue-500 text-white');
    }

    function switchToListView() {
        currentView = 'list';
        $('#gallery').removeClass('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4').addClass('block space-y-4');
        
        $('.gallery-item').each(function() {
            $(this).find('img').removeClass('w-full h-64').addClass('h-32 w-32 object-cover float-left mr-4');
        });
        
  
        $('.view-btn').removeClass('bg-blue-500 text-white').addClass('text-gray-700');
        $('#list-view').removeClass('text-gray-700').addClass('bg-blue-500 text-white');
    }

    $('.gallery-item').click(function() {
        const imgSrc = $(this).find('img').attr('src');
        const title = $(this).find('h3').text();
        const description = $(this).find('p').text();
        
        $('#lightboxImage').attr('src', imgSrc);
        $('#lightboxTitle').text(title);
        $('#lightboxDescription').text(description);
        
        currentImageIndex = filteredItems.index(this);
        updateImageCounter();
        
        $('#lightbox').css('display', 'flex').hide().fadeIn();
    });

    $('#closeLightbox, #lightbox').click(function(e) {
        if(e.target === this) {
            $('#lightbox').fadeOut();
        }
    });
    
    $('#next-btn').click(function(e) {
        e.stopPropagation();
        navigateImages(1);
    });
    
    $('#prev-btn').click(function(e) {
        e.stopPropagation();
        navigateImages(-1);
    });
    
    $(document).keydown(function(e) {
        if ($('#lightbox').is(':visible')) {
            if (e.keyCode === 37) { 
                navigateImages(-1);
            } else if (e.keyCode === 39) { 
                navigateImages(1);
            } else if (e.keyCode === 27) { 
                $('#lightbox').fadeOut();
            }
        }
    });
    
    function navigateImages(direction) {
        currentImageIndex = (currentImageIndex + direction + filteredItems.length) % filteredItems.length;
        
        const newItem = filteredItems.eq(currentImageIndex);
        const newImgSrc = newItem.find('img').attr('src');
        const newTitle = newItem.find('h3').text();
        const newDescription = newItem.find('p').text();
        
        // Fade transition
        $('#lightboxImage').fadeOut(300, function() {
            $(this).attr('src', newImgSrc).fadeIn(300);
        });
        
        $('#lightboxTitle').text(newTitle);
        $('#lightboxDescription').text(newDescription);
        
        updateImageCounter();
    }
    
    function updateImageCounter() {
        $('#currentImageIndex').text(`Image ${currentImageIndex + 1} of ${filteredItems.length}`);
    }
    
    filteredItems = $('.gallery-item');
    
    $('.gallery-item').each(function(index) {
        const effects = ['fadeIn', 'slideDown', 'slideUp'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        const item = $(this);
        
        item.hide();
        setTimeout(function() {
            switch(randomEffect) {
                case 'fadeIn':
                    item.fadeIn(500);
                    break;
                case 'slideDown':
                    item.slideDown(500);
                    break;
                case 'slideUp':
                    item.css('margin-top', '50px').show().animate({
                        marginTop: '0px',
                        opacity: 1
                    }, 500);
                    break;
            }
        }, 100 * index);
    });
});